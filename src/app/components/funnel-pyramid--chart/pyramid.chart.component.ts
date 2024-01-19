import { Component } from '@angular/core';

@Component({
  selector: 'pyramid-chart',
  templateUrl: 'chart.component.html',
})
export class PyramidChartComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Product Manufacturing Expenses"
		},
		data: [{
		  type: "pyramid",
		  indexLabelFontSize: 18,
		  showInLegend: true,
		  legendText: "{indexLabel}",
		  toolTipContent: "{indexLabel}: {y}%",
		  dataPoints: [
			{ y: 32, indexLabel: "Research and Design" },
			{ y: 28, indexLabel: "Manufacturing" },
			{ y: 15, indexLabel: "Marketing" },
			{ y: 13, indexLabel: "Shipping" },
			{ y: 12, indexLabel: "Retail" }
		  ]
		}]
	}			
}
