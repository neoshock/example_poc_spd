import { Component } from '@angular/core';

@Component({
  selector: 'doughnut-chart-indexlabel',
  templateUrl: 'chart.component.html',
})
export class DoughnutChartIndexlabelComponent {
	chartOptions = {
		animationEnabled: true,
		title:{
		  text: "Project Cost Breakdown"
		},
		data: [{
		  type: "doughnut",
		  yValueFormatString: "#,###.##'%'",
		  indexLabel: "{name}",
		  dataPoints: [
			{ y: 28, name: "Labour" },
			{ y: 10, name: "Legal" },
			{ y: 20, name: "Production" },
			{ y: 15, name: "License" },
			{ y: 23, name: "Facilities" },
			{ y: 17, name: "Taxes" },
			{ y: 12, name: "Insurance" }
		  ]
		}]
	}	
}
