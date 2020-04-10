import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as xlsx from 'xlsx';
import {ExportExcelService} from '../../../../features/export-excel.service';
import {OrderService} from '../../../../services/order.service';
import {UserService} from '../../../../services/user.service';
import {ToursService} from '../../../../services/tours.service';
import {StatisticService} from '../../../../services/statistic.service';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  orders:any = [];
  tasks = [{_id: '1', todo: 'design new project', done: false},
    {_id: '2', todo: 'design new project', done: true},
    {_id: '3', todo: 'desigsdfd sfdsfssss ssssssssss sssssssssssssssss sss sssssssssss ssssssn new project', done: false}];
  countriesOrders: any[] = [];

  incomeMonthly: any[] = [];

  calcItems: any[] = ['c', '/', '*', 7, 8, 9, '-', 4, 5, 6, '+', 1,2, 3, 'x', 0, '.', '='];
  expression = '';
  ordersLastMonth = [];
  totalIncomeLastMonth;

  constructor(private excelService: ExportExcelService,
              private orderService: OrderService,
              private userService: UserService,
              private toursService: ToursService,
              private statisticService: StatisticService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      orders.forEach(order => {
        this.orderService.getFullOrderInfo(order._id).subscribe(order => {
          this.orders.push(order)
        });
      });
    });

    this.statisticService.getIncomeByMonth().subscribe(res => {
      this.incomeMonthly = res;
    });

    this.statisticService.getPopularDestnationsMonth().subscribe(res => {
      this.countriesOrders = res;
    });

    this.statisticService.getOrdersLastMonth().subscribe(res => {
      this.ordersLastMonth = res.orders;
      this.totalIncomeLastMonth = res.total;
    });
  }

  onExportExcel() {
    let table = [];

    this.ordersLastMonth.forEach(order => {
      table.push({
        'Day': order.day,
        'Tour': order.tour,
        'User': order.user,
        'Cost': order.cost
      });
    });

    table.push({'Total Income': this.totalIncomeLastMonth});
    this.excelService.exportToExcel(table, "Last-Month Orders");
  }

  taskCheck(taskId) {

  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task._id !== taskId)
  }

  deleteTasks() {
    this.tasks = this.tasks.filter(task => !task.done)
  }

  addTask(task) {
    this.tasks.push({_id: 'qeqweq123', todo: task, done: false});
  }

  calc(item) {
    switch(item) {
      case 'c': this.expression = ''; break;
      case 'x': this.expression = this.expression.slice(0, -1); break;
      case '=':
        try {
          this.expression = eval(this.expression);
        } catch (e) {
          this.expression = 'error';
        }
        break;
      default:  this.expression += item;
    }
  }
}
