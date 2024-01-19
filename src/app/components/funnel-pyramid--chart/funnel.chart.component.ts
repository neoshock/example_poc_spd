import { Component } from '@angular/core';

@Component({
  selector: 'funnel-chart',
  templateUrl: 'chart.component.html',
})
export class FunnelChartComponent {
	chartOptions = {
		animationEnabled: true,
		title: {
		  text: "Email Conversation Rate"
		},
		data: [{
		  type: "funnel",
		  indexLabel: "{name}: {y}",
		  valueRepresents: "area",
		  dataPoints: [
			{ y: 10000, name: "Recieved Email" },
			{ y: 2000, name: "Opened Email" },
			{ y: 1500, name: "Visited Website" },
			{ y: 500, name: "Added Product to Cart" },
			{ y: 250, name: "Completed Purchase" }
		  ]
		}]
	}		
}
