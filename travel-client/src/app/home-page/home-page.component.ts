import { Component, OnInit } from '@angular/core';
import * as AOS from "aos"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}
