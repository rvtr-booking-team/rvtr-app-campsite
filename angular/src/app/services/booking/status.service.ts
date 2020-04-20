import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Status } from '../../data/booking/status.model';
import { Config } from './config.booking';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private _http: HttpClient, public _config: Config) { }

  getStatus(): Observable<Status[]> {
    return this._http.get<Status[]>(this._config.status.uri)
                     .pipe(
                        tap(_ => console.log("Getting List of Statuses")),
                        catchError(this.handleError<Status[]>("Error in get Guest", []))
                        );
  }

  post(status: Status): Observable<Status> {

    return this._http.post(this._config.status.uri, status)
                      .pipe(this.handleError<Status>("post error")) as Observable<Status>

  }

  put(status: Status): Observable<Status> {
    return this._http.put(this._config.status.uri, status)
                      .pipe(this.handleError<Status>("Error in put Status")) as Observable<Status>;
  }

  delete(statusId: number): Observable<Status> {
    const url = `${this._config.status.uri}/${statusId}`;
    return this._http.delete(url)
                .pipe(this.handleError<Status>("Error in delete Status"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
