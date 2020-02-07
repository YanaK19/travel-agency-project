import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ToursPageComponent} from "./tours-page/tours-page.component";
import {TopPageComponent} from "./top-page/top-page.component";
import {StatisticPageComponent} from "./statistic-page/statistic-page.component";
import {OrdersPageComponent} from "./orders-page/orders-page.component";
import {EditingPageComponent} from "./editing-page/editing-page.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {OneTourPageComponent} from "./one-tour-page/one-tour-page.component";
import {AuthorizationGuard} from "./classes/authorization.guard";


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'top', component: TopPageComponent},
      {path: 'tours', component: ToursPageComponent},
      {path: 'tour/:id', component: OneTourPageComponent},
      {path: 'home', component: HomePageComponent}
    ],
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      {path: 'statistic', component: StatisticPageComponent},
      {path: 'orders', component: OrdersPageComponent},
      {path: 'editing', component: EditingPageComponent}
    ], canActivate: [AuthorizationGuard]
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
