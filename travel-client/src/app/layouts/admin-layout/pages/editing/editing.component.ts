import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {ToursService} from '../../../../services/tours.service';
import {RangeService} from '../../../../services/range.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editing-page',
  templateUrl: './editing.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {
/*  list = [{title: 'info', checked: false}, {title: 'info', checked: false}];*/
  tours: Tour[] = [];
  tour: Tour;
  rangeTransports: any;
  rangeTourTypes: any;
  filterForm: FormGroup;
  @ViewChild("content", {static: false}) content: ElementRef;

  addRestType;
  addNewRestType;
  addNewTransportType;
  addDateFrom;
  addDateTo;
  isNewTour;

  constructor(private modalService: NgbModal,
              private tourService: ToursService,
              private rangeService: RangeService) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      fromCountry: new FormControl(),
      toCountry: new FormControl(),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      transportType: new FormControl(),
      restType: new FormControl(),
      sort: new FormControl()
    });

    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
      this.tour = tours[0];
     /* this.modalService.open(this.content, {backdropClass: 'light-blue-backdrop'});*/
    });

    this.rangeService.getRanges().subscribe(ranges => {
      ranges.forEach(range => {
        if (range.category === 'transport') {
          this.rangeTransports = range;
        }

        if (range.category === 'rest') {
          this.rangeTourTypes = range;
        }
      });
    });
  }

  openModal(content, tour) {
    this.tour = tour;
    this.isNewTour = false;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});

  }

  onAdd(content) {
    this.tour = {
      title: "",
      route: {
        fromCountry: "",
        fromTown: "",
        toCountry: "",
        toTown: ""
      },
    restType: [],
    images: [],
    discount: null,
    transportType: "",
    cost: null,
    moreInfo: "",
    dates: [],
    bookedMax: null,
    booked: null,
    views: null
    };

    this.isNewTour = true;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  onConfirm() {}

  editTour() {
    if(!this.isNewTour) {
      /* put req to tour db */
    } else {
      /* post req to tour db */
    }

    console.log(this.tour);
    /* this.modalService.dismissAll();*/
  }

  Search() {

  }

  deleteDateInTour(dateIndex) {
    this.tour.dates.splice(dateIndex, 1);
  }

  addNewTourDate() {
    this.tour.dates.push({dateFrom: this.addDateFrom, dateTo: this.addDateTo});
  }

  deleteRestTourType(restIndex) {
    this.tour.restType.splice(restIndex, 1);
  }

  addRestTourType() {
    this.tour.restType.push(this.addRestType);
  }

  AddNewRestType() {
    this.rangeTourTypes.types.push(this.addNewRestType);
    this.tour.restType.push(this.addNewRestType);

    /* put request to ranges */
  }

  addNewTransport() {
    this.rangeTransports.types.push(this.addNewTransportType);
    this.tour.transportType = this.addNewTransportType;

    /* put req to ranges */
  }
}
