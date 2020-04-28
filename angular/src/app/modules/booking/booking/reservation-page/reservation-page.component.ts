import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/data/booking.model';
import { BookingFilterComponent } from '../booking-filter/booking-filter.component';
import { Profile } from 'src/app/data/profile.model';
import { Name } from 'src/app/data/name.model';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {

  constructor() { }
  @Input() CheckIn: Date;
  @Input() CheckOut: Date;
  @Input() Guests: number;
  //@Input() RentalId: string;
  LastName: string[];
  FirstName: string[];
  Email: string[];
  Phone: string[];
  counter: number = 0;
  //GuestArray: number[] = new Array(this.Guests);
  FormGuests: Profile[] = new Array(this.Guests);

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
    let newBooking: Booking = new Booking();
    if(this.counter == this.Guests) {
      newBooking.guests = this.FormGuests;
    }
    this.counter++;
  }
}

// export interface Name {
//   id: string;
//   family: string;
//   given: string;
// }