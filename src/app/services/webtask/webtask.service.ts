import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { StorageService } from '../../services/storage.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Webtask } from '../../interfaces/webtask/webtask';

const HEADER_NAME_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class WebtaskService {

  private webTaskBaseUrl = environment.apiBase + 'uaeapi/web/task/'; // URL to web api
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private params = new HttpParams();
  private webtask = {} as Webtask;
  private webTaskData = new BehaviorSubject<Webtask>(this.webtask);
  public currentwebUserData = this.webTaskData.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService, private messagesService: MessagesService) { }

  /** GET all web tasks details */
  getAllTasks(): Observable<Webtask[]> {

    const url = `${this.webTaskBaseUrl}get`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const http_options = { headers: header};

    return this.http.get<Webtask[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webtask[]>('WebuserService', []))
      );
  }

  /** GET web user details by uid */
  getTaskByUid(uid: string): Observable<Webtask[]> {

    const url = `${this.webTaskBaseUrl}getbyuid`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('uid', uid): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Webtask[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched web Task')),
        catchError(this.handleError<Webtask[]>('getByUidwebtaskService', []))
      );
  }

  /** Create new web task */
  createTask(webtask: Webtask): Observable<Webtask[]> {

    const url = `${this.webTaskBaseUrl}create`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webtask;
    const http_options = { headers: header };

    return this.http.post<Webtask[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('create Web User')),
        catchError(this.handleError<Webtask[]>('CreateWebuserService', []))
      );
  }

  /**update web task detail*/
  updateTask(webtask: Webtask): Observable<Webtask[]> {

    const url = `${this.webTaskBaseUrl}edit`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = webtask;
    const http_options = { headers: header };

    return this.http.post<Webtask[]>(url, body, http_options)
      .pipe(
        tap(_ => this.log('fetched Web User')),
        catchError(this.handleError<Webtask[]>('UpdateWebuserService', []))
      );
  }

  /**update mobile task detail*/
  deleteTask(uid: String): Observable<any> {

    const url = `${this.webTaskBaseUrl}delete`;
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

  /** Assign tasks for a role */
  assignTaskToRole(role_id: String, tasks: { task_id: String }[]): Observable<any> {

    const url = `${this.webTaskBaseUrl}assign`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = { role_id, tasks };
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Delete Web User')),
        catchError(this.handleError<any>('UpdateWebuserService', []))
      );
   
  }

   /**remove tasks from a role */
   removeTaskFromRole(role_id: String, tasks: { task_id: String }[]): Observable<any> {

    const url = `${this.webTaskBaseUrl}remove`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const body = { role_id, tasks };
    const http_options = { headers: header };

    return this.http.post<any>(url, body, http_options)
      .pipe(
        tap(_ => this.log('Delete Web User')),
        catchError(this.handleError<any>('UpdateWebuserService', []))
      );
   
  }

  /** GET all tasks for given role */
  getTaskFromRole(role_id: string): Observable<Webtask[]> {

    const url = `${this.webTaskBaseUrl}assign`;
    const token = this.storageService.getToken();

    const header = this.header.append(HEADER_NAME_AUTH, `Bearer ${token}`);
    const params = HttpParams ? this.params.append('role_id', role_id): this.params;
    const http_options = { headers: header, params: params };

    return this.http.get<Webtask[]>(url, http_options)
      .pipe(
        tap(_ => this.log('fetched web Task to given role')),
        catchError(this.handleError<Webtask[]>('getTasksByRoleId', []))
      );
  }

  /** SET web user details */
  setWebtask(data) {
    this.webTaskData.next(data);
  }

  /** GET web user details */
  getWebtask(): Observable<any> {
    return this.webTaskData.asObservable();
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
