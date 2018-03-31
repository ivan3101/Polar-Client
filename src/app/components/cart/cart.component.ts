import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  open;
  products;
  selected = [];
  openCartSubscription: Subscription;
  updateCartSubscription: Subscription;
  constructor(private productsService: ProductsService) {
    this.products = JSON.parse(localStorage.getItem('cart'));
    this.open = false;
  }

  ngOnInit() {
    this.openCartSubscription = this.productsService.openCartEvent.subscribe((value: boolean) => this.open = value);
    this.updateCartSubscription = this.productsService.updateCartEvent.subscribe((value: boolean) => this.products = JSON.parse(localStorage.getItem('cart')));
  }

  ngOnDestroy() {
    this.openCartSubscription.unsubscribe();
    this.updateCartSubscription.unsubscribe();
  }
  onDelete() {
    this.selected.forEach(value => {
      const index = this.products.findIndex(elem => elem._id === value._id);
      if (index !== -1) this.products.splice(index, 1);
    });
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.productsService.updateCartEvent.next(true);
    this.selected = [];
  }

}
