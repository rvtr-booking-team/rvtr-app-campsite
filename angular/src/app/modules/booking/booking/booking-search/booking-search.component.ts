import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'uic-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent implements OnInit {

  CheckIn : Date;
  CheckOut : Date;
  Guests : number;
  State: string;
  City: string;

  @Input() cityName: string;
  @Input() stateName: string;
  cities :string[] = ["Dallas", "Arlington", "Fortworth"];
  states :string[] = ["Texas"];
  private searchTerms = new Subject<String>();
  cities$: Observable<String[]>;

  constructor() { }

  ngOnInit(): void {
  }

  submit(formData){
    this.CheckIn = formData.CheckIn;
    this.CheckOut = formData.CheckOut;
    this.Guests = formData.Guests;
    this.State = formData.State;
    this.City = formData.City;
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
