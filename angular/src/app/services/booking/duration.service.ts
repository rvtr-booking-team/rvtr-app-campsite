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
  constructor(private http: HttpClient, public config: Config) { }

  getDurations(): Observable<Duration[]> {
    return this.http.get<Duration[]>(this.config.duration.uri)
                      .pipe(
                        tap(_ => console.log('Getting duration')),
                        catchError(this.handleError<Duration[]>('Error in get Guest', [])));
  }

  saveDuration(duration: Duration): Observable<Duration> {
    return this.http.post<Duration>(this.config.duration.uri, duration, this.httpOptions)
                      .pipe(
                        tap(newDuration => console.log(`Posted duration: ${JSON.stringify(newDuration)}\n`)),
                        catchError(this.handleError<Duration>('Error in post Guest')));
  }

  putDuration(duration: Duration): Observable<Duration> {
    return this.http.put<Duration>(this.config.duration.uri, duration)
                      .pipe(
                        tap(_ => console.log('Putting duration')),
                        catchError(this.handleError<Duration>('Error in put Guest')));
  }

  deleteDuration(durationId: number): Observable<Duration> {
    const url = `${this.config.duration.uri}/${durationId}`;
    return this.http.delete<Duration>(url)
                .pipe(
                  tap(_ => console.log('Deleting duration')),
                  catchError(this.handleError<Duration>('Error in delete Duration')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
