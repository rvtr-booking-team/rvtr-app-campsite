import { Component, OnInit, Input } from '@angular/core';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';
import { Rental } from 'src/app/data/rental.model';
import { Booking } from 'src/app/data/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.scss']
})
export class BookingFilterComponent implements OnInit {

  constructor(private rooms: LodgingService) { }
  @Input() State: string;
  @Input() City: string;
  @Input() CheckIn: Date;
  @Input() CheckOut: Date;
  @Input() Guests: number;
  filteredLodgings: Rental[] = this.filterLodgings();

  ngOnInit(): void {
  }
  
  submit() {
    
  }

  filterLodgings(): Rental[] {
    let filteredRentals: Map<string, Rental>;
    this.rooms.get().forEach(obs => {
      obs.forEach(lodging => {
        lodging.rentals.forEach(lod => {
          if(lod.rentalUnit.occupancy > this.Guests) {
            filteredRentals.set(lod.rentalUnit.id, lod);
          }
        });
      });
    });
    // compare filteredRentals and checkForDates response
    this.checkForDates(this.CheckIn, this.CheckOut).forEach(element => {
      if(filteredRentals.has(element.rental.id)) {
        filteredRentals.delete(element.rental.id);
      }
    });
    let filteredRentalList = [];
    Array.from(filteredRentals.keys()).forEach(element => {
      filteredRentalList.push(filteredRentals.get(element));
    });
    return filteredRentalList;
  }

  private checkForDates(startDate: Date, endDate: Date): Booking[]{
    let newBooking: BookingService;
    const obsReservations = newBooking.get();
    const iterativeDay = new Date(startDate);
    const result = new Set<Booking>();

    // NOTE: Does not factor in daylight savings time!
    const daysTotal = (Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000));

    for (let i = 0; i < daysTotal; i++) {
      obsReservations.forEach(bookings => {
        bookings.forEach(booking => {
          if (booking.stay.checkIn.getTime() < iterativeDay.getTime()
          && booking.stay.checkOut.getTime() > iterativeDay.getTime()) {
            result.add(booking);
          }
        });
      });
      iterativeDay.setDate(iterativeDay.getDate() + 1);
    }
    return Array.from(result);
  }

  getByCity(city: string, state: string): string[]{
    return new Array();
  }

}
