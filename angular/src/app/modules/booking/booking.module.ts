import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingSearchComponent } from './booking/booking-search/booking-search.component';
import { BookingFilterComponent } from './booking/booking-filter/booking-filter.component';
import { Stay } from '../../data/stay.model';
import { FormsModule } from '@angular/forms';
import { ReservationPageComponent } from './booking/reservation-page/reservation-page.component';

@NgModule({
  declarations: [BookingSearchComponent, BookingFilterComponent, ReservationPageComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule
  ],

})
export class BookingModule { }
