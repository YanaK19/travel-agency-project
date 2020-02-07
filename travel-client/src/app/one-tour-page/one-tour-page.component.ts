import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-one-tour-page',
  templateUrl: './one-tour-page.component.html',
  styleUrls: ['./one-tour-page.component.scss']
})
export class OneTourPageComponent implements OnInit {
  id: number;
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
  }

}
