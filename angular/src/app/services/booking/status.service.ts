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

 saveStatus<Status>(status: Status): Observable<Status> {
    return this._http.post<Status>(this._config.status.uri, status, this.httpOptions)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>("post error"))
                      );
  }

  putStatus<Status>(status: Status): Observable<Status> {
    return this._http.put<Status>(this._config.status.uri, status)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>("Put error"))
                      );
  }

  deleteStatus<Status>(statusId: number): Observable<Status> {
    const url = `${this._config.status.uri}/${statusId}`;
    return this._http.delete<Status>(url)
                .pipe(
                  tap(newStatus => console.log(`Deleted Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>("Delete error"))
                      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
