import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Status } from '../../data/booking/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  url: string = "api/status";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private _http: HttpClient) { }

  get(): Observable<Status[]> {
    return this._http.get(this.url)
                      .pipe(this.handleError("Error in get Guest"));
  }

  post(status: Status): Observable<Status> {

    return this._http.post(this.url, status)
                      .pipe(this.handleError<Status>("post error")) as Observable<Status>

  }

  put(status: Status): Observable<Status> {
    return this._http.put(this.url, status)
                      .pipe(this.handleError<Status>("Error in put Status")) as Observable<Status>;
  }

  delete(statusId: number): Observable<Status> {
    const url = `${this.url}/${statusId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Status>("Error in delete Status"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
