import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {ToursService} from '../../../../services/tours.service';
import {RangeService} from '../../../../services/range.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';
import {DateHandlerService} from '../../../../services/date-handler.service';

@Component({
  selector: 'app-editing-page',
  templateUrl: './editing.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {
/*  list = [{title: 'info', checked: false}, {title: 'info', checked: false}];*/
  tours: Tour[] = [];
  allTours: Tour[] = [];
  tour: Tour;
  rangeTransports: any;
  rangeTourTypes: any;
  rangeTransportsTypesLength: number;
  rangeTourTypesLength: any;
  filterForm: FormGroup;
  dateFromFilter: TourDate;
  tourExist = true;
  invalidForm = false;
  newTourImages = [];
  previewImages = [];
  @ViewChild("content", {static: false}) content: ElementRef;

  addRestType;
  addNewRestType;
  addNewTransportType;
  addDateFrom;
  addDateTo;
  isNewTour;
  editForm;

  constructor(private modalService: NgbModal,
              private toursService: ToursService,
              private rangeService: RangeService,
              private dateService: DateHandlerService) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      fromCountry: new FormControl(),
      toCountry: new FormControl(),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      transportType: new FormControl(),
      restType: new FormControl(),
      sortBy: new FormControl()
    });

    this.toursService.getTours().subscribe(tours => {
      this.tours = tours;
      this.tour = tours[0];
    });

    this.rangeService.getRanges().subscribe(ranges => {
      ranges.forEach(range => {
        if (range.category == 'transport') {
          this.rangeTransports = range;
          this.rangeTransportsTypesLength = range.types.length;
        }

        if (range.category == 'rest') {
          this.rangeTourTypes = range;
          this.rangeTourTypesLength = range.types.length;
        }
      });
    });
  }

  openModal(content, tour) {
    this.tour = tour;
    this.isNewTour = false;
    this.invalidForm = false;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});

  }

  onAdd(content) {
    this.invalidForm = false;
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
    cost: 0,
    moreInfo: "",
    dates: [],
    bookedMax: 0,
    booked: 0,
    views: 0
    };

    this.isNewTour = true;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  editTour() {
    this.invalidForm = false;
    if(!this.isNewTour) {
      const newImagesCopy = this.newTourImages.slice();
      this.toursService.updateTour(this.tour).subscribe(tour => {
        this.toursService.uploadImages(newImagesCopy, tour).subscribe(updatedTour => {
          this.tour = updatedTour;
          this.tours.forEach((tour, i) => {
            if (tour._id == updatedTour._id) {
              this.tours[i] = updatedTour;
            }
          })
        });
      });
    } else {
      for(let val in this.tour){
        if (val === 'route') {
          if(!this.tour.route.fromCountry
            || !this.tour.route.fromTown
            || !this.tour.route.toCountry
            || !this.tour.route.toTown) {
            this.invalidForm = true;
          }
        } else if (val === 'dates' && !this.tour.dates.length || val === 'restType' && !this.tour.restType.length) {
          this.invalidForm = true;
        } else if (this.tour[val] === 0 && val != 'views' && val !== 'images' && val !== 'discount' && val !== 'booked') {
          this.invalidForm = true;
        }
      }

      if (!this.invalidForm) {
        const newImagesCopy = this.newTourImages.slice();

        this.toursService.createTour(this.tour).subscribe(createdTour => {
          this.toursService.uploadImages(newImagesCopy, createdTour).subscribe(updatedTour => {
            this.tours.push(updatedTour);
            this.invalidForm = false;
          });
        });
        this.modalService.dismissAll();
      }

      console.log(this.invalidForm)
    }

    if (!this.invalidForm) {
      this.modalService.dismissAll();
    }

    this.previewImages = [];
    this.newTourImages = [];
  }

  Search() {
    let params = '?';
    for (let filter in this.filterForm.value) {
      if (this.filterForm.value[filter]) {
        if (filter === 'dateFrom' || filter === 'dateTo') {
          params += filter + '=' + this.filterForm.value[filter].day + '.' +
            + this.filterForm.value[filter].month + '.' +
            + this.filterForm.value[filter].year + '&';
        } else {
          params += filter + '=' + this.filterForm.value[filter] + '&';
        }

        if (filter == 'dateFrom') {
          this.dateFromFilter = this.filterForm.value[filter];
        }
      }
    }

    params = (params.slice(0, params.length - 1));
    console.log(params);
    this.getToursByParams(params);
  }

  getToursByParams(params) {
    this.toursService.getTours(params).subscribe(tours => {
      // if any tours was founded (if not -> tours = [])
      if (tours.length) {
        // if user has inputed filter dateFrom
        if (this.dateFromFilter) {
          tours = tours.map(tour => {
            tour.dates = this.dateService.sortDatesAfterDateFrom(tour.dates, this.dateFromFilter);
            return tour;
          });
        } else {
          // filter tour.dates(after current date) and sort these dates
          tours = tours.map(tour => {
            tour.dates = this.dateService.sortActualDates(tour.dates);
            return tour;
          });

          //filter tours(delete tour from tours if tour.dates = [] after filter actual dates)
          tours = tours.filter(tour => tour.dates.length);
        }
      }

      this.tours = tours;
    });
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

    this.rangeService.updateRange(this.rangeTourTypes).subscribe(updatedRange => {
      console.log(updatedRange)
    });
  }

  addNewTransport() {
    this.rangeTransports.types.push(this.addNewTransportType);
    this.tour.transportType = this.addNewTransportType;

    this.rangeService.updateRange(this.rangeTransports).subscribe(updatedRange => {
      console.log(updatedRange)
    });
  }

  findTourById(tourId) {
    if (!tourId){
      this.tours = this.allTours;
    } else {
      this.allTours = this.tours;
      this.toursService.getOneTour(tourId).subscribe((tour) => {
        this.tours = [tour];
        this.tourExist = true;
      },(err) => {
        this.tourExist = false;
        console.log('error');
      });
    }
  }

  openDeleteModal(content, tour) {
    this.tour = tour;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  deleteTour() {
    this.tours.splice(this.tours.indexOf(this.tour), 1);

    this.toursService.deleteTourById(this.tour._id).subscribe(result => {
      console.log(result)
    });

    this.modalService.dismissAll();
  }

  onImagesUpload(event) {
    if (event.target.files.length > 0) {
      /*this.newTourImages.push(event.target.files);*/
      for(let file of event.target.files) {
        this.newTourImages.push(file);
      }

      console.log(this.newTourImages)

      for (let i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader();
        reader.onload = this.imageIsLoaded.bind(this);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  imageIsLoaded(e) {
    this.previewImages.push(e.target.result);
  };

  onImageDelete(imageIndex) {
    this.tour.images = this.tour.images.filter((image, i) => i != imageIndex);
  }

  onNewImageDelete(imageIndex) {
    this.newTourImages = this.newTourImages.filter((image, i) => i != imageIndex);
    this.previewImages = this.previewImages.filter((image, i) => i != imageIndex);
  }
}
