import { Component, OnInit } from '@angular/core';
import * as ethUSDData from "../../../assets/ethusdjan2021.json";

@Component({
  selector: 'ohlc-chart',
  templateUrl: 'chart.component.html',
})
export class OHLCChartJSONComponent implements OnInit{
	dps: any[] = [];
 
	ngOnInit() {
	  let data = ethUSDData;
	  for(let i = 0; i < data.length; i++){
		this.dps.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
	  }
	}
   
	chartOptions = {
	  title: {
		text: "Ethereum Price"
	  },
	  axisY: {
		title: "Price in USD",
		prefix: "$"
	  },
	  axisX: {
		valueFormatString: "MMM D",
	  },
	  data: [{
		type: "ohlc",
		yValueFormatString: "$#,###.00",
		xValueType: "dateTime",
		dataPoints: this.dps
	  }]
	}		
}
