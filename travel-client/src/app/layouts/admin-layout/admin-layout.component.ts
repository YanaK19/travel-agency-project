import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  links = [
    {url: '/admin/statistic', name: 'statistic'},
    {url: '/admin/orders', name: 'orders'},
    {url: '/admin/editing', name: 'editing'},
  ];

  constructor(private auth: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
  }

  logout(event: Event){
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
