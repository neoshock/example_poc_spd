import { Component } from '@angular/core';
import * as data from '../../../assets/btcusd2018.json';
 
/* Tutorial: https://www.javatpoint.com/display-data-from-json-file-in-angular */
interface JsonData {
  "date": string,
  "open": number,
  "high": number,
  "low": number,
  "close": number,
  "volume_btc": number
}
 
@Component({
  selector: 'stockchart-datetime-axis',
  templateUrl: './stockchart.component.html',
})
export class StockChartRangeSelectorNavigatorComponent {
  dps1: any = [];
  dps2: any = [];
  dps3: any = [];
  
  stockChartOptions = {
    theme: "light2",
    exportEnabled: true,
    title:{
      text:"Bitcoin Price & Volume"
    },
    charts: [{
      toolTip: {
        shared: true
      },
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function() {
          return "";
        }
      },
      axisY: {
        prefix: "$"
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        showInLegend: true,
        name: "Stock Price (in USD)",
        yValueFormatString: "$#,###.##",
        type: "candlestick",
        dataPoints : this.dps1
      }]
    },{
      height: 100,
      toolTip: {
        shared: true
      },
      axisY: {
        prefix: "$",
        labelFormatter: function(e: any){
          var suffixes = ["", "K", "M", "B"];
          var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
          if(order > suffixes.length - 1)
            order = suffixes.length - 1;
          var suffix = suffixes[order];
          return (e.value / Math.pow(1000, order)) + suffix;
        }
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        showInLegend: true,
        name: "Volume (BTC/USD)",
        yValueFormatString: "$#,###.##",
        dataPoints : this.dps2
      }]
    }],
    navigator: {
      data: [{
        dataPoints: this.dps3
      }],
      slider: {
        minimum: new Date(2018, 2, 1),
        maximum: new Date(2018, 9, 31)
      }
    }
    }
    
  jsonData: JsonData[] = (data as any).default;
 
  ngOnInit(){
    for(var i = 0; i < this.jsonData.length; i++) {
      this.dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
      this.dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
      this.dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
    }
  }	
}