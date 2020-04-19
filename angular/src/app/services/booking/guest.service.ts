import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Guest } from '../../data/booking/guest.model';
import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import { catchError, tap } from 'rxjs/operators'
=======
>>>>>>> bbdf81e4e1f241bdf51b4f8e29da5f2e70eef5e5
import { Config } from './config.booking';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

<<<<<<< HEAD
  constructor(private _http: HttpClient, public _config: Config) {}

  getGuests(): Observable<Guest[]> {
    return this._http.get<Guest[]>(this._config.guest.uri)
                     .pipe(
                        tap(_ => console.log("Getting all guests")),
                        catchError(this.handleError("Error in get Guest", [])));
=======
  constructor(private _http: HttpClient, private _config: Config) {}

  get(): Observable<Guest[]> {
    return this._http.get(this._config.guest.uri)
                      .pipe(this.handleError("Error in get Guest"));
>>>>>>> bbdf81e4e1f241bdf51b4f8e29da5f2e70eef5e5
  }

  post(guest: Guest): Observable<Guest> {

    return this._http.post(this._config.guest.uri, guest)
<<<<<<< HEAD
                     .pipe(
                            tap((newGuest: Guest) => newGuest),
                            this.handleError<Guest>("post error")
                      )
=======
                      .pipe(this.handleError<Guest>("post error"));

>>>>>>> bbdf81e4e1f241bdf51b4f8e29da5f2e70eef5e5
  }

  put(guest: Guest): Observable<Guest> {
    return this._http.put(this._config.guest.uri, guest)
                      .pipe(this.handleError<Guest>("Error in put Guest"));
  }

  delete(guestId: number): Observable<Guest> {
    const url = `${this._config.guest.uri}/${guestId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Guest>("Error in deleting guest"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
