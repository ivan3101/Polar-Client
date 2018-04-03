import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {AppAlertService} from '../../services/app-alert.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit, OnDestroy {
  updateForm;
  open;
  product;
  updateStock: Subscription;
  constructor(private productService: ProductsService, private appAlertService: AppAlertService) {
    this.open = false;
  }

  ngOnInit() {
    this.updateStock = this.productService.updateStockEvent.subscribe((product) => {
      this.open = true;
      this.product = product;
      this.updateForm.patchValue({'name': this.product.name});
    });
      this.updateForm = new FormGroup({
          'name': new FormControl({value: null, disabled: true}, [Validators.required]),
          'stock': new FormControl(null, [Validators.required])
      });
  }

  ngOnDestroy() {
    this.updateStock.unsubscribe();
  }

  onUpdateStock() {
    this.productService.updateProduct(this.product._id, this.updateForm.value).subscribe(() => {
      this.appAlertService.alertEvent.next({'state': eval('false'), 'type': 'success', 'message': 'El product se ha actualizado con exito'});
      this.open = false;
      this.updateForm.reset();
      this.productService.stockUpdatedEvent.next();
    });
  }

}
