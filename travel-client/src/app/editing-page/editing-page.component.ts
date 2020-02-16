import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editing-page',
  templateUrl: './editing-page.component.html',
  styleUrls: ['./editing-page.component.scss']
})
export class EditingPageComponent implements OnInit {
list = [{title: 'info', checked: false}, {title: 'info', checked: false}];
  constructor() { }

  ngOnInit() {
  }

  showCalendar(event){

  }

}
