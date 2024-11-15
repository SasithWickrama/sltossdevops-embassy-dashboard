import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import {environment} from "src/environments/environment";
import { MessagesService } from '../services/messages/messages.service';

const AUTH_API = environment.apiBase + 'uaeapi/web/users/';

const HEADER_NAME_AUTH = 'Authorization';

var HEADERS = new HttpHeaders({
                'Content-Type': 'application/json',
              });

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginWebUserBaseUrl = environment.apiBase + 'uaeapi/web/users/'; // URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) {}

  login(userId: string, passCode: string): Observable<any> {

    // const HTTP_OPTIONS = { headers: HEADERS };

    // return this.http.post(
    //   AUTH_API + 'login',
    //   {
    //     userId,
    //     passCode,
    //   },
    //   HTTP_OPTIONS
    // );
    const url = `${this.loginWebUserBaseUrl}login`;

    const body = {userId,passCode,};
    const http_options = { headers: this.header };
    
    return this.http.post(url, body, http_options)
    .pipe(
      tap(_ => this.log('Login Web User')),
      catchError(this.handleError('LoginWebuserService', []))
    );
  }

  register(username: string, email: string, password: string): Observable<any> {

    const HTTP_OPTIONS = { headers: HEADERS };

    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      HTTP_OPTIONS
    );
  }

  logout(): Observable<any> {

    const TOKEN = this.storageService.getUser().token;
    HEADERS = HEADERS.append(HEADER_NAME_AUTH, `Bearer ${TOKEN}`);
    const HTTP_OPTIONS = { headers: HEADERS };

    return this.http.post(AUTH_API + 'signout', { }, HTTP_OPTIONS);
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
      // console.error(error); // log to console instead      

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // // Let the app keep running by returning an empty result.
      // return of(result as T);

      //Let the app keep running by returning a error result.
      return of(error);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messagesService.add(`AppointmentService: ${message}`);
  }
}

