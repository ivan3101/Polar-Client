import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";
import {AppAlertService} from "../../services/app-alert.service";

@Component({
  selector: 'app-app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.css']
})
export class AppAlertComponent implements OnInit, OnDestroy{
  closed;
  message;
  type;
  alertSubscription: Subscription;
  constructor(private appAlert: AppAlertService) {
    this.closed = true;
    this.type = null;
    this.message = '';
  }

  ngOnInit() {
    this.alertSubscription = this.appAlert.alertEvent.subscribe(value => {
      this.closed = value.state;
      this.type = value.type;
      this.message = value.message;
      setTimeout(() => this.closed = true, 5000);
    })
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

}
