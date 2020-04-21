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
  };

  /**
   * Represents the _Status Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private http: HttpClient, public config: Config) { }

  /**
   * Represents the _Status Service_ `get` method
   *
   */
  get(): Observable<Status[]> {
    return this.http.get<Status[]>(this.config.status.uri)
                     .pipe(
                        tap(_ => console.log('Getting List of Statuses')),
                        catchError(this.handleError<Status[]>('Error in get Guest', []))
                        );
  }
  /**
   * Represents the _Status Service_ `post` method
   *
   * @param status Status
   */
 post(status: Status): Observable<Status> {
    return this.http.post<Status>(this.config.status.uri, status, this.httpOptions)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('post error'))
                      );
  }
  /**
   * Represents the _Status Service_ `put` method
   *
   * @param status Status
   */
  put(status: Status): Observable<Status> {
    return this.http.put<Status>(this.config.status.uri, status)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('Put error'))
                      );
  }

  /**
   * Represents the _Status Service_ `delete` method
   *
   * @param statusId number
   */
  delete(statusId: number): Observable<Status> {
    const url = `${this.config.status.uri}/${statusId}`;
    return this.http.delete<Status>(url)
                .pipe(
                  tap(newStatus => console.log(`Deleted Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('Delete error'))
                      );
  }
  /**
   * Represents the _Status Service_ `handleError` method
   *
   *
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
