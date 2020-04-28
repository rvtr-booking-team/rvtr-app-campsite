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
  Guests : Number;

  @Input() cityName: string;
  @Input() stateName: string;
  cities :string[] = ["Dallas", "Arlington", "Fortworth"];
  states :string[] = ["Texas"];
  private searchTerms = new Subject<String>();
  cities$: Observable<String[]>;

  constructor() { }

  ngOnInit(): void {
  // // wait 300ms after each keystroke before considering the term
  //   debounceTime(300),

    // // ignore new term if same as previous term
    // distinctUntilChanged(),

    // // switch to new search observable each time the term changes
    // switchMap((term: string) => this.val)

    // switchMap((term: string) => this.heroService.searchHeroes(term)),
  }
  submit(formData){
    this.CheckIn = formData.CheckIn;
    this.CheckOut = formData.CheckOut;
    this.Guests = formData.Guests;
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
