import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ClarityModule} from "@clr/angular";
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { GridProductsComponent } from './components/grid-products/grid-products.component';
import {ProductsService} from "./services/products.service";
import {HttpClientModule} from "@angular/common/http";
import { CartComponent } from './components/cart/cart.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import { LoginComponent } from './components/login/login.component';
import { AppAlertComponent } from './components/app-alert/app-alert.component';
import {AppAlertService} from "./services/app-alert.service";
import { RegisterComponent } from './components/register/register.component';
import {AuthService} from "./services/auth.service";
import { ClientPanelComponent } from './components/client-panel/client-panel.component';
import { EmployeePanelComponent } from './components/employee-panel/employee-panel.component';
import {ClientAuthService} from "./services/client-auth.service";
import {EmployeeAuthService} from "./services/employee-auth.service";
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import {OrdersService} from './services/orders.service';
import { PayComponent } from './components/pay/pay.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ProductsComponent,
        AboutUsComponent,
        ContactUsComponent,
        SidenavComponent,
        GridProductsComponent,
        CartComponent,
        LoginComponent,
        AppAlertComponent,
        RegisterComponent,
        ClientPanelComponent,
        EmployeePanelComponent,
        ProfileComponent,
        OrdersComponent,
        PayComponent,
        AddCardComponent,
        DetailsModalComponent,
        AddProductComponent,
        AddEmployeeComponent,
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [
        ProductsService,
        UserService,
        AppAlertService,
        AuthService,
        ClientAuthService,
        EmployeeAuthService,
        OrdersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
