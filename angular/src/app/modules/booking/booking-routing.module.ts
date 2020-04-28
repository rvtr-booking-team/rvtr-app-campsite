import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingSearchComponent } from './booking/booking-search/booking-search.component';


const routes: Routes = [
  {path: '', component: BookingSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
