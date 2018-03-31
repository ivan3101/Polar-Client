import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent implements OnInit, OnDestroy {
  products;
  cart;
  updateCartSubscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  ngOnInit() {
      if(this.router.url.split('/')[2] === '/products/all'.split('/')[2]) {
          this.products = this.productsService.getAllProducts();
      } else if(this.router.url.split('/')[2] === '/products/brand/'.split('/')[2]) {
          this.route.paramMap.subscribe((params: ParamMap) => this.products = this.productsService.getAllProducts(undefined, undefined, params.get('brand')));
      } else if(this.router.url.split('/')[2] === '/products/unavailable'.split('/')[2]) {
          this.products = this.productsService.getAllProducts(undefined, undefined, undefined, false)
      }
      this.updateCartSubscription = this.productsService.updateCartEvent.subscribe((value: boolean) => this.cart = JSON.parse(localStorage.getItem('cart')) || []);
  }

  ngOnDestroy() {
      this.updateCartSubscription.unsubscribe();
  }

  onAddToCart(product: Product) {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.productsService.updateCartEvent.next(true);
  }

  onRemoveFromCart(index: number) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.productsService.updateCartEvent.next(true);
  }

  check(product: Product) {
      return !this.cart.find(elem => elem._id === product._id);
  }


}
