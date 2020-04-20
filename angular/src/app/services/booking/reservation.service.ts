import { Injectable } from '@angular/core';
import { Reservation } from '../../data/booking/reservation.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DurationService } from './duration.service';
import { GuestService } from './guest.service';
import { StatusService } from './status.service';
import { Observable, of } from 'rxjs';
import { Config } from './config.booking';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: string = "api/reservation";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(
    private _http: HttpClient,
    private _duration: DurationService,
    private _guests: GuestService,
    private _status: StatusService,
    public _config: Config
  ) {}

  getReseravtions(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(this._config.reservation.uri)
                    .pipe(
                      tap(_ => console.log("Getting Reservations")),
                      catchError(this.handleError<Reservation[]>("Error in get reservation", [])));
  }

  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this._http.post<Reservation>(this._config.reservation.uri, reservation, this.httpOptions)
                      .pipe(
                        tap(newGuest => console.log(`saved Reservation: ${JSON.stringify(newGuest)}\n`)),
                        catchError(this.handleError<Reservation>("post error"))
                      );
  }

  put(reservation: Reservation): Observable<Reservation> {
    return this._http.put(this._config.reservation.uri, reservation)
                      .pipe(this.handleError<Reservation>("Error in put reservation"));
  }
  
  delete<Reservation>(reservationId: number): Observable<Reservation> {
    const url = `${this._config.reservation.uri}/${reservationId}`;
    return this._http.delete<Reservation>(url)
                .pipe(
                  tap(_ => console.log('Deleting reservation')),
                  catchError(this.handleError<Reservation>("Error in delete Reservation")));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
