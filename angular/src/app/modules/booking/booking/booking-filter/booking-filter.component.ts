import { Component, OnInit, Input } from '@angular/core';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Lodging } from 'src/app/data/lodging.model';
import { Rental } from 'src/app/data/rental.model';
import { Booking } from 'src/app/data/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.scss']
})
export class BookingFilterComponent implements OnInit {
  test: boolean = false;
  @Input() State: string;
  @Input() City: string;
  @Input() CheckIn: Date;
  @Input() CheckOut: Date;
  @Input() Guests: number;
  @Input() filteredRental;
  lodgings: Lodging[] = [];
  filteredRentalList = [];
  filteredRentals: Map<string, Rental>;
  filteredLodgings: Rental[] = this.filterLodgings();
  chosenRental: Rental;

  constructor(private rooms: LodgingService, private bookings: BookingService, private router: Router) { }

  ngOnInit(): void {
    console.log("Filtered Lodging",this.filteredLodgings)
  }

  submit(filteredRent: Rental) {
    this.chosenRental = filteredRent;
    console.log(filteredRent)
  }

  setTrue() {
    this.test= true;
  }

  filterLodgings(): Rental[] {
    this.rooms.get().subscribe(data => {
      this.lodgings = data;
      this.filteredRentals = new Map<string, Rental>()
      this.lodgings.forEach(lodging => {
        for(var key in lodging.rentals){
          if(lodging.rentals.hasOwnProperty(key)){
            lodging.rentals.forEach(rental => {
              if(rental.rentalUnit.occupancy >= this.Guests) {
                this.filteredRentals.set(rental.id, rental);
              }
            });
          }
        }
      });
      console.log(this.filteredRentals)
      Array.from(this.filteredRentals.keys()).forEach(element => {
        this.filteredRentalList.push(this.filteredRentals.get(element));
      })
      });
    return this.filteredRentalList;
  }

  private checkForDates(startDate: Date, endDate: Date): Booking[]{
    const obsReservations = this.bookings.get();
    const iterativeDay = new Date(startDate);
    const result = new Set<Booking>();

    // NOTE: Does not factor in daylight savings time!
    const daysTotal = (Math.abs(endDate.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000));
    for (let i = 0; i < daysTotal; i++) {
      obsReservations.subscribe(bookings => {
        bookings.forEach(booking => {
          if ((Math.abs(new Date(booking.stay.checkIn).getTime()) < Math.abs(iterativeDay.getTime()))
          &&  (Math.abs(new Date(booking.stay.checkOut).getTime()) > Math.abs(iterativeDay.getTime()))) {
            result.add(booking);
          }
        });
        iterativeDay.setDate(iterativeDay.getDate() + 1);
      });
    }
    return Array.from(result);
  }
}
