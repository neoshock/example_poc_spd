import { Component } from '@angular/core';

@Component({
  selector: 'range-area-chart',
  templateUrl: 'chart.component.html',
})
export class RangeAreaChartComponent {
	chartOptions = {
		animationEnabled: true,
		exportEnabled: true,
		title:{
		  text: "Average High/Low Temperature in Toronto",
		},
		axisX: {
		  valueFormatString: "MMM"
		},
		axisY: {
		  title: "Temperature",
		  valueFormatString: "#0.##°F"
		},
		data: [{
			type: "rangeArea",
			xValueFormatString: "MMM",
			yValueFormatString: "#0.##°F",
			dataPoints: [   
			  { x: new Date(2021, 0, 1), y: [20, 31] },
			  { x: new Date(2021, 1, 1), y: [22, 33] },
			  { x: new Date(2021, 2, 1), y: [29, 40] },
			  { x: new Date(2021, 3, 1), y: [39, 53] },
			  { x: new Date(2021, 4, 1), y: [50, 65] },
			  { x: new Date(2021, 5, 1), y: [59, 75] },
			  { x: new Date(2021, 6, 1), y: [64, 80] },
			  { x: new Date(2021, 7, 1), y: [63, 78] },
			  { x: new Date(2021, 8, 1), y: [56, 70] },
			  { x: new Date(2021, 9, 1), y: [45, 57] },
			  { x: new Date(2021, 10, 1), y: [36, 46] },
			  { x: new Date(2021, 11, 1), y: [26, 36] },
			]
		}]
	}		
}
