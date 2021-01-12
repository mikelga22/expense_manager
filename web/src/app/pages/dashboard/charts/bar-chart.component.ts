import {AfterViewInit, Component, Input, OnChanges, OnInit} from "@angular/core";

@Component({
  selector: "app-bar-chart",
  template: `
    <div [merge]="updateOptions" [options]="options" echarts></div>
  `,
})
export class BarChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() dataset: any = [];

  options: any = {};
  updateOptions: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initOptions();
  }

  ngOnChanges() {
    this.updateOptions = {
      dataset: {
        source: this.dataset
      }
    };
  }

  initOptions() {
    this.options = {
      legend: {},
      tooltip: {},
      dataset: {
        source: this.dataset
      },
      grid: {
        height: "50%",
        top: 20
      },
      xAxis: {type: "category"},
      yAxis: {},
      series: [
        {
          type: "bar",
          encode: {
            x: "month",
            y: "amount"
          }
        }
      ]
    };
  }
}
