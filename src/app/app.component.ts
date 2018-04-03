import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  session;
  sessionSubscription: Subscription;
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.session = false;
  }

  ngOnInit() {
    if (this.authService.getToken() !== null) this.session = true;
    this.sessionSubscription = this.userService.sessionEvent.subscribe(value => this.session = value);
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  checkRoute(url: string) {
    return this.router.url === url;
  }

}
