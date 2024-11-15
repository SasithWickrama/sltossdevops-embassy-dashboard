import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import {environment} from "src/environments/environment";


const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class BlAppointmentService {

  private appointmentsBaseUrl = environment.apiBase + 'uaeapi/web/services/';// URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) { }

  /** BLOCK appointments from the server */
  blockAppointmentsTimeSlot(appointBlDate: string, appointBlTime: string, serviceCatagory: string, appointBlStat: string, createdUser:string): Observable<any> {

    const url = `${this.appointmentsBaseUrl}block-appointmet`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {appointBlDate, appointBlTime, serviceCatagory, appointBlStat, createdUser};
    const http_options = { headers: header };

    return this.http.post(url, body, http_options)
      .pipe(
        tap(_ => this.log('Block Appointment Time slot')),
        catchError(this.handleError<any>('AppointmentService', []))
      );
  }

  /** Get blocked appointments time slot list from the server */
  getAppointmentsTimeSlot(appointBlStat: string, serviceCatagory:string): Observable<any> {

    const url = `${this.appointmentsBaseUrl}get-block-appointmet`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {appointBlStat, serviceCatagory};
    const http_options = { headers: header };

    return this.http.post(url, body, http_options)
      .pipe(
        tap(_ => this.log('get Appointment Time slot List')),
        catchError(this.handleError<any>('AppointmentService', []))
      );
  }

  /** UNBLOCK appointments from the server */
  unblockAppointmentsTimeSlot(uid: string, updatedUser: string): Observable<any> {

    const url = `${this.appointmentsBaseUrl}unblock-appointmet`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {uid, updatedUser};
    const http_options = { headers: header };

    return this.http.post(url, body, http_options)
      .pipe(
        tap(_ => this.log('Unblock Appointment Time slot')),
        catchError(this.handleError<any>('AppointmentService', []))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messagesService.add(`AppointmentService: ${message}`);
  }

}
