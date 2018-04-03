import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable()
export class OrdersService {
    url: string;
    constructor(private httpClient: HttpClient, private userService: UserService) {
        this.url = 'http://localhost:3000/api/orders';
    }

    createOrder(order) {
        const options = { params: new HttpParams() };
        options.params = options.params.append('id', this.userService.getUser()._id);
        return this.httpClient.post(this.url, options);
    }

    getOrdersByUser(state: string) {
        const options = { params: new HttpParams() };
        options.params = options.params.append('state', state);
        options.params = options.params.append('id', this.userService.getUser()._id);
        return this.httpClient.get(`${this.url}/clients`, options);
    }

}
