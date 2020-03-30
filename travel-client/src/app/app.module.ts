import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './layouts/site-layout/pages/login/login.component';
import { RegisterComponent } from './layouts/site-layout/pages/register/register.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './layouts/site-layout/pages/home/home.component';
import { AccountComponent } from './layouts/site-layout/pages/account/account.component';
import { ToursComponent } from './layouts/site-layout/pages/tours/tours.component';
import { StatisticComponent } from './layouts/admin-layout/pages/statistic/statistic.component';
import { OrdersComponent } from './layouts/admin-layout/pages/orders/orders.component';
import { EditingComponent } from './layouts/admin-layout/pages/editing/editing.component';
import { OneTourComponent } from './layouts/site-layout/pages/one-tour/one-tour.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ContactUsComponent } from './layouts/site-layout/pages/contact-us/contact-us.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { ToursSectionComponent } from './layouts/site-layout/pages/tours/tours-section/tours-section.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BookBlockComponent } from './layouts/site-layout/pages/one-tour/book-block/book-block.component';
import { PlaneLoaderComponent } from './plane-loader/plane-loader.component';
import { BookComponent } from './layouts/site-layout/pages/book/book.component';
import { ReviewsComponent } from './layouts/admin-layout/pages/reviews/reviews.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    HomeComponent,
    AccountComponent,
    ToursComponent,
    StatisticComponent,
    OrdersComponent,
    EditingComponent,
    OneTourComponent,
    InternalServerComponent,
    LoaderComponent,
    NotFoundComponent,
    ContactUsComponent,
    ToursSectionComponent,
    BookBlockComponent,
    PlaneLoaderComponent,
    BookComponent,
    ReviewsComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxBootstrapSliderModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

