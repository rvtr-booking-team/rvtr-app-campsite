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

    getById(id: number){}

    getByStatus(status: string){}

    getByDuration(startDuration: Date, endDuration: Date){}

    getAllBooking(){}
}
