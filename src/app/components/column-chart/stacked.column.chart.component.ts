import { Component } from '@angular/core';

@Component({
  selector: 'column-chart',
  templateUrl: 'chart.component.html',
})
export class StackedColumnChartComponent {
	chartOptions = {
		theme: "dark2",
		title:{
		  text: "Platform Impressions by Quarter"
		},
		animationEnabled: true,
		toolTip: {
		  shared: true
		},
		legend: {
		  horizontalAlign: "right",
		  verticalAlign: "center",
		  reversed: true
		},
		axisY: {
		   includeZero: true
		},
		data: [{
		  type: "stackedColumn",
		  name: "Facebook",
		  showInLegend: true,
		  dataPoints: [
			{ label: "Qtr 1", y: 19729 },
			{ label: "Qtr 2", y: 22127 },
			{ label: "Qtr 3", y: 12654 },
			{ label: "Qtr 4", y: 22914 }
		  ]
		}, {
			type: "stackedColumn",
			name: "Twitter",
			showInLegend: true,
			dataPoints: [
			  { label: "Qtr 1", y: 4288 },
			  { label: "Qtr 2", y: 6390 },
			  { label: "Qtr 3", y: 3510 },
			  { label: "Qtr 4", y: 3876 }
			]
		}, {
			type: "stackedColumn",
			 name: "Instagram",
			showInLegend: true,
			dataPoints: [
			  { label: "Qtr 1", y: 5338 },
			  { label: "Qtr 2", y: 8670 },
			  { label: "Qtr 3", y: 4779 },
			  { label: "Qtr 4", y: 9415 }
			]
		}]
	}	
}
