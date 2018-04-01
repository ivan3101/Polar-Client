import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AppAlertService} from "./app-alert.service";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  isAuthenticated(type: string) {
    const token = {'token': this.getToken()};
    return this.httpClient.post(`http://localhost:3000/api/auth/checkToken/${type}`, token);
  }

  setToken(token): void {
      localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
