import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  timeApiUrl: string = 'http://worldtimeapi.org/api/timezone/';
  constructor(private http: HttpClient) { }

  fetchTime(timezone: string): Observable<Object> {
    return this.http.get(`${this.timeApiUrl}${timezone}`);
  }
}
