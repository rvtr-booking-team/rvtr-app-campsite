import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Duration } from '../../data/booking/duration.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Config } from './config.booking';
import { catchError, tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})

export class DurationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }
  constructor(private _http: HttpClient,public _config: Config) { }

  getDurations(): Observable<Duration[]> {
    return this._http.get<Duration[]>(this._config.duration.uri)
                      .pipe(
                        tap(_ => console.log('Getting duration')),
                        catchError(this.handleError<Duration[]>("Error in get Guest")));
  }

  postDuration<Duration>(duration: Duration): Observable<Duration> {
    return this._http.post<Duration>(this._config.duration.uri, duration)
                      .pipe(
                        tap(_ => console.log('Posting duration')),
                        catchError(this.handleError<Duration>("Error in post Guest")));
  }

  putDuration<Duration>(duration: Duration): Observable<Duration> {
    return this._http.put<Duration>(this._config.duration.uri, duration)
                      .pipe(
                        tap(_ => console.log('Putting duration')),
                        catchError(this.handleError<Duration>("Error in put Guest")));
  }

  deleteDuration<Duration>(durationId: number): Observable<Duration> {
    const url = `${this._config.duration.uri}/${durationId}`;
    return this._http.delete<Duration>(url)
                .pipe(
                  tap(_ => console.log('Deleting duration')),
                  catchError(this.handleError<Duration>("Error in delete Duration")));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
