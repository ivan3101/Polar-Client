import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs/Subscription";
import {OrdersService} from '../../services/orders.service';
import {Router} from '@angular/router';
import {AppAlertService} from '../../services/app-alert.service';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {
    selected = [];
    products;
    cards;
    cardSelected;
    @HostBinding('attr.class') class = 'content-container';
    newCardSubscription: Subscription;
    constructor(private productsService: ProductsService,
                private userService: UserService,
                private ordersService: OrdersService,
                private router: Router,
                private appAlertSerice: AppAlertService) {
        this.products = JSON.parse(localStorage.getItem('cart'));
        this.cardSelected = null;
    }

    ngOnInit() {
        this.cards = this.userService.getClientCards(this.userService.getUser()._id);
        this.newCardSubscription = this.userService.newCardEvent.subscribe(value => this.cards = this.userService.getClientCards(this.userService.getUser()._id));
    }

    ngOnDestroy() {
        this.newCardSubscription.unsubscribe();
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

    onDeleteCard(id) {
        this.userService.deleteClientCard(id, this.userService.getUser()._id).subscribe(value => this.updateCards());
    }

    onOpenWizard() {
        this.userService.openAddCardEvent.next(true);
    }

    updateCards() {
        this.cards = this.userService.getClientCards(this.userService.getUser()._id);
    }

    onPay() {
        const order = {
            'buyer': this.userService.getUser()._id,
            'products': [],
            'price': 0.0,
            'totalPrice': '',
            'shippingAddress': this.userService.getUser().address
        };
        JSON.parse(localStorage.getItem('cart')).forEach(product => {
            order.products.push(product._id);
            order.price += product.price * product.total;
        });
        order.totalPrice = order.price.toString() + '.00';
        this.ordersService.createOrder(order).subscribe(value => {
            JSON.parse(localStorage.getItem('cart')).forEach(product => {
                this.productsService.updateProduct(product._id,
                    {'stock': (product.stock - product.total).toString()}).subscribe(value => {});
            setTimeout(() => {
                localStorage.removeItem('cart');
                this.appAlertSerice.alertEvent.next({'state': eval('false'), 'type': 'success', 'message': 'La compra se ha realizado correctamente'});
                this.router.navigate(['/products/all']);
            }, 400);
        });
    }

}
