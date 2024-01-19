import { Component } from '@angular/core';
 
@Component({
  selector: 'stockchart-numeric-axis',
  templateUrl: './stockchart.component.html',
})
export class StockChartNumericAxisComponent {
  generateRandomData = () => {
    var y  = 1000, dps = [];
    for(var i = 0; i < 1000; i++) {
      y += Math.round(5 + Math.random() *(-5-5));
      dps.push({ y: y});
    }
    return dps;
  }
  stockChartOptions = {
    exportEnabled: true,
    title: {
      text: "Angular StockChart with Numeric Axis"
    },
    charts: [{
      data: [{
        type: "line",
        dataPoints: this.generateRandomData()
      }]
    }],
    rangeSelector: {
      inputFields: {
        startValue: 200,
        endValue: 800
      },
      buttons: [{
        label: "100",
        range: 100,
        rangeType: "number"
      },{
        label: "200",
        range: 200,
        rangeType: "number"
      },{
        label: "500",
        range: 500,
        rangeType: "number"
      },{
        label: "All",        
        rangeType: "all"
      }]
    }
  }
}