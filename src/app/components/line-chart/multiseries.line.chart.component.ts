import { Component } from '@angular/core';

@Component({
  selector: 'app-index-label',
  templateUrl: 'chart.component.html',
})
export class MultiseriesLineChartComponent {
  	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "New York Climate - 2021"
		},
		axisX: {
			valueFormatString: "MMM",
			intervalType: "month",
			interval: 1
		},
		axisY: {
			title: "Temperature",
		  suffix: "°F"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: function(e: any){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type:"line",
			name: "Minimum",
			showInLegend: true,
			yValueFormatString: "#,###°F",
			dataPoints: [		
				{ x: new Date(2021, 0, 1), y: 27 },
				{ x: new Date(2021, 1, 1), y: 28 },
				{ x: new Date(2021, 2, 1), y: 35 },
				{ x: new Date(2021, 3, 1), y: 45 },
				{ x: new Date(2021, 4, 1), y: 54 },
				{ x: new Date(2021, 5, 1), y: 64 },
				{ x: new Date(2021, 6, 1), y: 69 },
				{ x: new Date(2021, 7, 1), y: 68 },
				{ x: new Date(2021, 8, 1), y: 61 },
				{ x: new Date(2021, 9, 1), y: 50 },
				{ x: new Date(2021, 10, 1), y: 41 },
				{ x: new Date(2021, 11, 1), y: 33 }
			]
		},
		{
			type: "line",
			name: "Maximum",
			showInLegend: true,
			yValueFormatString: "#,###°F",
			dataPoints: [
				{ x: new Date(2021, 0, 1), y: 40 },
				{ x: new Date(2021, 1, 1), y: 42 },
				{ x: new Date(2021, 2, 1), y: 50 },
				{ x: new Date(2021, 3, 1), y: 62 },
				{ x: new Date(2021, 4, 1), y: 72 },
				{ x: new Date(2021, 5, 1), y: 80 },
				{ x: new Date(2021, 6, 1), y: 85 },
				{ x: new Date(2021, 7, 1), y: 84 },
				{ x: new Date(2021, 8, 1), y: 76 },
				{ x: new Date(2021, 9, 1), y: 64 },
				{ x: new Date(2021, 10, 1), y: 54 },
				{ x: new Date(2021, 11, 1), y: 44 }
			]
		}]
	}	
}
