import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrdersService} from "../../services/orders.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    ordersPending;
    ordersFinished;
    ordersCanceled;
    type: string;
    id: string;
    constructor(private router: Router, private ordersService: OrdersService) {
        this.type = null;
        this.id = null;
    }

    ngOnInit() {
        this.id = this.router.url.split('/')[3];
        if (this.router.url.split('/')[2] === 'client') {
            this.type = 'client';
            this.ordersPending = this.ordersService.getOrdersByUser('En espera');
            this.ordersFinished = this.ordersService.getOrdersByUser('Cancelado');
            this.ordersCanceled = this.ordersService.getOrdersByUser('Entregado');

        } else if (this.router.url.split('/')[2] === 'employee') {
            this.type = 'employee';
            console.log('employee')
        }
    }

}
