import { Component } from '@angular/core';

@Component({
  selector: 'stacked-column100-chart-indexlabel',
  templateUrl: 'chart.component.html',
})
export class StackedColumn100ChartIndexlabelComponent {
	chartOptions = {
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: "Number of Students in Each Room"   
		},
		axisX:{
			title: "Rooms"
		},
		axisY:{
			title: "Percentage"
		},
		toolTip:  {
			shared: true
		},
		legend: {
			horizontalAlign: "right",
			verticalAlign: "center",
			reversed: true        
		},
		data: [{
			type: "stackedColumn100",
			name: "Boys",
			showInLegend: "true",
			indexLabel: "#percent %",
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 45, label: "Cafeteria"},
				{  y: 24, label: "Lounge" },
				{  y: 68, label: "Games Room" },
				{  y: 24, label: "Lecture Hall" },
				{  y: 15, label: "Library"}
			]
		}, {
			type: "stackedColumn100",
			name: "Girls",
			showInLegend: "true",
			indexLabel: "#percent %",
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{  y: 22, label: "Cafeteria"},
				{  y: 17, label: "Lounge" },
				{  y: 32, label: "Games Room" },
				{  y: 48, label: "Lecture Hall" },
				{  y: 25, label: "Library"}
			]
		}]
	}		
}
