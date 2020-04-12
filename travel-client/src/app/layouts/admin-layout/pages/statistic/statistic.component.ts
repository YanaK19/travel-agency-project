import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as xlsx from 'xlsx';
import {ExportExcelService} from '../../../../features/export-excel.service';
import {OrderService} from '../../../../services/order.service';
import {UserService} from '../../../../services/user.service';
import {ToursService} from '../../../../services/tours.service';
import {StatisticService} from '../../../../services/statistic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  orders:any = [];
  countriesOrders: any[] = [];
  generalStatistic;
  incomeMonthly: any[] = [];

  calcItems: any[] = ['c', '/', '*', 7, 8, 9, '-', 4, 5, 6, '+', 1,2, 3, 'x', 0, '.', '='];
  expression = '';
  ordersLastMonth = [];
  totalIncomeLastMonth;
  mostActiveUsers = [];

  todoList: any = [];

  constructor(private excelService: ExportExcelService,
              private orderService: OrderService,
              private userService: UserService,
              private toursService: ToursService,
              private statisticService: StatisticService,
              private router: Router) { }

  ngOnInit() {
/*    this.orderService.getOrders().subscribe(orders => {
      orders.forEach(order => {
        this.orderService.getFullOrderInfo(order._id).subscribe(order => {
          this.orders.push(order)
        });
      });
    });*/

    this.statisticService.getMostActiveUsers().subscribe(users => {
      this.mostActiveUsers = users;
    });

    this.statisticService.getGeneralStatistic().subscribe(generalStatistic => {
      this.generalStatistic = generalStatistic;
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

    this.statisticService.getTodoList().subscribe(list => {
      this.todoList = list;
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

  taskCheck(todo) {
    todo.done = !todo.done;
    this.statisticService.updateTask(todo).subscribe(() => {});
  }

  deleteTask(todoId) {
    this.todoList = this.todoList.filter(todo => todo._id !== todoId);
    this.statisticService.deleteTask(todoId).subscribe(() => {});
  }

  deleteTasks() {
    let deleteTasks = this.todoList.filter(todo => todo.done);
    this.todoList = this.todoList.filter(todo => !todo.done);

    deleteTasks.forEach(todo => this.statisticService.deleteTask(todo._id).subscribe(() => {}));
  }

  addTask(task) {
    this.statisticService.createTask(task).subscribe(todo => {
      this.todoList.push(todo);
    });
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

  renderProfilePage(userId) {
    this.router.navigate(['/account', userId]);
  }
}
