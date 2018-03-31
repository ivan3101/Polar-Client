import {AfterContentChecked, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  session;
  constructor(private route: Router) {
    this.session = false;
  }

  ngAfterContentChecked() {
    this.checkToken();
  }

  checkRoute(url: string) {
    return this.route.url === url;
  }
  checkToken() {
    this.session = !localStorage.getItem('token');
  }
}
