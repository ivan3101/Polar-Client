import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {ContactUsComponent} from "./components/contact-us/contact-us.component";
import {GridProductsComponent} from "./components/grid-products/grid-products.component";
import {ClientPanelComponent} from "./components/client-panel/client-panel.component";
import {EmployeePanelComponent} from "./components/employee-panel/employee-panel.component";
import {ClientAuthService} from "./services/client-auth.service";
import {EmployeeAuthService} from "./services/employee-auth.service";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProductsComponent, children: [
            {path: '', redirectTo: 'all', pathMatch: 'full'},
            {path: 'all', component: GridProductsComponent},
            {path: 'brand/:brand', component: GridProductsComponent},
            {path: 'unavailable', component: GridProductsComponent}
        ]},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'adm', children: [
            {path: '', redirectTo: '/products/all', pathMatch: 'full'},
            {path: 'client/:id', component: ClientPanelComponent, canActivate: [ClientAuthService]},
            {path: 'employee/:id', component: EmployeePanelComponent, canActivate: [EmployeeAuthService]}
        ]},
    {path: '**', redirectTo: '/home'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
