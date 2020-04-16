import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {}

  get(): Observable<Guest[]> {
    return this._http.get(this.url)
                      .pipe(this.handleError("Error in get Guest"));
  }

  post(guest: Guest): Observable<Guest> {

    return this._http.post(this.url, guest)
                      .pipe(this.handleError<Guest>("post error"));

  }

  put(guest: Guest): Observable<Guest> {
    return this._http.put(this.url, guest)
                      .pipe(this.handleError<Guest>("Error in put Guest"));
  }

  delete(guestId: number): Observable<Guest> {
    const url = `${this.url}/${guestId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Guest>("Error in deleting guest"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
