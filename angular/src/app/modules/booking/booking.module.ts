import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingSearchComponent } from './booking/booking-search/booking-search.component';
import { BookingFilterComponent } from './booking/booking-filter/booking-filter.component';

@NgModule({
  declarations: [BookingSearchComponent],
  imports: [
    CommonModule,
    BookingRoutingModule
  ],

})
export class BookingModule { }
