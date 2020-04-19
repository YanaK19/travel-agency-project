import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SiteLayoutComponent} from './layouts/site-layout/site-layout.component';
import {LoginComponent} from './layouts/site-layout/pages/login/login.component';
import {RegisterComponent} from './layouts/site-layout/pages/register/register.component';
import {HomeComponent} from './layouts/site-layout/pages/home/home.component';
import {ToursComponent} from './layouts/site-layout/pages/tours/tours.component';
import {StatisticComponent} from './layouts/admin-layout/pages/statistic/statistic.component';
import {OrdersComponent} from './layouts/admin-layout/pages/orders/orders.component';
import {EditingComponent} from './layouts/admin-layout/pages/editing/editing.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {OneTourComponent} from './layouts/site-layout/pages/one-tour/one-tour.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {InternalServerComponent} from './error-pages/internal-server/internal-server.component';
import {NotFoundComponent} from './error-pages/not-found/not-found.component';
import {AccountComponent} from './layouts/site-layout/pages/account/account.component';
import {ContactUsComponent} from './layouts/site-layout/pages/contact-us/contact-us.component';
import {BookComponent} from './layouts/site-layout/pages/book/book.component';
import {ReviewsComponent} from './layouts/admin-layout/pages/reviews/reviews.component';


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'account/:id', component: AccountComponent},
      {path: 'contact', component: ContactUsComponent},
      {path: 'tours', component: ToursComponent},
      {path: 'one-tour/:id', component: OneTourComponent},
      {path: 'home', component: HomeComponent},
      {path: 'book/:id', component: BookComponent, canActivate: [AuthorizationGuard]},
    ],
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      {path: 'statistic', component: StatisticComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'reviews', component: ReviewsComponent},
      {path: 'editing', component: EditingComponent}
    ], canActivate: [AuthorizationGuard]
  },
  {path: 'error500', component: InternalServerComponent},
  {path: 'error404', component: NotFoundComponent},
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
