import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs/Subscription";
import {AppAlertService} from "../../services/app-alert.service";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    open;
    state;
    message;
    type;
    loading;
    registered;
    basicForm: FormGroup;
    contactForm: FormGroup;
    signinForm: FormGroup;
    @ViewChild('wizard') wizard;
    @ViewChild('lastPage') lastPage;
    openRegisterSubscription: Subscription;
    constructor(private userService: UserService, private appAlertService: AppAlertService, private authService: AuthService) {
        this.open = false;
        this.state = true;
        this.message = '';
        this.type = null;
        this.loading = false;
        this.registered = false;
    }

    ngOnInit() {
        this.openRegisterSubscription = this.userService.openRegisterEvent.subscribe((value: boolean) => this.open = value);
        this.basicForm = new FormGroup({
            'businessName': new FormControl(null, [Validators.required, Validators.pattern('^(?![0-9.,])[a-z0-9\\s.,]+$')]),
            'rif': new FormGroup({
                'letter': new FormControl('e', [Validators.required, Validators.pattern('^([VEJPGvejpg])$')]),
                'number': new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{8})$'), Validators.maxLength(8)]),
                'digit': new FormControl(null, [Validators.required, Validators.pattern('^([0-9])$'), Validators.maxLength(1)])
            }),
            'address': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.\\s]+$'), Validators.maxLength(150)]),
        });
        this.contactForm = new FormGroup({
            'tlpNumber': new FormGroup({
                'prefix': new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{4})$')]),
                'number': new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{7})$')])
            }),
            'ownerName': new FormArray([
                new FormGroup({
                    'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
                    'lastname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')])
                })
            ])
        });
        this.signinForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
            'password': new FormGroup({
                'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
                'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
            }, this.matchPassword)
        })
    }

    ngOnDestroy() {
        this.openRegisterSubscription.unsubscribe();
    }

    onLogin() {
        const client = {
            'email': this.signinForm.value.email,
            'password': this.signinForm.value.password.newPassword
        };
        this.userService.clientLogin(client).subscribe(
            value => {
                this.userService.setUser(value.user);
                this.authService.setToken(value.token);
                this.appAlertService.alertEvent.next({
                    'state': eval('false'),
                    'type': 'success',
                    'message': 'Se inicio sesión correctamente'
                });
                this.userService.sessionEvent.next(true);
            },
            err => {
                this.appAlertService.alertEvent.next({
                    'state': eval('false'),
                    'type': 'danger',
                    'message': err.error.payload.message
                });
            }
        );
    }

    onAddOwner() {
        const owner = new FormGroup({
            'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
            'lastname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')])
        });
        (<FormArray>this.contactForm.get('ownerName')).push(owner);
    }

    onDeleteOwner(index: number) {
        (<FormArray>this.contactForm.get('ownerName')).removeAt(index);
    }

    matchPassword(formGroup: AbstractControl) {
        if (formGroup.value.newPassword === formGroup.value.confirmPassword) {
            return null;
        } else {
            return {valid: false};
        }
    }

    doCustomClick(buttonType: string) {
        if (buttonType === 'custom-next') {
            this.onSignup();
            this.wizard.next();
            this.loading = false;
        } else if (buttonType === 'custom-finish') {
            this.onLogin();
            this.basicForm.reset();
            this.contactForm.reset();
            this.signinForm.reset();
            this.wizard.reset();
            this.wizard.finish();
        }
    }

    onSignup() {
        this.loading = true;
        const client = {
            'businessName': this.basicForm.value.businessName,
            'password': this.signinForm.value.password.newPassword,
            'email': this.signinForm.value.email,
            'rif': [this.basicForm.value.rif.letter, this.basicForm.value.rif.number, this.basicForm.value.rif.digit].join('-'),
            'address': this.basicForm.value.address,
            'tlpNumber': [this.contactForm.value.tlpNumber.prefix, this.contactForm.value.tlpNumber.number].join('-'),
            'ownerName': []
        };
        this.contactForm.value.ownerName.forEach(value => client.ownerName.push([value.firstname, value.lastname].join(' ')));
        this.userService.addClient(client).subscribe(
            value => {
                this.state = false;
                this.type = 'success';
                this.message = '¡Felicitaciones! Se ha registrado con exito';
                this.registered = true;
            },
            err => {
                this.state = false;
                this.type = 'danger';
                this.message = `¡Ha ocurrido un problema! ${err.error.payload.message}`;
            }
        )
    }
}
