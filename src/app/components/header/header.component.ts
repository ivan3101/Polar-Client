import {Component, HostListener, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    innerWidth: number;
    constructor(private productsService: ProductsService, private userService: UserService) { }

    ngOnInit() {
      this.innerWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    onOpenCart() {
        this.productsService.openCartEvent.next(true);
    }

    onOpenUser() {
        this.userService.openModalEvent.next(true);
    }

}
