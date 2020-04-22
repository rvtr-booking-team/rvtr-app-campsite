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
    private readonly reservationService: ReservationService,
    public config: Config
  ) { }

   /**
    * Represents the _Booking Service_ `getByAccountId` method
    *
    * @param id number
    */
    getByAccountId(id: number): Reservation[]{
      let reservations: Reservation[];
      const url = `${this.config.reservation.uri}/?id=${id}`;
      const ObsReservation = this.reservationService.getByAccountId(url);
      ObsReservation.subscribe(reservation => reservations = reservation);
      return reservations;
    }

   /**
    * Represents the _Booking Service_ `getReservationsByDate` method.
    *
    * @param startDate Date
    * @param endDate Date
    */
    getReservationsByDate(startDate: Date, endDate: Date): Reservation[]{
      const obsReservations = this.reservationService.get();
      const iterativeDay = new Date(startDate);
      const result = new Set<Reservation>();

      // NOTE: Does not factor in daylight savings time!
      const daysTotal = (Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000));

      for (let i = 0; i < daysTotal; i++) {
        obsReservations.forEach(reservations => {
          reservations.forEach(reservation => {
            if (reservation.duration.checkIn.getTime() < iterativeDay.getTime()
            && reservation.duration.checkOut.getTime() > iterativeDay.getTime()) {
              result.add(reservation);
            }
          });
        });
        iterativeDay.setDate(iterativeDay.getDate() + 1);
      }
      return Array.from(result);
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
