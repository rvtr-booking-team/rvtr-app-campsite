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
  };

  /**
   * Represents the _Duration Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private http: HttpClient, public config: Config) { }

  /**
   * Represents the _Duration Service_ `get` method
   */
  get(): Observable<Duration[]> {
    return this.http.get<Duration[]>(this.config.duration.uri)
                      .pipe(
                        tap(_ => console.log('Getting duration')),
                        catchError(this.handleError<Duration[]>('Error in get Duration', [])));
  }

  /**
   * Represents the _Duration Service_ `post` method
   *
   * @param duration Duration
   */
  post(duration: Duration): Observable<Duration> {
    return this.http.post<Duration>(this.config.duration.uri, duration, this.httpOptions)
                      .pipe(
                        tap(newDuration => console.log(`Posted duration: ${JSON.stringify(newDuration)}\n`)),
                        catchError(this.handleError<Duration>('Error in post Duration')));
  }
  /**
   * Represents the _Duration Service_ `put` method
   *
   * @param duration Duration
   */
  put(duration: Duration): Observable<Duration> {
    return this.http.put<Duration>(this.config.duration.uri, duration)
                      .pipe(
                        tap(_ => console.log('Putting duration')),
                        catchError(this.handleError<Duration>('Error in put Duration')));
  }
  /**
   * Represents the _Duration Service_ `delete` method
   *
   * @param durationId string
   */
  delete(durationId: number): Observable<Duration> {
    const url = `${this.config.duration.uri}/${durationId}`;
    return this.http.delete<Duration>(url)
                .pipe(
                  tap(_ => console.log('Deleting duration')),
                  catchError(this.handleError<Duration>('Error in delete Duration')));
  }

  /**
   * Represents the _Duration Service_ `error handling` method
   *
   * @param operation string
   * @param result T
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
