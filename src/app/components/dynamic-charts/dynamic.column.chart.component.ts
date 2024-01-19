import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dynamic-column-chart',
  templateUrl: 'chart.component.html',
})
export class DynamicColumnChartComponent implements OnDestroy{
	timeout:any = null;
	chart: any;
   
	chartOptions = {
	  title: {
		text: "Temperature of Each Boiler",
		fontFamily: "Trebuchet MS, Helvetica, sans-serif"
	  },
	  axisY: {
		title: "Temperature (°C)",
		includeZero: true,
		suffix: " °C"
	  },
	  data: [{
		type: "column",	
		yValueFormatString: "#,### °C",
		indexLabel: "{y}",
		dataPoints: [
		  { label: "boiler1", y: 206 },
		  { label: "boiler2", y: 163 },
		  { label: "boiler3", y: 154 },
		  { label: "boiler4", y: 176 },
		  { label: "boiler5", y: 184 },
		  { label: "boiler6", y: 122 }
		]
	  }]
	}
   
	getChartInstance(chart: object) {
	  this.chart = chart;
	  this.updateChart();
	}
   
	ngOnDestroy() {
	  clearTimeout(this.timeout);
	}
   
	updateChart = () => {
	  let boilerColor, deltaY, yVal;
	  let dps = this.chart.options.data[0].dataPoints;
	  for (let i = 0; i < dps.length; i++) {
		deltaY = Math.round(2 + Math.random() *(-2-2));
		yVal = deltaY + dps[i].y > 0 ? dps[i].y + deltaY : 0;
		boilerColor = yVal > 200 ? "#C62828" : yVal >= 170 ? "#FF6F00" : yVal < 170 ? "#1B5E20 " : null;
		dps[i] = {label: "Boiler "+(i+1) , y: yVal, color: boilerColor};
	  }
	  this.chart.options.data[0].dataPoints = dps; 
	  this.chart.render();
	  this.timeout = setTimeout(this.updateChart, 1000);
	};		
}
