import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as xlsx from 'xlsx';
import {ExportExcelService} from '../../../../features/export-excel.service';
import {OrderService} from '../../../../services/order.service';
import {UserService} from '../../../../services/user.service';
import {ToursService} from '../../../../services/tours.service';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  customers = [];
  orders:any = [];

  constructor(private excelService: ExportExcelService,
              private orderService: OrderService,
              private userService: UserService,
              private toursService: ToursService) { }

  ngOnInit() {
    for (let i = 0; i <= 25; i++) {
      this.customers.push({firstName: `first${i}`, lastName: `last${i}`,
        email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`});
    }

    this.orderService.getOrders().subscribe(orders => {
      orders.forEach(order => {
        this.orderService.getFullOrderInfo(order._id).subscribe(order => {
          this.orders.push(order)
        });
      });
    })
  }

  onExportExcel() {
    let table = [];
    let income = 0;

    this.orders.forEach(order => {
      table.push({'TourTitle': order.tour.en.title, 'UserName': order.user.name, 'Cost': order.tour.cost});

      income += order.tour.cost;
    });

    table.push({Cost: income});

    this.excelService.exportToExcel(table, "Orders");
  }
}

