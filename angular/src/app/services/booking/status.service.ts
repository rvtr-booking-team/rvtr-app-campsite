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

  constructor(private http: HttpClient, public config: Config) { }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.config.status.uri)
                     .pipe(
                        tap(_ => console.log('Getting List of Statuses')),
                        catchError(this.handleError<Status[]>('Error in get Guest', []))
                        );
  }

 saveStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.config.status.uri, status, this.httpOptions)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('post error'))
                      );
  }

  putStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(this.config.status.uri, status)
                      .pipe(
                        tap(newStatus => console.log(`saved Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('Put error'))
                      );
  }

  deleteStatus(statusId: number): Observable<Status> {
    const url = `${this.config.status.uri}/${statusId}`;
    return this.http.delete<Status>(url)
                .pipe(
                  tap(newStatus => console.log(`Deleted Status: ${JSON.stringify(newStatus)}\n`)),
                        catchError(this.handleError<Status>('Delete error'))
                      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
