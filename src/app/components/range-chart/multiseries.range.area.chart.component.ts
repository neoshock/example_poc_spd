import { Component } from '@angular/core';

@Component({
  selector: 'multiseries-range-area-chart',
  templateUrl: 'chart.component.html',
})
export class MultiSeriesRangeAreaChartComponent {
	chartOptions = {
		exportEnabled: true,
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Temperature Variation"
		},
		subtitles:[{
		  text: "Gurugram vs Shimla"
		}],
		axisX: {
		  valueFormatString: "MMMM"
		},
		axisY: {
		  suffix: " °C"
		},     
		toolTip: {
		  shared: true
		},
		legend: {
		  cursor: "pointer",
		  horizontalAlign: "right",
			verticalAlign: "top"
		},
		data: [{
		  type: "rangeArea",
		  showInLegend: true,
		  name: "Gurugram",
		  markerSize: 0,
		  xValueFormatString: "MMM YYYY",
		  yValueFormatString: "#0.## °C",
		  color: "#FF9800",
		  dataPoints: [
			{ x: new Date(2020, 0, 1), y: [2.389, 23.5] },
			{ x: new Date(2020, 1, 1), y: [5.278, 28] },
			{ x: new Date(2020, 2, 1), y: [10, 33.3] },
			{ x: new Date(2020, 3, 1), y: [13.5, 41.222] },
			{ x: new Date(2020, 4, 1), y: [19.5, 47.611] },
			{ x: new Date(2020, 5, 1), y: [19.778, 44.222] },
			{ x: new Date(2020, 6, 1), y: [20.778, 43.222] },
			{ x: new Date(2020, 7, 1), y: [24, 37.611] },
			{ x: new Date(2020, 8, 1), y: [21.778, 38] },
			{ x: new Date(2020, 9, 1), y: [12.5, 37] },
			{ x: new Date(2020, 10, 1), y: [6.278, 31.611] },
			{ x: new Date(2020, 11, 1), y: [3.278, 29] }
		  ]
		},
		{
		  type: "rangeArea",
		  showInLegend: true,
		  name: "Shimla",
		  markerSize: 0,
		  yValueFormatString: "#0.## °C",
		  color: "#BA68C8",
		  dataPoints: [
			{ x: new Date(2020, 0, 1), y: [-1.3, 22] },
			{ x: new Date(2020, 1, 1), y: [-2, 26.4] },
			{ x: new Date(2020, 2, 1), y: [0.6, 29.4] },
			{ x: new Date(2020, 3, 1), y: [6.6, 37.9] },
			{ x: new Date(2020, 4, 1), y: [8.278, 43.111] },
			{ x: new Date(2020, 5, 1), y: [10.389, 40.4] },
			{ x: new Date(2020, 6, 1), y: [13, 39.111] },
			{ x: new Date(2020, 7, 1), y: [15.6, 39.778] },
			{ x: new Date(2020, 8, 1), y: [14.6, 36.611] },
			{ x: new Date(2020, 9, 1), y: [9.6, 35.3] },
			{ x: new Date(2020, 10, 1), y: [2.778, 31.111] },
			{ x: new Date(2020, 11, 1), y: [-1.111, 28.111] }
		  ]
		}]
	}		
}
