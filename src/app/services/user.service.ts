import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/client.model";
import {Observable} from "rxjs/Observable";
import {Employee} from "../models/employee.model";

@Injectable()
export class UserService {
    url: string;
    openModalEvent = new Subject<boolean>();
    openRegisterEvent = new Subject<boolean>();
    openAddCardEvent = new Subject<boolean>();
    sessionEvent = new Subject<boolean>();
    newCardEvent = new Subject<boolean>();

    constructor(private httpClient: HttpClient) {
        this.url = 'http://localhost:3000/api';
    }

    addClient(client: Client): Observable<any> {
        return this.httpClient.post(`${this.url}/clients`, client);
    }

    clientLogin(client): Observable<any> {
        return this.httpClient.post(`${this.url}/auth/clients`, client);
    }

    addEmployee(employee: Employee): Observable<any> {
        return this.httpClient.post(`${this.url}/employees`, employee);
    }

    employeeLogin(employee): Observable<any> {
        return this.httpClient.post(`${this.url}/auth/employees`, employee);
    }

    getClientCards(id): Observable<any> {
        return this.httpClient.get(`${this.url}/clients/${id}/cards`);
    }
    getClient(id) {
        return this.httpClient.get(`${this.url}/clients/${id}`);
    }

    getEmployee(id) {
        return this.httpClient.get(`${this.url}/employees/${id}`);
    }

    setUser(user): void {
        localStorage.setItem('user',  JSON.stringify(user));
    }

    getUser(): any {
        return JSON.parse(localStorage.getItem('user'));
    }

    removeUser(): void {
        localStorage.removeItem('user');
    }

    addClientCard(card, id) {
        return this.httpClient.put(`${this.url}/clients/${id}/cards`, card);
    }
}