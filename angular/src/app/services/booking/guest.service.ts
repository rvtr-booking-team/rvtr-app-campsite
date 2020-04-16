import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Guest } from '../../data/booking/guest.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  url: string = 'api/guest';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private _http: HttpService) {}

  get(): Observable<Guest[]> {
    return this._http.get_async(this.url)
                      .pipe(this.handleError("Error in get Guest"));
  }
  
  post(guest: Guest): Observable<Guest> {

    return this._http.post_async(this.url, guest) 
                      .pipe(this.handleError<Guest>("post error")) as Observable<Guest>
                      
  }

  put(guest: Guest): Observable<Guest> {
    return this._http.put_async(this.url, guest)
                      .pipe(this.handleError("Error in put Guest")) as Observable<Guest>;
  }

  delete() {
    
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
