import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}
