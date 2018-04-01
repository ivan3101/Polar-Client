import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AppAlertService} from "./app-alert.service";
import {AuthService} from "./auth.service";

@Injectable()
export class EmployeeAuthService implements CanActivate{

    constructor(private authService: AuthService, private router: Router, private appAlertSerivce: AppAlertService) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated('employee')
            .map(value => {
                return true;
            })
            .catch((err) => {
                this.router.navigate(['/products/all']);
                this.appAlertSerivce.alertEvent.next({
                    'state' : eval('false'),
                    'type': 'danger',
                    'message': err.error.payload.message
                });
                return Promise.resolve(false);
            })
    }
}