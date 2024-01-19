import { Component } from '@angular/core';

@Component({
  selector: 'multiseries-range-spline-area-chart',
  templateUrl: 'chart.component.html',
})
export class MultiSeriesRangeSplineAreaChartComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Monthly Average High/Low Temperature"
		},
		subtitles: [{
		  text: "🇫🇷 v/s 🇦🇪",
		  fontSize: 20
		}],
		axisY: {
		  valueFormatString: "#,##0°C"
		},
		toolTip: {
		  shared: true
		},
		legend: {
		  verticalAlign: "top",
		  horizontalAlign: "right",
		  dockInsidePlotArea: true
		},
		data: [{
		  type: "rangeSplineArea",
		  name: "Paris",
		  showInLegend: true,
		  toolTipContent: "{label}<br/> <span style='\"'color: {color};font-weight: bold;'\"'>🇫🇷 {name}</span>, {y[0]}°C - {y[1]}°C",
		  dataPoints: [
			{ label: "Jan", y: [2, 7] },
			{ label: "Feb", y: [2, 8] },
			{ label: "Mar", y: [5, 12] },
			{ label: "Apr", y: [7, 16] },
			{ label: "May", y: [10, 19] },
			{ label: "Jun", y: [13, 23] },
			{ label: "Jul", y: [15, 25] },
			{ label: "Aug", y: [15, 25] },
			{ label: "Sep", y: [12, 21] },
			{ label: "Oct", y: [9, 16] },
			{ label: "Nov", y: [5, 11] },
			{ label: "Dec", y: [3, 8] }
		  ]
		}, {
		  type: "rangeSplineArea",
		  name: "Dubai",
		  showInLegend: true,
		  toolTipContent: "<span style='\"'color: {color};font-weight: bold;'\"'>🇦🇪 {name}</span>, {y[0]}°C - {y[1]}°C",
		  dataPoints: [
			{ label: "Jan", y: [14, 24] },
			{ label: "Feb", y: [16, 25] },
			{ label: "Mar", y: [18, 29] },
			{ label: "Apr", y: [21, 33] },
			{ label: "May", y: [25, 38] },
			{ label: "Jun", y: [28, 40] },
			{ label: "Jul", y: [30, 41] },
			{ label: "Aug", y: [31, 41] },
			{ label: "Sep", y: [28, 39] },
			{ label: "Oct", y: [24, 35] },
			{ label: "Nov", y: [20, 31] },
			{ label: "Dec", y: [16, 26] }
		  ]
		}]
	}		
}
