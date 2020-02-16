import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopPageComponent } from './top-page/top-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ToursPageComponent } from './tours-page/tours-page.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { EditingPageComponent } from './editing-page/editing-page.component';
import { OneTourPageComponent } from './one-tour-page/one-tour-page.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import {NavbarDirective} from "./layouts/site-layout/directives/navbar.directive";
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    HomePageComponent,
    TopPageComponent,
    AccountPageComponent,
    ToursPageComponent,
    StatisticPageComponent,
    OrdersPageComponent,
    EditingPageComponent,
    OneTourPageComponent,
    InternalServerComponent,
    NavbarDirective,
    LoaderComponent,
    NotFoundComponent,
    ContactUsComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
