import {Component, Input, OnInit} from '@angular/core';
import {Tour} from '../../../../../interfaces/tour/tour.interface';
import {Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {AuthorizationService} from '../../../../../services/authorization.service';

@Component({
  selector: 'app-tours-section',
  templateUrl: './tours-section.component.html',
  styleUrls: ['./tours-section.component.scss']
})
export class ToursSectionComponent implements OnInit {
@Input() toursList: Tour[];
@Input() parentComponent: string;
@Input() isMyAccount: string;
  isAuthenticated = false;

  constructor(private router: Router,
              private userService: UserService,
              private auth: AuthorizationService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated()
  }

  renderTourPage(tourId) {

    this.router.navigate(['/one-tour', tourId]);
  }

  onAddToFavourites(tourId){
    this.userService.addToFavourites(tourId).subscribe(updatedUser => {
    })
  }

  isTourExistInFavourites(tourId) {
    let favourites = JSON.parse(localStorage.getItem('userData')).favouriteTourIds;
    if(favourites.indexOf(tourId) === -1) {
      return false;
    } else {
      return true;
    }
  }

  onDeleteFromFavourites(tourId) {
    if (this.parentComponent === 'account' && this.isMyAccount) {
      const index = this.toursList.findIndex(tour => tour._id === tourId);
      this.toursList.splice(index, 1);
    }

    this.userService.deleteFromFavourites(tourId).subscribe(updatedUser => {
    });
  }
}
