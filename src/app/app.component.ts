import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarController, Colors, Legend } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective, CommonModule, FormsModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'Asteroid';
  barChartOptions = [];
  showGraph = false;
  chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Asteroid',
        data: [10, 20, 15, 30, 25],
        borderColor: '#3e95cd',
        fill: false,
      },
    ],
  };
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'No of Astoid',
        },
      },
    },
  };
startDate = '2015-09-07';
endDate = '2015-09-08';
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.fetchData()
  }
  fetchData(){
    this.api.getApi(this.startDate, this.endDate).subscribe((resp: any) => {
      console.log('resp', resp);
      const dates: any[] = [];
      const values: any[] = [];
      Object.keys(resp.near_earth_objects).forEach(item => {
        console.log(item);
        dates.push(item);
        values.push(resp.near_earth_objects[item].length);
      });
      this.chartData.labels = dates;
      this.chartData.datasets[0].data = values;
      this.cdr.detectChanges(); 
      this.chartData = {...this.chartData};
      console.log(this.chartData.labels, this.chartData.datasets);
    });
    this.showGraph = true;
  }
}

