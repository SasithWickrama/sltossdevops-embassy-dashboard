import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import {environment} from "src/environments/environment";

const API_URL = environment.apiBase + 'uaeapi/web/users/';

const HEADER_NAME_AUTH = 'Authorization';

var HEADERS = new HttpHeaders({
                'Content-Type': 'application/json',
              });

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getUsers(): Observable<any> {

    const TOKEN = this.storageService.getToken();
    HEADERS = HEADERS.append(HEADER_NAME_AUTH, `Bearer ${TOKEN}`);
    const HTTP_OPTIONS = { headers: HEADERS };

    return this.http.get(
      API_URL + 'get', 
      // { responseType: 'text' }, 
      HTTP_OPTIONS
    );
  }

  
}