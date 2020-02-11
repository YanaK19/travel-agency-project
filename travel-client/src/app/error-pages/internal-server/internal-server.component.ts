import { Component, OnInit } from '@angular/core';
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.scss']
})
export class InternalServerComponent implements OnInit {
  public errorMessage: string = "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";

  constructor(private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.errorMessage = this.errorHandler.errorMessage;
  }

}
