import { Injectable } from '@angular/core';
import { Reservation } from '../../data/booking/reservation.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Config } from './config.booking';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = 'api/reservation';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  /**
   * Represents the _Reservation Service_ `constructor` method
   *
   * @param http HttpCLient
   * @param config Config
   */
  constructor(private http: HttpClient, public config: Config) {}

  /**
   * Represents the _Reservation Service_ `get` method
   */
  get(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.config.reservation.uri)
                    .pipe(
                      tap(_ => console.log('Getting Reservations')),
                      catchError(this.handleError<Reservation[]>('Error in get reservation', [])));
  }

  /**
   * Represents the _Reservation Service_ `getById` method
   *
   * @param url string
   */
  getById(url: string): Observable<Reservation[]> {
  return this.http.get<Reservation[]>(url, this.httpOptions)
    .pipe(
      map(reserve => reserve), // returns a {0|1} element array
      tap(r => {
        const outcome = r ? `fetched` : `did not find`;
        console.log(`${outcome} reservation has been retrieved`);
      }),
      catchError(this.handleError<Reservation[]>(`getReservation`, []))
    );
  }

  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.config.reservation.uri, reservation, this.httpOptions)
                      .pipe(
                        tap(newGuest => console.log(`saved Reservation: ${JSON.stringify(newGuest)}\n`)),
                        catchError(this.handleError<Reservation>('post error in reservation'))
                      );
  }

  /**
   * Represents the _Reservation Service_ `put` method
   *
   * @param reservation Reservation
   */
  put(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(this.config.reservation.uri, reservation, this.httpOptions)
                      .pipe(
                        tap(newReservation => console.log(`updated the reservation: ${JSON.stringify(newReservation)}\n`)),
                        catchError(this.handleError<Reservation>('Put error in reservation'))
                      );
  }

  /**
   * Represents the _Reservation Service_ `delete` method
   *
   * @param reservationId number
   */
  delete(reservationId: number): Observable<Reservation> {
    const url = `${this.config.reservation.uri}/${reservationId}`;
    return this.http.delete<Reservation>(url)
                .pipe(
                  tap(_ => console.log('Deleting reservation')),
                  catchError(this.handleError<Reservation>('Error in delete Reservation'))
                );
  }

  /**
   * Represents the error handler for the requests
   *
   * @param operation operation
   * @param result T
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
