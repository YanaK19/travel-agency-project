import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js'
import {StatisticService} from '../../../../../../services/statistic.service';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss']
})
export class MonthlyIncomeComponent implements OnInit {
chart = [];
@Input() incomeMonthly: any[];
chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};

  constructor(private statisticService: StatisticService) { }

  ngOnInit() {
    const labels = this.incomeMonthly.map(item => item.month);
    const income = this.incomeMonthly.map(item => item.income);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'income',
          backgroundColor: this.chartColors.blue,
          borderColor: '#fff',
          fill: false,
          data: income,
          pointRadius: 7,
          pointHoverRadius: 5,
        }]
      },
      options: {
        responsive: true,
        elements: {point: {pointStyle: 'rectRot'}},
        title: {
          display: true,
          text: 'Income By Months',
          fontSize: 20,
          fontColor: '#fff',
          fontFamily: "'Exo', 'sans-serif'",
          titleMarginBottom: 10
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fontColor: '#fff',
              fontSize: 15
            },
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,0.26)',
              lineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: false,
              fontColor: '#fff',
              fontSize: 15
            },
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,0.33)',
              lineWidth: 1
            }
          }]
        }
      }
    })
  }
}
