import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'funnel-chart',
  templateUrl: 'chart.component.html',
})
export class FunnelChartWithoutNeckChartComponent  implements OnInit{
	ngOnInit() {
		this.calculatePercentage(this.chartOptions);
	}
	chartOptions = {
	animationEnabled: true,
	theme: "dark2",
	title:{
		text: "Recruitment Analysis"
	},
	data: [{
		type: "funnel",
		indexLabel: "{label} - {y}",
		toolTipContent: "{label}: {y} ({percentage}%)",
		neckWidth: 20,
		neckHeight: 0,
		valueRepresents: "area",
		dataPoints: [
		{ y: 4871, label: "Applications" },
		{ y: 2996, label: "Screened" },
		{ y: 1298, label: "Qualified" },
		{ y: 918, label: "Interviewed" },
		{ y: 251, label: "Offers Extended" },
		{ y: 181, label: "Filled" }
		]
	}]
	}
	
	calculatePercentage = (chartOptions:any) => {
	let dataPoint = chartOptions.data[0].dataPoints;
	let total = dataPoint[0].y;
	for(let i = 0; i < dataPoint.length; i++) {
		if(i == 0) {
		chartOptions.data[0].dataPoints[i].percentage = 100;
		} else {
		chartOptions.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
		}
	}
	}		
}
