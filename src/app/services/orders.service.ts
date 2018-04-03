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
        return this.httpClient.post(this.url, order);
    }

    getAllOrders(state) {
        const options = { params: new HttpParams() };
        options.params = options.params.append('state', state);
        options.params = options.params.append('id', this.userService.getUser()._id);
        return this.httpClient.get(`${this.url}`, options);
    }

    getOrdersByUser(state: string) {
        const options = { params: new HttpParams() };
        options.params = options.params.append('state', state);
        options.params = options.params.append('id', this.userService.getUser()._id);
        return this.httpClient.get(`${this.url}/clients`, options);
    }

    cancelOrder(id, state) {
        const options = { params: new HttpParams() };
        options.params = options.params.append('state', state);
        return this.httpClient.put(`${this.url}/${id}`, {}, options);
    }

}
