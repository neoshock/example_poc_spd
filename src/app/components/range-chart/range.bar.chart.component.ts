import { Component } from '@angular/core';

@Component({
  selector: 'range-bar-chart',
  templateUrl: 'chart.component.html',
})
export class RangeBarChartComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Employees Salary in a Company"
		},
		axisX: {
			title: "Departments"
		},
		axisY: {
			title: "Salary in USD",
			interval: 10,
			suffix: "k",
			prefix: "$"
		}, 
		data: [{
			type: "rangeBar",
			showInLegend: true,
			yValueFormatString: "$#0.#K",
			indexLabel: "{y[#index]}",
			legendText: "Department wise Salary Range",
			color: "#6d78ad",
			dataPoints: [
				{ x: 10, y:[110, 155], label: "Data Scientist" },
				{ x: 20, y:[97, 149], label: "Product Manager" },
				{ x: 30, y:[85, 117], label: "Quality Assurance" },
				{ x: 40, y:[95, 135], label: "Software Engineer" },
				{ x: 50, y:[95, 155], label: "Web Developer" }
			]
		}]
	}		
}
