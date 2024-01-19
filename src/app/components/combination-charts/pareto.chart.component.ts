import { Component } from '@angular/core';

@Component({
  selector: 'pareto-chart',
  templateUrl: 'combination.chart.component.html',
})
export class ParetoChartComponent {
	chart: any;
  
	getChartInstance(chart: object) {
	  this.chart = chart;
	  this.createPareto();
	}
   
	createPareto() {
	  let dps = [];
	  let chart = this.chart;
	  let yValue, yTotal = 0, yPercent = 0;
	  for(let i = 0;  i < chart.data[0].dataPoints.length;  i++)
		yTotal += chart.data[0].dataPoints[i].y;
		for(let i = 0;  i < chart.data[0].dataPoints.length;  i++){
		  yValue = chart.data[0].dataPoints[i].y;
		  yPercent += (yValue / yTotal * 100);
		  dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.addTo("data",{type:"line", yValueFormatString: "0.##\"%\"", dataPoints: dps});
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
		chart.axisY2[0].set("maximum", 100);
		console.log("Created")
	}
   
	chartOptions = {
	  theme: "dark2",
	  title: {
		text: "Refund in Software Sales"
	  },
	  axisX: {
		labelAngle: 0
	  },
	  axisY: {
		title: "Count",
		lineColor: "#6d78ad",
		tickColor: "#6d78ad",
		labelFontColor: "#6d78ad",
		gridThickness: 0,
		lineThickness: 1
	  },
	  axisY2: {
		title: "Cumulative Percent",
		suffix: "%",
		gridThickness: 0,
		lineColor: "#51cda0",
		tickColor: "#51cda0",
		labelFontColor: "#51cda0",
		lineThickness: 1
	  },
	  data: [{
		dataPoints: [
		  { label: "Not Compatible", y: 23 },
		  { label: "Not as expected", y: 15 },
		  { label: "Available at Low Price", y: 11 },
		  { label: "Changed Mind", y: 10 },
		  { label: "Too Complicated", y: 7 },
		  { label: "Poor Manual", y: 5 },
		  { label: "Missing Disk", y: 4 },
		]
	  }]
	}	
}
