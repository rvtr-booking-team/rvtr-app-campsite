import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/data/booking.model';
import { BookingFilterComponent } from '../booking-filter/booking-filter.component';
import { Profile } from 'src/app/data/profile.model';
import { Name } from 'src/app/data/name.model';
import { Rental } from 'src/app/data/rental.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {

  constructor(private rooms: LodgingService) { }
  @Input() CheckIn: Date;
  @Input() CheckOut: Date;
  @Input() Guests: number;
  @Input() chosenRental: Rental;
  LastName: string;
  FirstName: string;
  Email: string;
  Phone: string;
  counter: number = 0;
  FormGuests: Profile[] = new Array(this.Guests);
  newBooking: Booking = new Booking();

  ngOnInit(): void {}
  submit(formData) {
    let pro = new Profile();
    //we have a counter, and in the template, we have a ngif to see if counter is less than guest
    pro.name = new Name();
    pro.name.given = formData.FirstName;
    pro.name.family = formData.LastName;
    pro.email = formData.Email;
    pro.phone = formData.Phone;
    this.FormGuests.push(pro);
    if(this.counter == this.Guests) {
      this.newBooking.guests = this.FormGuests;
    }
    this.counter++;
  }

  reserve() {
    this.newBooking.stay.checkIn = this.CheckIn;
    this.newBooking.stay.checkOut = this.CheckOut;
    this.newBooking.stay.dateCreated = new Date();
    //this.newBooking.accountId = this.accountId;
    this.newBooking.rental = this.chosenRental;
    //this.newBooking.lodgingId = this.findLodgingIdByRental(this.newBooking.rental);
    //
    //reservation
    //LastName
  }
  //select lodgingid from lodging where rentalid = this.chosenRental
  //foreach through lodgings, loop through the rentals in the lodgings. If there's a match, break/return
  // findLodgingIdByRental(rental: Rental): string {
  //   this.rooms.get().forEach(obs => {
  //     obs.forEach(lodging => {
  //       let curLodingId = lodging.id;
  //       lodging.rentals.forEach(rent => {
  //         if(rent === rental) {
  //           return curLodingId;
  //         }
  //       })
  //     })
  //   })
  //   return null;
  // }
}


// export interface Name {
//   id: string;
//   family: string;
//   given: string;
// }