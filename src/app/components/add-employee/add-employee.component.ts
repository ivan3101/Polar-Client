import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
    employeeForm;
    type;
    message;
    open;
    constructor(private userService: UserService) {
        this.type = null;
        this.message = null;
        this.open = true;
    }

    ngOnInit() {
        this.employeeForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]),
            'cedula': new FormGroup({
                'letter': new FormControl(null, [Validators.required, Validators.pattern('^([VEJPvejpg])$')]),
                'number': new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{7,9})$')])
            }),
            'email': new FormControl(null, [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
            'password': new FormGroup({
                'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
                'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
            }, this.matchPassword)
        });
    }

    matchPassword(formGroup: AbstractControl) {
        if (formGroup.value.newPassword === formGroup.value.confirmPassword) {
            return null;
        } else {
            return {valid: false};
        }
    }

    onSubmit() {
        const employee = {
            'name': this.employeeForm.value.name,
            'cedula': [this.employeeForm.value.cedula.letter, this.employeeForm.value.cedula.number].join('-'),
            'email': this.employeeForm.value.email,
            'password': this.employeeForm.value.password.newPassword
        };
        this.userService.addEmployee(employee).subscribe(() =>{
            this.type = 'success';
            this.message = 'El empleado se ha agregado correctamente';
            this.open = false;
            this.employeeForm.reset();
        });
    }
}
