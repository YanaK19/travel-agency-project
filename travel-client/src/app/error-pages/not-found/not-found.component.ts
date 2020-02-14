import { Component, OnInit } from '@angular/core';
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  private errorMessage: string = "";

  constructor(private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

  }

}
