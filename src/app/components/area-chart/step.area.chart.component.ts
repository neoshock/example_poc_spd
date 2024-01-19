import { Component } from '@angular/core';

@Component({
  selector: 'area-chart',
  templateUrl: 'chart.component.html',
})
export class StepAreaChartComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Avalanche Events Occurance"
		},
		subtitles: [{
		  text: "U.S.A"
		}],
		axisY: {
		  title: "Event Count",
		  includeZero: true,
		},
		data: [{
		  type: "stepArea",
		  color: "#64B5F6",
		  lineColor: "#0D47A1",
		  markerColor: "#0D47A1",
		  markerSize: 5,
		  dataPoints: [
			{ label: "2003", y: 11 },
			{ label: "2004", y: 24 },
			{ label: "2006", y: 46 },
			{ label: "2007", y: 25 },
			{ label: "2008", y: 43 },
			{ label: "2009", y: 12 },
		  ]
		}]
	}		
}
