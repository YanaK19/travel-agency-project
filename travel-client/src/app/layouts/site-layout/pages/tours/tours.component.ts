import { Component, OnInit } from '@angular/core';
import {ToursService} from '../../../../services/tours.service';
import {Router} from '@angular/router';
import {Tour} from '../../../../interfaces/tour/tour.interface';

@Component({
  selector: 'app-tours-page',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  loading = false;
  value: any;
  enabled: any;


  constructor(private toursService: ToursService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.toursService.getTours().subscribe((data) => {
      this.tours = data;
      this.loading = false;
      console.log(this.tours);
    });
  }
}
