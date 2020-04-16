import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Duration } from '../../data/booking/duration.model';
import { Guest } from '../../data/booking/guest.model';
import { Status } from '../../data/booking/status.model';
import { Reservation } from '../../data/booking/reservation.model';
import { HttpHeaders } from '@angular/common/http';
import { DurationService } from './duration.service';
import { GuestService } from './guest.service';
import { StatusService } from './status.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: string = "api/reservation";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  constructor(
    private _http: HttpService, 
    private _duration: DurationService, 
    private _guests: GuestService, 
    private _status: StatusService
  ) {}
 
  get(): Observable<Reservation[]> {
    return this._http.get_async(this.url)
                      .pipe(this.handleError("Error in get reservation"));
  }
  
  post(reservation: Reservation): Observable<Reservation> {
    return this._http.post_async(this.url, reservation) 
                      .pipe(this.handleError<Reservation>("Error in post reservation")) as Observable<Reservation>                     
  }

  put(reservation: Reservation): Observable<Reservation> {
    return this._http.put_async(this.url, reservation)
                      .pipe(this.handleError<Reservation>("Error in put reservation")) as Observable<Reservation>;
  }

  delete(reservationId: number): Observable<Reservation> {
    const url = `${this.url}/${reservationId}`;
    return this._http.delete_async(url)
                .pipe(this.handleError<Reservation>("Error in delete reservation")) as Observable<Reservation>;
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
