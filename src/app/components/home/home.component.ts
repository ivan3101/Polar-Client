import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('attr.class') class = 'container';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  toStore() {
    this.router.navigate(['products']);
  }

}
