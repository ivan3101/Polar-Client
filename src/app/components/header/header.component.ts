import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    session;
    type;
    id;
    sessionSubscription: Subscription;
    innerWidth: number;
    constructor(private productsService: ProductsService, private userService: UserService, private authService: AuthService, private router: Router) {
        this.session = false;
        this.type = null;
        this.id = null;
    }

    ngOnInit() {
      this.innerWidth = window.innerWidth;
      if (this.authService.getToken() !== null) {
          this.session = true;
          this.id = this.userService.getUser()._id;
          if (this.userService.getUser().businessName) this.type = 'client';
          else this.type = 'employee';
      }
      this.sessionSubscription = this.userService.sessionEvent.subscribe(value => {
          this.session = value;
          if (this.session) {
              setTimeout(() => {
                  this.id = this.userService.getUser()._id;
                  if (this.userService.getUser().businessName) this.type = 'client';
                  else this.type = 'employee';
              }, 500);
          }
      });
    }

    ngOnDestroy() {
        this.sessionSubscription.unsubscribe();
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

    onLogout() {
        this.userService.removeUser();
        this.authService.removeToken();
        this.session = false;
        this.router.navigate(['/products', 'all']);
        this.userService.sessionEvent.next(false);
    }

    onRedirecToOrders() {
        this.router.navigate(['/adm', this.type, this.id, 'orders']);
    }

    onRedirecToProfile() {
        this.router.navigate(['/adm', this.type, this.id, 'profile']);
    }
}
