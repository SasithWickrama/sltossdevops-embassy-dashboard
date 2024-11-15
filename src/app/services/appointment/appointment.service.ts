import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Appointment } from '../../interfaces/appointment/appointment';
import { StorageService } from '../storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import {environment} from "src/environments/environment";

// private APPOINTMENT_URL = 'http://localhost:25450/uaeapi/web/services/';

const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  private  appointmentsBaseUrl = environment.apiBase + 'uaeapi/web/services/';// URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) {  }

  /** GET appointments from the server */
  getAppointments(): Observable<Appointment[]> {

    const url = `${this.appointmentsBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const http_options = { headers: header };

    return this.http.get<Appointment[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Appointments')),
        catchError(this.handleError<Appointment[]>('AppointmentService', []))
      );
  }

  /** GET today pending appointments from the server */
  getTodayAppointments(date: string): Observable<Appointment[]> {
    const url = `${this.appointmentsBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = date? this.params.append('date', date): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Appointment[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Today Appointments')),
        catchError(this.handleError<Appointment[]>('AppointmentService', []))
      );
  }

  /** GET all appointments from the server */
  getAllAppointments(date: string, category: string): Observable<Appointment[]> {
   const url = `${this.appointmentsBaseUrl}get-all`;
   const token = this.storageService.getToken();

   const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
  //  const params = date? this.params.append('date', date): this.params;
   if(category == 'ALL'){
    category = '';
   }
   const params = this.params.set('date', date).set('category', category);
   const http_options = { headers: header, params: params };

   return this.http.get<Appointment[]>(url, http_options)
     .pipe(
       tap(_ => this.log('fetched Today Appointments')),
       catchError(this.handleError<Appointment[]>('AppointmentService', []))
     );
 }

 /** GET pending appointments from the server */
 getPendingAppointments(date: string, category:string): Observable<Appointment[]> {
 const url = `${this.appointmentsBaseUrl}get-pending`;
 const token = this.storageService.getToken();

 const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
//  const params = date? this.params.append('date', date): this.params;
 if(category == 'ALL'){
    category = '';
 }
 const params = this.params.set('date', date).set('category', category);
 const http_options = { headers: header, params: params };

 return this.http.get<Appointment[]>(url, http_options)
   .pipe(
     tap(_ => this.log('fetched Today Appointments')),
     catchError(this.handleError<Appointment[]>('AppointmentService', []))
   );
}

/** GET complete appointments from the server */
getCompleteAppointments(date: string, category: string): Observable<Appointment[]> {
 const url = `${this.appointmentsBaseUrl}get-complete`;
 const token = this.storageService.getToken();

 const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
//  const params = date? this.params.append('date', date): this.params;
 if(category == 'ALL'){
  category = '';
}
const params = this.params.set('date', date).set('category', category);
 const http_options = { headers: header, params: params };

 return this.http.get<Appointment[]>(url, http_options)
   .pipe(
     tap(_ => this.log('fetched Today Appointments')),
     catchError(this.handleError<Appointment[]>('AppointmentService', []))
   );
}

  /** UPDATE complete appointments status as 1 */
  updateComleteAppointment(appointmentId:string, loginUid:string): Observable<any> {
    const url = `${this.appointmentsBaseUrl}complete-appointmet`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {appointmentId, loginUid}
    const http_options = { headers: header };

    return this.http.post(url, body, http_options)
      .pipe(
        tap(_ => this.log('Updated compete appointment staus as 1')),
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

  // getAppointmentCount( date:string ): Observable<any> {

  //   const TOKEN = this.storageService.getToken();
  //   console.log(date)
  //   HEADERS = HEADERS.append(HEADER_NAME_AUTH, `Bearer ${TOKEN}`);
  //   const BODY_PARAMS = { 'date' : date};
  //   const BODY =  JSON.stringify(BODY_PARAMS);
  //   console.log(BODY_PARAMS)
  //   console.log(BODY)
    

  //   const HTTP_OPTIONS = { headers: HEADERS, params: new HttpParams().set('date', date) };

  //   return this.http.get(
  //     API_URL + 'count', 
  //     // { responseType: 'text' }, 
  //     HTTP_OPTIONS
  //   );
  // }

  // getAppointmentCountByService(): Observable<any> {

  //   const TOKEN = this.storageService.getToken();
  //   HEADERS = HEADERS.append(HEADER_NAME_AUTH, `Bearer ${TOKEN}`);
  //   const HTTP_OPTIONS = { headers: HEADERS };

  //   return this.http.get(
  //     API_URL + 'category', 
  //     // { responseType: 'text' }, 
  //     HTTP_OPTIONS
  //   );
  // }

  // getAppointmentByService(): Observable<any> {

  //   const TOKEN = this.storageService.getToken();
  //   HEADERS = HEADERS.append(HEADER_NAME_AUTH, `Bearer ${TOKEN}`);
  //   const HTTP_OPTIONS = { headers: HEADERS };

  //   return this.http.get(
  //     API_URL + 'category/get', 
  //     // { responseType: 'text' }, 
  //     HTTP_OPTIONS
  //   );
  // }

  
}
