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

  constructor(private http: HttpClient, public config: Config) {}

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.config.guest.uri)
                     .pipe(
                        tap(_ => console.log('Getting all guests')),
                        catchError(this.handleError<Guest[]>('Error in get Guest', []))
                      );
  }

  saveGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.config.guest.uri, guest, this.httpOptions)
                     .pipe(
                            tap(newGuest => console.log(`saved guest was: ${JSON.stringify(newGuest)}\n`)),
                            catchError(this.handleError<Guest>('post error'))
                      );
  }

  putGuest(guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(this.config.guest.uri, guest, this.httpOptions)
                      .pipe(
                        tap(newGuest => console.log(`updated the Guest: ${JSON.stringify(newGuest)}\n`)),
                        catchError(this.handleError<Guest>('Put error in guest'))
                      );
  }

  deleteGuest(guestId: number): Observable<Guest> {
    const url = `${this.config.guest.uri}/${guestId}`;
    return this.http.delete<Guest>(url)
                .pipe(
                  tap(_ => console.log('Deleting guest')),
                  catchError(this.handleError<Guest>('Delete error in guest'))
                      );
  }

 private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
