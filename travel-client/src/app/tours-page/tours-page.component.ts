import { Component, OnInit } from '@angular/core';
import {ToursService} from "../services/tours.service";
import {Router} from "@angular/router";
import {Tour} from "../interfaces/tour.interface";

@Component({
  selector: 'app-tours-page',
  templateUrl: './tours-page.component.html',
  styleUrls: ['./tours-page.component.scss']
})
export class ToursPageComponent implements OnInit {
  tours: Tour[] = [];
  loading: boolean = false;
  value: any;
  enabled: any;


  constructor(private toursService: ToursService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.toursService.getTours().subscribe((data)=>{
      this.loading = false;
      this.tours = data;
      console.log(this.tours);
    })
  }

  renderOneTourPage(id: string) {
    this.router.navigate(['/one-tour/', id]);
  }
}
