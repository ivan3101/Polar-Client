import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-grid-products',
  templateUrl: './grid-products.component.html',
  styleUrls: ['./grid-products.component.css']
})
export class GridProductsComponent implements OnInit {
  s;
  constructor(private route: ActivatedRoute, private router: Router) {
    if(this.router.url.split('/')[2] === '/products/all'.split('/')[2]) {
      this.s = 'Todos los productos';
    } else if(this.router.url.split('/')[2] === '/products/brand/'.split('/')[2]) {
      this.s = 'Marca';
    } else if(this.router.url.split('/')[2] === '/products/unavailable'.split('/')[2]) {
      this.s = 'Productos no disponibles';
    }
  }

  ngOnInit() {
  }

}
