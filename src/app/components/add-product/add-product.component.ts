import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    productForm;
    type;
    message;
    open;
    constructor(private productService: ProductsService) {
        this.type = null;
        this.message = null;
        this.open = true;
    }

    ngOnInit() {
        this.productForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
            'imagePath': new FormControl(null, [Validators.required]),
            'weight': new FormControl(null, [Validators.required, Validators.pattern('^([0-9.]+)$')]),
            'stock': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required, Validators.pattern('([0-9.]+)$')]),
            'brand': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        this.productService.addProduct(this.productForm.value).subscribe(() => {
            this.type = 'success';
            this.message = 'El empleado se ha agregado correctamente';
            this.open = false;
            this.productForm.reset();
        });
    }

}
