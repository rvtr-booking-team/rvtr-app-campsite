import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingSearchComponent } from './booking/booking-search/booking-search.component';
import { BookingFilterComponent } from './booking/booking-filter/booking-filter.component';
import { Stay } from '../../data/stay.model';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookingSearchComponent, BookingFilterComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule
  ],

})
export class BookingModule { }
