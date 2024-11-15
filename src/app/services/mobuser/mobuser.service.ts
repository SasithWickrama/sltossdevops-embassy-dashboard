import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {environment} from "src/environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Mobuser } from '../../interfaces/mobuser/mobuser';

const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class MobuserService {

  private  mobUserBaseUrl = environment.apiBase + 'uaeapi/web/mobuser/'; // URL to web api
  private  mobUserBaseUrlfromuser = environment.apiBase + 'uaeapi/users/'; // URL to user api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();
  private mobuser = {} as Mobuser;
  private mobUserData = new BehaviorSubject<Mobuser>(this.mobuser);

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) { }

  /** GET all mobile users */
  getAllUsers(): Observable<Mobuser[]> {

    const url = `${this.mobUserBaseUrl}getall`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const http_options = { headers: header};

    return this.http.get<Mobuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Mobuser[]>('MobuserService', []))
      );
  }

   /** GET mobile user details by passport number */
   getUsers(passportNo: string): Observable<Mobuser[]> {

    const url = `${this.mobUserBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('passportNo', passportNo): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Mobuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Mobuser[]>('MobuserService', []))
      );
  }

  /** GET mobile user details by uid */
  getUserByUid(uid: string): Observable<Mobuser[]> {

    const url = `${this.mobUserBaseUrl}getbyuid`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('uid', uid): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Mobuser[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Mobuser[]>('getByUidMobuserService', []))
      );
  }

  /** SET mob user details */
  setUserByUid(data) {

    this.mobUserData.next(data);
    
  }

  /** Create new mobile user d*/
  createUser(mobuser: Mobuser): Observable<Mobuser[]> {

    const url = `${this.mobUserBaseUrl}create`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    // const params = HttpParams ? this.params.append('uid', uid): this.params;
    const body = mobuser;
    const http_options = { headers: header };

    return this.http.post<Mobuser[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('create Mobile User')),
        catchError(this.handleError<Mobuser[]>('CreateMobuserService', []))
      );
  }

  /**update mobile user details*/
  updateUser(mobuser: Mobuser): Observable<Mobuser[]> {

    const url = `${this.mobUserBaseUrl}edit`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    // const params = HttpParams ? this.params.append('uid', uid): this.params;
    const body = mobuser;
    const http_options = { headers: header };

    return this.http.post<Mobuser[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('fetched Mobile User')),
        catchError(this.handleError<Mobuser[]>('UpdateMobuserService', []))
      );
  }

  /**update mobile user details*/
  deleteUser(uid: String): Observable<any> {

    const url = `${this.mobUserBaseUrl}delete`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = { uid };
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Delete Mobile User')),
        catchError(this.handleError<any>('UpdateMobuserService', []))
      );
  }

  /** SET mob user details */
  setMobUser(data) {
    this.mobUserData.next(data);
  }

  /** GET mob user details */
  getMobUser(): Observable<any> {
    return this.mobUserData.asObservable();
  }

  // /**update mobile user details ## from web user ## */ 
  // changeUserPw(uid: string, passCode: String): any {

  //   const url = `${this.mobUserBaseUrl}changepasswd`;
  //   const token = this.storageService.getToken();

  //   const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
  //   const body = {uid, passCode};
  //   const http_options = { headers: header };

  //   return this.http.post<any>(url, body, http_options)
  //     .pipe(
  //       tap(_ => this.log('Change Mobile User')),
  //       catchError(this.handleError<any>('UpdateMobuserService', []))
  //     );
  // }

  /**update mobile user details ## from user ## */
  changeUserPw(passportNo: string, passCode: String): any {

    const url = `${this.mobUserBaseUrlfromuser}changepasswd`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = {passportNo, passCode};
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Change Mobile User')),
        catchError(this.handleError<any>('UpdateMobuserService', []))
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
