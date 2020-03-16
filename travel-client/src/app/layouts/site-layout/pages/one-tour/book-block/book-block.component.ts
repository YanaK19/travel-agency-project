import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Tour} from '../../../../../interfaces/tour/tour.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'book-block',
  templateUrl: './book-block.component.html',
  styleUrls: ['./book-block.component.scss']
})
export class BookBlockComponent implements OnInit {
  bookForm: FormGroup;
  order;

  @Input() tour: Tour;
  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
          name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
          email: new FormControl(null, [Validators.required,  Validators.email]),
          amount: new FormControl(null, [Validators.required]),
          dates: new FormControl()
        });
  }

  onBook() {

  }
}
