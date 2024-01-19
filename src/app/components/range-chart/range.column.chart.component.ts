import { Component } from '@angular/core';

@Component({
  selector: 'range-column-chart',
  templateUrl: 'chart.component.html',
})
export class RangeColumnChartComponent {
	chartOptions = {
		theme: "light2",
		title:{
		  text: "Average Temperature Range"
		},
		animationEnabled: true,
		subtitles: [{
		  text: "Los Angeles County, California"
		}],
		axisY: {
		  title: "Temperature (°F)",
		  suffix: "°F"
		},
		data: [{
		  type: "rangeColumn",
		  indexLabel: "{y[#index]}°",
		  toolTipContent: "<b>{label}</b><br>Min: {y[0]} °F <br/> Max: {y[1]} °F",
		  dataPoints: [
			{ label: "Jan", y: [48.5,	68.1] },
			{ label: "Feb", y: [50.3,	69.6] },
			{ label: "Mar", y: [51.6,	69.8] },
			{ label: "Apr", y: [54.4,	73.1] },
			{ label: "May", y: [57.9,	74.5] },
			{ label: "Jun", y: [61.4,	79.5] },
			{ label: "Jul", y: [64.6,	83.8] },
			{ label: "Aug", y: [65.6,	84.8] },
			{ label: "Sept", y: [64.6,	83.3] },
			{ label: "Oct", y: [59.9,	79.0] },
			{ label: "Nov", y: [52.6,	73.2] },
			{ label: "Dec", y: [48.3,	68.7] }
		  ]
		}]
	}		
}
