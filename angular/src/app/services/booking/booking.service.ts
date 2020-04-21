import { Injectable } from '@angular/core';
import { ReservationService } from './reservation.service';
import { GuestService } from './guest.service';
import { StatusService } from './status.service';
import { DurationService } from './duration.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reservation } from 'src/app/data/booking/reservation.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Guest } from 'src/app/data/booking/guest.model';
import { Config } from './config.booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private readonly http: HttpClient,
    private readonly reservationService: ReservationService,
    private readonly guestService: GuestService,
    private readonly statusService: StatusService,
    private readonly durationService: DurationService,
    public config: Config
  ) { }

   /**
    * Represents the _Booking Service_ `getByAccountId` method
    *
    * @param id number
    */
    getByAccountId(id: number): Observable<Reservation[]>{
      const url = `${this.config.reservation.uri}/?id=${id}`;
      return this.reservationService.getById(url);
    }

   /**
    * Represents the _Booking Service_ `getByStartDate` method
    *
    * @param startDate Date
    */
   getByStartDate(startDate: Date): Reservation[]{
     let obsReservations = this.reservationService.get();
     let result: Reservation[];
     obsReservations.forEach( reservations => {
      reservations.forEach(reservation => {
        if(reservation.duration.checkIn === startDate){
          result.push(reservation);
        }
      });
     });

     return result;
   }

   /**
    * Represents the _Booking Service_ `getByRangeOfDuration` method
    *
    * @param startDuration Date
    * @param endDuration Date
    */
    getByDuration(startDuration: Date, endDuration: Date){}

  /**
   * Represents the _Duration Service_ `error handling` method
   *
   * @param operation string
   * @param result T
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
