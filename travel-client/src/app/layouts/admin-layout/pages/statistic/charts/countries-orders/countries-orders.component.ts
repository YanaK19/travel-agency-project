import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-countries-orders',
  templateUrl: './countries-orders.component.html',
  styleUrls: ['./countries-orders.component.scss']
})
export class CountriesOrdersComponent implements OnInit {
  chart = [];
  @Input() countriesOrders: any[];
  chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };

  constructor() { }

  ngOnInit() {
    const labels = this.countriesOrders.map(item => item.country);
    const orders = this.countriesOrders.map(item => item.orders);

    this.chart = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: orders,
          label: 'dataset1',
          fontColor: '#fff',
          borderWidth: 1,
          backgroundColor: [
            this.chartColors.red,
            this.chartColors.orange,
            this.chartColors.yellow,
            this.chartColors.green,
            this.chartColors.blue,
            this.chartColors.purple
          ],
          hoverBackgroundColor: "hsla(235, 12%, 27%, 0.5)",
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Last Month',
          fontSize: 17,
          fontColor: 'rgba(255,255,255,0.9)',
          fontFamily: "'Exo', 'sans-serif'",
          titleMarginBottom: 20
        },
        legend: {
          position: "bottom",
          labels: { fontColor: '#fff', fontSize: 15}
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    })
  }
}
