import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Categories} from "../../../core/constants/constants";

@Component({
  selector: "app-pie-chart",
  template: `
    <div [merge]="updateOptions" [options]="options" echarts></div>
  `,
})
export class PieChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() dataset: any = [];

  options: any = {};
  updateOptions: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initOptions();
  }

  ngOnChanges() {
    this.updateOptions = {
      series: [{
        data: this.dataset
      }]
    };
  }

  initOptions() {
    this.options = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: Categories.EXPENSE
      },
      series: [
        {
          name: "Expenses",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: this.dataset
        }
      ]
    };
  }
}
