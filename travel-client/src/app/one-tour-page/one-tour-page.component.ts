import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Tour} from "../interfaces/tour.interface";
import {ToursService} from "../services/tours.service";

@Component({
  selector: 'app-one-tour-page',
  templateUrl: './one-tour-page.component.html',
  styleUrls: ['./one-tour-page.component.scss']
})
export class OneTourPageComponent implements OnInit {
  id: string;
  tour: Tour;

  constructor(private activatedRoute: ActivatedRoute,
              private toursService: ToursService) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
      this.toursService.getOneTour(this.id).subscribe((data )=>{
      this.tour = data;
      console.log(this.tour)
/*console.log(this.tour, typeof this.tour, this.tour.title);*/
      });
  }

}
