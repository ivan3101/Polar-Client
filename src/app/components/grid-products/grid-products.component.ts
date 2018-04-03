import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs/Subscription";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-grid-products',
    templateUrl: './grid-products.component.html',
    styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent implements OnInit, OnDestroy {
    products;
    product;
    cart;
    open: boolean;
    type;
    addForm: FormGroup;
    updateCartSubscription: Subscription;
    session: Subscription;
    stockUpdated: Subscription;
    constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService, private userService: UserService) {
        this.selected = null;
        this.type = null;
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.open = false;
        this.product = null;
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
        this.addForm = new FormGroup({
            'name': new FormControl({value: null, disabled: true}, [Validators.required]),
            'stock': new FormControl(null, [Validators.required])
        });
        if (this.userService.getUser()) {
            if (this.userService.getUser().businessName) this.type = 'client';
            else this.type = 'employee';
        }
        this.session = this.userService.sessionEvent.subscribe(value => {
            if (value) {
                if (this.userService.getUser()) {
                    if (this.userService.getUser().businessName) this.type = 'client';
                    else this.type = 'employee';
                }
            } else {
                this.type = null;
            }
        });
        this.stockUpdated = this.productsService.stockUpdatedEvent.subscribe(() => {
            if(this.router.url.split('/')[2] === '/products/all'.split('/')[2]) {
                this.products = this.productsService.getAllProducts();
            } else if(this.router.url.split('/')[2] === '/products/brand/'.split('/')[2]) {
                this.route.paramMap.subscribe((params: ParamMap) => this.products = this.productsService.getAllProducts(undefined, undefined, params.get('brand')));
            } else if(this.router.url.split('/')[2] === '/products/unavailable'.split('/')[2]) {
                this.products = this.productsService.getAllProducts(undefined, undefined, undefined, false)
            }
        })
    }

    ngOnDestroy() {
        this.updateCartSubscription.unsubscribe();
        this.session.unsubscribe();
        this.stockUpdated.unsubscribe();
    }

    onUpdateStock(product) {
        this.productsService.updateStockEvent.next(product);
    }

    onAddToCart() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.product.total = this.addForm.value.stock;
        this.cart.push(this.product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.productsService.updateCartEvent.next(true);
        this.addForm.reset();
        this.open = false;
    }

    onRemoveFromCart(product) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        const index = this.cart.findIndex(value => value._id === product._id);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.productsService.updateCartEvent.next(true);
    }

    check(product: Product) {
        return !this.cart.find(elem => elem._id === product._id);
    }

    onAdd(product) {
        this.product = product;
        this.addForm.get('name').patchValue(this.product.name);
        this.addForm.get('stock').setValidators(this.checkQuantity(this.product.stock));
        this.open = true;
    }

    checkQuantity(stock) {
        return (formControl: AbstractControl) => {
            if (formControl.value <= stock) {
                return null;
            } else {
                return {checkQuantity: true};
            }
        }
    }

}
