import { Component } from '@angular/core';

@Component({
  selector: 'error-bar-chart',
  templateUrl: 'chart.component.html',
})
export class ErrorBarChartComponent {
	chartOptions = {
		animationEnabled: true,
		title:{
		  text: "QOS - Survey Result",
		  fontFamily: "Trebuchet MS, Helvetica, sans-serif"
		},
		axisY:{
		  title: "Response values",
		  includeZero: true,
		  interval: 10
		},
		toolTip: {
		  shared: true
		},
		data: [{
		  type: "bar",
		  name: "Avg. Score",
		  toolTipContent: "<b>{label}</b> <br> <span style=\"color:#4F81BC\">{name}</span>: {y}",
		  dataPoints: [
			{ y: 94, label: "Order Accuracy" },
			{ y: 74, label: "Packaging" },
			{ y: 80, label: "Quantity" },
			{ y: 88, label: "Quality" },
			{ y: 76, label: "Delivery" }
		  ]
		}, {
		  type: "error",
		  name: "Variability Range",
		  toolTipContent: "{name}: {y[0]} - {y[1]}",
		  dataPoints: [
			{ y: [92, 98], label: "Order Accuracy" },
			{ y: [70, 78], label: "Packaging" },
			{ y: [78, 85], label: "Quantity" },
			{ y: [85, 92], label: "Quality" },
			{ y: [72, 78], label: "Delivery" }
		  ]
		}]
	  }		
}
