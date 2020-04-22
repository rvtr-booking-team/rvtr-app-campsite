import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Guest } from '../../data/booking/guest.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Config } from './config.booking';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  /**
   * Represents the _Guest Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly http: HttpClient, public config: Config) {}

  /**
   * Represents the _Guest Service_ `get` method
   *
   */
  get(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.config.guest.uri)
                     .pipe(
                        tap(_ => console.log('Getting all guests')),
                        catchError(this.handleError<Guest[]>('Error in get Guest', []))
                      );
  }

  /**
   * Represents the _Guest Service_ `post` method
   *
   * @param guest Guest
   */
  post(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.config.guest.uri, guest, this.httpOptions)
                     .pipe(
                            tap(newGuest => console.log(`saved guest was: ${JSON.stringify(newGuest)}\n`)),
                            catchError(this.handleError<Guest>('post error'))
                      );
  }

  /**
   * Represents the _Guest Service_ `put` method
   *
   * @param guest Guest
   */
  put(guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(this.config.guest.uri, guest, this.httpOptions)
                      .pipe(
                        tap(newGuest => console.log(`updated the Guest: ${JSON.stringify(newGuest)}\n`)),
                        catchError(this.handleError<Guest>('Put error in guest'))
                      );
  }

  /**
   * Represents the _Guest Service_  `delete` method
   *
   * @param guestId number
   */
  delete(guestId: number): Observable<Guest> {
    const url = `${this.config.guest.uri}/${guestId}`;
    return this.http.delete<Guest>(url)
                .pipe(
                  tap(_ => console.log('Deleting guest')),
                  catchError(this.handleError<Guest>('Delete error in guest'))
                      );
  }
  /**
   * Represents the _Guest Service_ `handleError` method
   *
   *
   */
 private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result);
    };
  }
}
