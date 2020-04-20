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

  constructor(private _http: HttpClient, public _config: Config) { }

  getDurations(): Observable<Duration[]> {
    return this._http.get<Duration[]>(this._config.duration.uri)
                      .pipe(
                        tap(_ => console.log('Getting duration')),
                        catchError(this.handleError<Duration[]>("Error in get Guest")));
  }

  saveDuration(duration: Duration): Observable<Duration> {
    return this._http.post<Duration>(this._config.duration.uri, duration, this.httpOptions)
                      .pipe(
                        tap(newDuration => console.log(`saved duration: ${JSON.stringify(newDuration)}`)),
                        catchError(this.handleError<Duration>("post error"))
                      );
  }

  put(duration: Duration): Observable<Duration> {
    return this._http.put(this._config.duration.uri, duration)
                      .pipe(
                        tap(_ => console.log('Putting duration')),
                        this.handleError<Duration>("Error in put Guest"));
  }

  delete(durationId: number): Observable<Duration> {
    const url = `${this._config.duration.uri}/${durationId}`;
    return this._http.delete(url)
                .pipe(
                  tap(_ => console.log('Deleting duration')),
                  this.handleError<Duration>("Error in delete Duration"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }
}
