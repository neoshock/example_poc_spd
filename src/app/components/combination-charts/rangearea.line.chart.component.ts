import { Component } from '@angular/core';

@Component({
  selector: 'range-area-line-chart',
  templateUrl: 'combination.chart.component.html',
})
export class RangeAreaLineChartComponent {
	chart: any;
  
	getChartInstance(chart: object) {
	  this.chart = chart;
	  this.addAverageSeries();
	}
   
  addAverageSeries() {
	  let dps = [];
	  let chart = this.chart;
	  for(let i = 0; i < chart.options.data[0].dataPoints.length; i++) {
		dps.push({
		  x: chart.options.data[0].dataPoints[i].x,
		  y: (chart.options.data[0].dataPoints[i].y[0] + chart.options.data[0].dataPoints[i].y[1]) / 2
		});
	  }
	  chart.options.data.push({
		type: "line",
		name: "Average",
		showInLegend: true,
		markerType: "triangle",
		markerSize: 0,
		color: "#EF5350",
		yValueFormatString: "##.0 °C",
		toolTipContent: "<span style='\"'color:{color}'\"'>{name}</span>: {y}",
		dataPoints: dps
	  });
	  chart.render();
	}
   
	chartOptions = {
	  theme: "light2",
	  exportEnabled: true,
	  title: {
		text: "Temperature Variation"
	  },
	  subtitles: [{
		text: "Bengaluru (India)"
	  }],
	  axisX: {
		valueFormatString: "MMM"
	  },
	  legend: {
		cursor: "pointer",
		dockInsidePlotArea: true,
		itemclick: function(e:any) {
		  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
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
		type: "rangeArea",
		name: "Temperature Range",
		showInLegend: true,
		color: "#7986CB",
		yValueFormatString: "##.0 °C",
		xValueFormatString: "MMMM YYYY",
		toolTipContent: "{x}<br><span style='\"'color:{color}'\"'>Min</span>: {y[0]}<br><span style='\"'color:{color}'\"'>Max</span>: {y[1]}",
		markerSize: 0,
		dataPoints: [
		  { x: new Date(2019, 0, 1), y: [12.0382, 30.1865] },
		  { x: new Date(2019, 1, 1), y: [16.2404, 34.2949] },
		  { x: new Date(2019, 2, 1), y: [18.2318, 36.0597] },
		  { x: new Date(2019, 3, 1), y: [21.4699, 36.7624] },
		  { x: new Date(2019, 4, 1), y: [21.3156, 35.3482] },
		  { x: new Date(2019, 5, 1), y: [21.087, 33.3196] },
		  { x: new Date(2019, 6, 1), y: [19.8427, 31.6698] },
		  { x: new Date(2019, 7, 1), y: [20.3135, 30.1392] },
		  { x: new Date(2019, 8, 1), y: [20.1342, 30.303] },
		  { x: new Date(2019, 9, 1), y: [18.8909, 30.5804] },
		  { x: new Date(2019, 10, 1), y: [16.4149, 30.3919] },
		  { x: new Date(2019, 11, 1), y: [14.7093, 29.8572] }
		]
	  }]
	}	
}
