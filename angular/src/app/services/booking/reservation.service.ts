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
    private _config: Config
  ) {}

  getReseravtions(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(this._config.reservation.uri)
                    .pipe(
                      tap(_ => console.log("Getting Reservations")),
                      catchError(this.handleError<Reservation[]>("Error in get reservation", [])));
  }

  post(reservation: Reservation): Observable<Reservation> {
    return this._http.post(this._config.reservation.uri, reservation)
                      .pipe(this.handleError<Reservation>("Error in put reservation"));
  }

  put(reservation: Reservation): Observable<Reservation> {
    return this._http.put(this._config.reservation.uri, reservation)
                      .pipe(this.handleError<Reservation>("Error in put reservation"));
  }

  delete(reservationId: number): Observable<Reservation> {
    const url = `${this._config.reservation.uri}/${reservationId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Reservation>("Error in delete reservation"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
