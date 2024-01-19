import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ohlc-trend-chart',
  templateUrl: 'ohlc.combo.chart.component.html',
})
export class OHLCTrendChartComponent implements OnInit {
	constructor(private http : HttpClient) {  
	}
	chart: any;
	dps1: any[] = [];
	loading:boolean = true;
	
	ngOnInit() {
	  // perform http request to get the json for dataPoints
	  this.http.get('https://canvasjs.com/data/docs/btcusd2018.json', { responseType: 'json' }).subscribe((response: any) => {
		let data = response;
		for(let i = 0; i < data.length; i++){
		  this.dps1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});
		}
		this.loading = false;
	  });
	
	}
   
	chartOptions = {
	  theme: "light2",
	  zoomEnabled: true,
	  title:{
		text:"Bitcoin Price"
	  },
	  axisY: {
		title: "Price in USD",
		prefix: "$"
	  },
	  axisX: {
		valueFormatString: "MMM",
	  },
	  legend: {
		verticalAlign: "bottom",
		cursor: "pointer",
		itemclick: function (e:any) {
		  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		  } else {
			e.dataSeries.visible = true;
		  }
		  e.chart.render();
		}
	  },
	  toolTip: {
		shared: true
	  },
	  data: [{
		type: "ohlc",
		showInLegend: true,
		name: "Bitcoin Price",
		yValueFormatString: "$#,###.00",
		xValueType: "dateTime",
		dataPoints: this.dps1
	  }]
	}
   
	getChartInstance(chart: object) {
		this.chart = chart;
	  	this.calculateTrendLine(this.chart);
	}
   
	/*
	  References:
		https://math.stackexchange.com/a/204021
		https://classroom.synonym.com/calculate-trendline-2709.html
	*/
	calculateTrendLine(chart: any){
	  let a, b, c, d, e, slope, yIntercept;
	  let xSum = 0, ySum = 0, xySum = 0, xSquare = 0, dpsLength = chart.data[0].dataPoints.length;
	  for(let i = 0; i < dpsLength; i++) 	
		xySum += (chart.data[0].dataPoints[i].x.getTime() * chart.data[0].dataPoints[i].y[3])
	  a = xySum * dpsLength;
   
	  for(let i = 0; i < dpsLength; i++){  	
		xSum += chart.data[0].dataPoints[i].x.getTime();
		ySum += chart.data[0].dataPoints[i].y[3];
	  }
	  b = xSum * ySum;
   
	  for(let i = 0; i < dpsLength; i++)  	
		xSquare += Math.pow(chart.data[0].dataPoints[i].x.getTime(), 2);    
	  c = dpsLength * xSquare;
   
	  d = Math.pow(xSum, 2);
	  slope = (a-b)/(c-d);  
	  e = slope * xSum;
	  yIntercept = (ySum - e) / dpsLength;
   
	  let startPoint = this.getTrendLinePoint(chart.data[0].dataPoints[0].x, slope, yIntercept);
	  let endPoint = this.getTrendLinePoint(chart.data[0].dataPoints[dpsLength-1].x, slope, yIntercept);
   
	  chart.addTo("data",{
		type: "line", //Line series showing trend
		markerSize: 0,
		name: "Trend",
		showInLegend: true,
		color: "#E64A19",
		yValueFormatString: "$#,###.00",
		dataPoints: [startPoint, endPoint]
	  });
	}
   
	getTrendLinePoint(x: any, slope: any, intercept: any){
	  return {x: x, y: ((slope * x) + intercept)};
	}		
}
