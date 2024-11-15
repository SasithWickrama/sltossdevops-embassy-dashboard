import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {environment} from "src/environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Webuser } from '../../interfaces/webuser/webuser';

const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class WebuserService {

  private webUserBaseUrl = environment.apiBase + 'uaeapi/web/users/'; // URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();
  private webuser = {} as Webuser;
  private webUserData = new BehaviorSubject<Webuser>(this.webuser);
  public currentwebUserData = this.webUserData.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) { }

  /** GET web user details by id */
  getUser(username: string): Observable<Webuser[]> {

    const url = `${this.webUserBaseUrl}get/${username}`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    // const params = HttpParams ? this.params.append('id', username): this.params;
    const http_options = { headers: header};

    return this.http.get<Webuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webuser[]>('WebuserService', []))
      );
  }

  /** GET web user details by uid */
  getUserByUid(uid: string): Observable<Webuser[]> {

    const url = `${this.webUserBaseUrl}getbyuid`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('uid', uid): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Webuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Webuser[]>('getByUidMobuserService', []))
      );
  }

  /** GET all web users */
  getAllUsers(): Observable<Webuser[]> {

    const url = `${this.webUserBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const http_options = { headers: header};

    return this.http.get<Webuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webuser[]>('WebuserService', []))
      );
  }

  /** Create new web user */
  createUser(webuser: Webuser): Observable<Webuser[]> {

    const url = `${this.webUserBaseUrl}create`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webuser;
    const http_options = { headers: header };

    return this.http.post<Webuser[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('create Web User')),
        catchError(this.handleError<Webuser[]>('CreateWebuserService', []))
      );
  }

  /**update web user details*/
  updateUser(webuser: Webuser): Observable<Webuser[]> {

    const url = `${this.webUserBaseUrl}edit`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webuser;
    const http_options = { headers: header };

    return this.http.post<Webuser[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webuser[]>('UpdateWebuserService', []))
      );
  }

  /**update mobile user details*/
  deleteUser(uid: String): Observable<any> {

    const url = `${this.webUserBaseUrl}delete`;
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

  /**change pw web user details*/
  changeUserPw(uid: string, passCode: String): any {

    const url = `${this.webUserBaseUrl}changepasswd`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {uid, passCode};
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Change Web User')),
        catchError(this.handleError<any>('UpdateWebuserService', []))
      );
  }

  /** SET web user details */
  setWebuser(data) {
    this.webUserData.next(data);
  }

  /** GET web user details */
  getWebuser(): Observable<any> {
    return this.webUserData.asObservable();
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
