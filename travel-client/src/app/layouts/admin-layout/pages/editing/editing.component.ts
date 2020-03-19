import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Tour} from '../../../../interfaces/tour/tour.interface';
import {ToursService} from '../../../../services/tours.service';
import {RangeService} from '../../../../services/range.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TourDate} from '../../../../interfaces/tour/tourDate.interface';
import {DateHandlerService} from '../../../../services/date-handler.service';
import validate = WebAssembly.validate;
import {LocationService} from '../../../../services/location.service';

@Component({
  selector: 'app-editing-page',
  templateUrl: './editing.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {
  tours: any[] = [];
  rangeTransports: any;
  rangeTourTypes: any;
  ranges_langs: any = {rest: {}, transport: {}};
  locations;
  locationForm = {en: {country: '', town: ''}, ru: {country: '', town: ''}};

  filterForm: FormGroup;
  dateFromFilter: TourDate;
  tourExist = true;

  selectedEditLang = 'en';
  tour_langs: any;

  addDateFrom;
  addDateTo;
  addRestType = { en: '', ru: ''};
  addTransportType = { en: '', ru: ''};
  delRestTypeInRange = { en: '', ru: ''};
  delTransportInRange = { en: '', ru: ''};
  previewImages = [];
  newTourImages = [];

  @ViewChild('editLocationsModal', {static: false}) editLocationsModal: TemplateRef<any>;
  invalidForm = false;
  invalidMessage = "";
  successMessage = "";
  isNewTour;


  deletedTourId;

  constructor(private modalService: NgbModal,
              private toursService: ToursService,
              private rangeService: RangeService,
              private dateService: DateHandlerService,
              private locationService: LocationService) {}

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
      this.modalService.open(this.editLocationsModal, {backdropClass: 'light-blue-backdrop'});
    });

    this.rangeService.getRanges().subscribe(ranges => {
      ranges.forEach(range => {
        if (range.category === 'transport' || range.category === 'транспорт') {
          this.rangeTransports = range;
        }

        if (range.category === 'rest' || range.category === 'отдых') {
          this.rangeTourTypes = range;
        }
      });
    });

    this.rangeService.getAllLangsRanges().subscribe(ranges => {
      ranges.forEach(range => {
        if (range.en.category === 'transport') {
          this.ranges_langs.transport = range;
        }

        if (range.en.category === 'rest') {
          this.ranges_langs.rest = range;
        }
      });
    });

    this.locationService.getAllLangsLocations().subscribe(locations => {
      this.locations = locations;
      console.log(locations)
    });
  }

  editTour() {
    this.isValid();
    if(this.invalidForm) {
      return;
    }
  /*  console.log(this.ranges_langs, this.tour_langs)  */


    this.rangeService.updateRanges(this.ranges_langs).subscribe(rangesLangs => {
      this.ranges_langs = rangesLangs;

      this.rangeService.getRanges().subscribe(ranges => {
        ranges.forEach(range => {
          if (range.category === 'transport' || range.category === 'транспорт') {
            this.rangeTransports = range;
          }

          if (range.category === 'rest' || range.category === 'отдых') {
            this.rangeTourTypes = range;
          }
        });
      });
    });
    if (this.isNewTour) {
      this.toursService.createTour(this.tour_langs).subscribe(newTour => {
        this.toursService.uploadImages(this.newTourImages, newTour).subscribe(t => {
          this.tours = t;
          this.tours.push(newTour);
          this.afterTourUpdate();
        });
      });
    } else {
      this.toursService.updateTour(this.tour_langs).subscribe(tours => {
        this.toursService.uploadImages(this.newTourImages, this.tour_langs).subscribe(t => {
          this.tours = t;
          this.afterTourUpdate();
        });
      });
    }
  }

  afterTourUpdate() {
    this.previewImages = [];
    this.newTourImages = [];
    this.modalService.dismissAll();
  }

  isValid() {
    this.invalidForm = false;
    ["en", "ru"].forEach(lang => {
      if (!this.tour_langs[lang].title
        || !this.tour_langs[lang].transportType
        || !this.tour_langs[lang].moreInfo
        || !this.tour_langs[lang].route.fromCountry
        || !this.tour_langs[lang].route.fromTown
        || !this.tour_langs[lang].route.toCountry
        || !this.tour_langs[lang].route.toTown
        || !this.tour_langs[lang].restType.length
      ) {
        this.invalidForm = true;
        this.invalidMessage = "* Please, fill all fields";
      }
    });

    if (!this.tour_langs.cost
      || !this.tour_langs.dates.length
      || !this.tour_langs.bookedMax
    ) {
      this.invalidForm = true;
      this.invalidMessage = "* Please, fill all fields";
    }

    if (this.tour_langs.en.restType.length != this.tour_langs.ru.restType.length) {
      this.invalidForm = true;
      this.invalidMessage = "* Data in different languages doesn't match";
    }
  }

  openModal(content, tourId) {
    this.isNewTour = false;
    this.invalidForm = false;
    this.toursService.getAllLangsTourById(tourId).subscribe((tour) => {
      this.tour_langs = tour;
      this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    });
  }

  addNewLocation() {
    let countryExist = false;
    this.invalidForm = false;
    this.successMessage = "";

    if(!this.locationForm.en.country || !this.locationForm.en.town
      || !this.locationForm.ru.country || !this.locationForm.ru.town) {
      this.invalidForm = true;
      this.invalidMessage = 'You must fill all fields';
      return;
    }

    this.locations.forEach((location, index) => {
      const countryEn = this.locationForm.en.country;
      const townEn = this.locationForm.en.town;
      if (location.en.country === countryEn) {
        if (location.en.towns.indexOf(townEn) == -1) {
          this.locations[index].en.towns.push(townEn);
          this.locations[index].ru.towns.push(this.locationForm.ru.town);
          console.log(this.locations[index])
          this.locationService.updateLocationById(this.locations[index]).subscribe(updatedLocation => {
            this.successMessage = "Town added to DB";
          })
        } else {
          this.invalidMessage = "This country and town already exist";
          this.invalidForm = true;
        }
/*        this.locations[index].en.towns.push(townEn);
        this.locations[index].ru.towns.push(this.locationForm.ru.town);*/
/*        console.log(this.locations)*/
        countryExist = true;
        return;
      }
    });

    if (!countryExist) {
      this.locationService.createLocation(this.locationForm).subscribe(newLocation => {
        this.locations.push(newLocation);
        this.successMessage = "Country&Town added to DB";
      })
    }
  }

  deleteLocation() {
    this.successMessage = "";
    this.invalidForm = false;
    let locationId = '';

    if (!this.locationForm.en.country) {
      this.invalidForm = true;
      this.invalidMessage = "Fill country field";
      return;
    }

    this.locations.forEach((location, index) => {
      if (location.en.country === this.locationForm.en.country) {
        locationId = location._id;
        this.locations.splice(index, 1);
        this.successMessage = "Successfuly deleted";
      }
    });

    if (locationId) {
      this.locationService.deleteLocationById(locationId).subscribe(message => {
      });
    }
  }

  openEditLocationsModal(content) {
    this.successMessage = "";
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  addNewTourDate() {
    this.tour_langs.dates.push({dateFrom: this.addDateFrom, dateTo: this.addDateTo});
  }

  deleteDateInTour(dateIndex) {
    this.tour_langs.dates.splice(dateIndex, 1);
  }

  AddNewRestType(newTypeInput: HTMLInputElement, lang: string) {
     this.tour_langs[lang].restType.push(newTypeInput.value);
     this.ranges_langs.rest[lang].types.push(newTypeInput.value);
  }

  addRestTourType(lang) {
      this.tour_langs[lang].restType.push(this.addRestType[lang]);
  }

  deleteRestTourType(index, lang) {
    this.tour_langs[lang].restType.splice(index, 1);
  }

  deleteRestTypeFromRanges(lang) {
    this.ranges_langs.rest[lang].types.splice(this.ranges_langs.rest[lang].types.indexOf(this.delRestTypeInRange[lang]), 1);

    if(this.tour_langs[lang].restType.indexOf(this.delRestTypeInRange[lang]) !== -1) {
      this.tour_langs[lang].restType.splice(this.tour_langs[lang].restType.indexOf(this.delRestTypeInRange[lang]), 1);
    }

    this.delRestTypeInRange[lang] = '';
  }

  addNewTransport(lang: string) {
    this.ranges_langs.transport[lang].types.push(this.addTransportType[lang]);
    this.tour_langs[lang].transportType = this.addTransportType[lang];
  }

  deleteTransportFromRanges(lang) {
    this.ranges_langs.transport[lang].types.splice(this.ranges_langs.transport[lang].types.indexOf(this.delTransportInRange[lang]), 1);

    if(this.tour_langs[lang].transportType === this.delTransportInRange[lang]) {
      this.tour_langs[lang].transportType = '';
    }

    this.delTransportInRange[lang] = '';
  }
  onImagesUpload(event) {
    if (event.target.files.length > 0) {
      /*this.newTourImages.push(event.target.files);*/
      for(let file of event.target.files) {
        this.newTourImages.push(file);
      }

      console.log(this.newTourImages);

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
    this.tour_langs.images.splice(imageIndex, 1);
  }

  onNewImageDelete(imageIndex) {
    this.newTourImages.splice(imageIndex, 1);
    this.previewImages.splice(imageIndex, 1);
    console.log(this.newTourImages, this.previewImages)
  }

  openDeleteModal(content, tourId) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    this.deletedTourId = tourId;
  }

  deleteTour() {
    this.toursService.deleteTourById(this.deletedTourId).subscribe(toursAfterDel => {
      this.tours = toursAfterDel;
    });

    this.modalService.dismissAll();
  }

  onAdd(content) {
    this.isNewTour = true;
    this.invalidForm = false;

    this.tour_langs = {
      ru: {
        title: "",
        route: {
          fromCountry: "",
          fromTown: "",
          toCountry: "",
          toTown: ""
        },
        restType: [],
        transportType: "",
        moreInfo: ""
      },
      en: {
        title: "",
        route: {
          fromCountry: "",
          fromTown: "",
          toCountry: "",
          toTown: ""
        },
        restType: [],
        transportType: "",
        moreInfo: ""
      },
      images: [],
      discount: null,
      cost: 0,
      dates: [],
      bookedMax: 0,
      booked: 0,
      views: 0
    };

    this.isNewTour = true;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
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

      console.log(this.tours)
      this.tours = tours;
    });
  }

  findTourById(tourId) {
    if (!tourId){
      this.tourExist = true;
      this.toursService.getTours().subscribe(tours => {
        this.tours = tours;
      });
    } else {
      this.toursService.getOneTour(tourId).subscribe((tour) => {
        this.tours = [tour];
        this.tourExist = true;
      },(err) => {
        this.tours = [];
        this.tourExist = false;
        console.log('error');
      });
    }
  }
}
