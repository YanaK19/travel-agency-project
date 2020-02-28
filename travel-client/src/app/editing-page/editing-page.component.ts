import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Tour} from "../interfaces/tour.interface";

@Component({
  selector: 'app-editing-page',
  templateUrl: './editing-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editing-page.component.scss']
})
export class EditingPageComponent implements OnInit {
list = [{title: 'info', checked: false}, {title: 'info', checked: false}];
  tour: Tour;


  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  openModal(content) {
    this.tour =
      {
        "title": "Trip to Russia",
        "restType": ["shop", "festivals"],
        "transportType": "train",
        "cost": 550,
        "route": {
          "fromCountry": "Russia",
          "fromTown": "Moskov",
          "toCountry": "Japan",
          "toTown": "Tokyo"
        },
        "moreInfo": "Have fun on the biggest festival",
        "images": ["img", "urls"],
        "dates": [{
          "dateFrom": {"day": 10, "month": 8, "year": 2020},
          "dateTo": {"day": 15, "month": 8, "year": 2020}
        },
          {
            "dateFrom": {"day": 22, "month": 12, "year": 2021},
            "dateTo": {"day": 27, "month": 12, "year": 2021}
          }

        ],
        "discount": 5,
        "bookedMax": 100,
        "booked": 80,
        "views": 5000500
      };
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  onAdd(content){
    this.tour =
      {
        "title": "",
        "restType": [],
        "transportType": "",
        "cost": 0,
        "route": {
          "fromCountry": "",
          "fromTown": "",
          "toCountry": "",
          "toTown": ""
        },
        "moreInfo": "",
        "images": [],
        "dates": [{
          "dateFrom": {"day": 11, "month": 11, "year": 1111},
          "dateTo": {"day": 11, "month": 11, "year": 1111}
        },
          {
            "dateFrom": {"day": 11, "month": 11, "year": 1111},
            "dateTo": {"day": 11, "month": 11, "year": 1111}
          }

        ],
        "discount": 0,
        "bookedMax": 0,
        "booked": 0,
        "views": 0
      };
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  onConfirm(){}

}
