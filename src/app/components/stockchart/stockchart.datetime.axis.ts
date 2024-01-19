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
export class StockChartDateTimeAxisComponent {
  dps1: any = [];
  dps2: any = [];
  
  stockChartOptions = {
    exportEnabled: true,
      theme: "light2",
      title: {
        text: "Angular StockChart with Date-Time Axis"
      },
      charts: [{
        axisY: {
          title: "Bitcoin Price",
          prefix: "$",
          tickLength: 0
        },
        data: [{
          type: "candlestick",
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          dataPoints: this.dps1
      }]
    }],
    navigator: {
      data: [{
        dataPoints: this.dps2
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
      this.dps1.push({ x: new Date(this.jsonData[i].date), y: [Number(this.jsonData[i].open), Number(this.jsonData[i].high), Number(this.jsonData[i].low), Number(this.jsonData[i].close)] });
      this.dps2.push({ x: new Date(this.jsonData[i].date), y: Number(this.jsonData[i].close) });
    }
  }
}                              