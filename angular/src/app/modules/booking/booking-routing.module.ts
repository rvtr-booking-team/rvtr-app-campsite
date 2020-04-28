import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingSearchComponent } from './booking/booking-search/booking-search.component';
import {  ReservationPageComponent } from './booking/reservation-page/reservation-page.component';

const routes: Routes = [
  {path: '', component: BookingSearchComponent },
  {path: 'reservationpage', component: ReservationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
