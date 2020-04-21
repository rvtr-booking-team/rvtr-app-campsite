import { Injectable } from '@angular/core';
import { ReservationService } from './reservation.service';
import { GuestService } from './guest.service';
import { StatusService } from './status.service';
import { DurationService } from './duration.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    reservationService: ReservationService,
    guestService: GuestService,
    statusService: StatusService,
    durationService: DurationService
    ) { }

   /**
    * Represents the _Booking Service_ `getByAccountId` method
    *
    * @param id number
    */
    getById(id: number){}

   /**
    * Represents the _Booking Service_ `getByStatusName` method
    *
    * @param status string
    */
    getByStatus(status: string){}

   /**
    * Represents the _Booking Service_ `getByRangeOfDuration` method
    *
    * @param startDuration Date
    * @param endDuration Date
    */
    getByDuration(startDuration: Date, endDuration: Date){}

   /**
    * Represents the _Booking Service_ `getByRentalId` method
    *
    * @param id number
    */
    getByRentalId(id: number){}
}
