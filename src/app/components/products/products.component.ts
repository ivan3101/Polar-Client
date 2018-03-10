import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @HostBinding('attr.class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
