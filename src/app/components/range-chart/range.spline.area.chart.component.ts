import { Component } from '@angular/core';

@Component({
  selector: 'range-spline-area-chart',
  templateUrl: 'chart.component.html',
})
export class RangeSplineAreaChartComponent {
	chartOptions = {
		exportEnabled: true,
		animationEnabled: true,
		theme: "dark2",
		title:{
		  text: "Monthly Temperature Variation"
		},
		subtitles: [{
		  text: "Bengaluru, India",
		}],
		axisX: {
		  valueFormatString: "MMMM"
		},
		axisY: { 
		  title: "Temperature (°C)",
		  suffix: "°C"
		},
		data: [{
		  type: "rangeSplineArea",
		  xValueFormatString: "MMMM YYYY",
		  yValueFormatString: "##.#°C",
		  toolTipContent: "{x} </br> Min: {y[0]}, Max: {y[1]}",
		  color: "#4DD0E1",
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
