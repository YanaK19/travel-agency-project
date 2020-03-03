import {Component, Input, OnInit} from '@angular/core';
import {Tour} from '../../../../../interfaces/tour/tour.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tours-section',
  templateUrl: './tours-section.component.html',
  styleUrls: ['./tours-section.component.scss']
})
export class ToursSectionComponent implements OnInit {
@Input() toursList: Tour[];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.toursList);
  }

  renderTourPage(tourId) {
    this.router.navigate(['/one-tour', tourId]);
  }
}
