import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {environment} from "src/environments/environment";
import { StorageService } from '../../services/storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Webrole } from '../../interfaces/webrole/webrole';

const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class WebroleService {

  private webRoleBaseUrl = environment.apiBase + 'uaeapi/web/roles/'; // URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();
  private webrole = {} as Webrole;
  private webRoleData = new BehaviorSubject<Webrole>(this.webrole);
  // public currentwebUserData = this.webUserData.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) { }

  /** GET all roles */
  getAllRole(): Observable<Webrole[]> {

    const url = `${this.webRoleBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    // const params = HttpParams ? this.params.append('id', username): this.params;
    const http_options = { headers: header};

    return this.http.get<Webrole[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Webrole[]>('webUserRole', []))
      );
  }

  /** SET all roles details */
  setAllRole(data) {

    this.webRoleData.next(data);
    
  }

   /** GET web user details by uid */
   getRoleByUid(uid: string): Observable<Webrole[]> {

    const url = `${this.webRoleBaseUrl}getbyuid`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('uid', uid): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Webrole[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched web Task')),
        catchError(this.handleError<Webrole[]>('getByUidwebtaskService', []))
      );
  }

  /** Create new web task */
  createRole(webtask: Webrole): Observable<Webrole[]> {

    const url = `${this.webRoleBaseUrl}create`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webtask;
    const http_options = { headers: header };

    return this.http.post<Webrole[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('create Web User')),
        catchError(this.handleError<Webrole[]>('CreateWebuserService', []))
      );
  }

  /**update web task detail*/
  updateRole(webrole: Webrole): Observable<Webrole[]> {

    const url = `${this.webRoleBaseUrl}edit`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webrole;
    const http_options = { headers: header };

    return this.http.post<Webrole[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webrole[]>('UpdateWebuserService', []))
      );
  }

  /**update mobile task detail*/
  deleteRole(uid: String): Observable<any> {

    const url = `${this.webRoleBaseUrl}delete`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = { uid };
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Delete Web User')),
        catchError(this.handleError<any>('UpdateWebuserService', []))
      );
  }

  /** SET web role details */
  setWebrole(data) {
    this.webRoleData.next(data);
  }

   /** GET web role details */
   getWebrole(): Observable<any> {
    return this.webRoleData.asObservable();
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
      // return of(result as T);

      //Let the app keep running by returning a error result.
      return of(error.error);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messagesService.add(`AppointmentService: ${message}`);
  }

}


