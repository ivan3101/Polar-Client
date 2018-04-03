import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProductsService {
  url;
  openCartEvent = new Subject<Boolean>();
  updateCartEvent = new Subject<Boolean>();
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/api/products';
  }

  getAllProducts(quantity = 10, page = 1, brand = '', available = true): Observable<Product[]> {
    const options = { params: new HttpParams() };
    options.params = options.params.append('quantity', quantity.toString());
    options.params = options.params.append('page', page.toString());
    options.params = options.params.append('brand', brand);
    options.params = options.params.append('available', available.toString());
    return this.httpClient.get<Product[]>(`${this.url}`, options);
  }

  getSingleProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

  updateProduct(id, fields) {
    return this.httpClient.put(`${this.url}/${id}`, fields);
  }
}
