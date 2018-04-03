import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs/Subscription";

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
    constructor(private productsService: ProductsService, private userService: UserService) {
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

    onOpenWizard() {
        this.userService.openAddCardEvent.next(true);
    }


}
