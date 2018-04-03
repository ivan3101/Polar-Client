import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import * as cardValidator from 'card-validator';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit, OnDestroy {
    open;
    added;
    state;
    message;
    type;
    years = [new Date().getFullYear()];
    cardForm: FormGroup;
    cardholderForm: FormGroup;
    @ViewChild('wizard') wizard;
    openAddCardSubscription: Subscription;
    constructor(private userService: UserService) {
        this.open = false;
        this.added = false;
        this.type = null;
        this.message = null;
        this.state = true;
        for (let i = 1; i <= 10; i++) {
            this.years.push(new Date().getFullYear() + i);
        }
    }

    ngOnInit() {
        this.cardForm = new FormGroup({
            'cardNumber': new FormControl(null, [Validators.required]),
            'expDate': new FormGroup({
                'month': new FormControl(null, [Validators.required]),
                'year': new FormControl(null, [Validators.required])
            }, ),
            'cvv': new FormControl(null, [Validators.required])
        });
        this.cardholderForm = new FormGroup({
            'cardholderName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
            'cedula': new FormGroup({
                'letter': new FormControl(null, [Validators.required, Validators.pattern('^([VEJPvejpg])$')]),
                'number': new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{7,9})$')])
            })
        });
        this.cardForm.get('cardNumber').setValidators([Validators.required, this.checkCardNumber]);
        this.cardForm.get('expDate').setValidators([this.checkExpDate, this.checkPastYear]);
        this.cardForm.get('cvv').setValidators([Validators.required, this.checkCvv(this)]);
        this.openAddCardSubscription = this.userService.openAddCardEvent.subscribe(value => this.open = true);
    }

    ngOnDestroy() {
        this.openAddCardSubscription.unsubscribe();
    }

    checkCardNumber(formControl: AbstractControl) {
        if (cardValidator.number(formControl.value).isValid) return null;
        else return {'checkCardNumber': true};
    }

    checkExpDate(formGroup: AbstractControl) {
        const year = Number(new Date().getFullYear().toString().substring(2,4)) + 10;
        if (cardValidator.expirationDate({'month': formGroup.value.month, 'year': formGroup.value.year}, year).isValid) return null;
        else return {'checkExpDate': true};
    }

    checkCvv(that) {
        return (formControl: AbstractControl) => {
            if (formControl.value){
                const cardNumber = that.cardForm.value.cardNumber;
                if (cardNumber) {
                    length = cardValidator.number(cardNumber).card.code.size;
                } else {
                    length = 3;
                }
                if (cardValidator.cvv(formControl.value, length).isValid) return null;
                return {'checkCvv': true};
            } else return null;
        }
    }

    checkPastYear(formGroup: AbstractControl) {
        const date = new Date(formGroup.value.year, formGroup.value.month - 1).getTime();
        if (date > new Date().getTime()) return null;
        else return {'checkPastYear': true};
    }

    doCustomClick(event) {
        if (event === 'custom-next') {
            this.onAddCard();
            this.wizard.next();
        } else if (event === 'custom-finish') {
            this.cardForm.reset();
            this.cardholderForm.reset();
            this.wizard.reset();
            this.open = false;
            this.wizard.finish();
        }
    }

    onAddCard() {
        const card = {
            'cardholderName': this.cardholderForm.value.cardholderName,
            'cardNumber': this.cardForm.value.cardNumber,
            'expDate': new Date(this.cardForm.value.expDate.year, this.cardForm.value.expDate.month - 1),
            'cedula': [this.cardholderForm.value.cedula.letter, this.cardholderForm.value.cedula.number].join('-'),
            'csc': this.cardForm.value.csc
        };
        const id = this.userService.getUser()._id;
        this.userService.addClientCard(card, id).subscribe(
            value => {
                this.type = 'success';
                this.message = 'El metodo de pago se ha agregado correctamente';
                this.state = false;
                this.added = true;
                this.userService.newCardEvent.next(true);
            },
            err => {
                this.type = 'danger';
                this.message = err.error.payload.message;
                this.state = false;
            });
    }

}
