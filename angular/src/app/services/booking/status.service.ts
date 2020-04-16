import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';
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
  
  constructor(private _http: HttpService) { }

  get(): Observable<Status[]> {
    return this._http.get_async(this.url)
                      .pipe(this.handleError("Error in get Guest"));
  }
  
  post(status: Status): Observable<Status> {

    return this._http.post_async(this.url, status) 
                      .pipe(this.handleError<Status>("post error")) as Observable<Status>
                      
  }

  put(status: Status): Observable<Status> {
    return this._http.put_async(this.url, status)
                      .pipe(this.handleError("Error in put Status")) as Observable<Status>;
  }

  delete() {
    
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
