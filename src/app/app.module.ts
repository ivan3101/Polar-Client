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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    AboutUsComponent,
    ContactUsComponent,
    SidenavComponent,
    GridProductsComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
