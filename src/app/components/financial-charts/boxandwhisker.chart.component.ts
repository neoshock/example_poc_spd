import { Component } from '@angular/core';

@Component({
  selector: 'box-and-whisker-chart',
  templateUrl: 'chart.component.html',
})
export class BoxAndWhiskerChartComponent {
	chartOptions = {
		animationEnabled: true,
		title:{
		  text: "Annual Salary Range"
		},
		axisX: {
		  labelTextAlign: "center"
		},
		axisY: {
		  title: "Annual Salary (in USD)",
		  prefix: "$",
		  interval: 40000
		},
		data: [{
		  type: "boxAndWhisker",
		  upperBoxColor: "#90CAF9",
		  lowerBoxColor: "#FFAB91",
		  color: "black",
		  yValueFormatString: "$#,##0",
		  dataPoints: [
			{ label: "Registered Nurse", y: [46360, 55320, 82490, 101650, 71000] },
			{ label: "Web Developer", y: [83133, 91830, 115828, 128982, 101381] },
			{ label: "System Analyst", y: [51910, 60143, 115056, 135450, 85800] },	
			{ label: "Application Engineer", y: [63364, 71653, 91120, 100556, 80757] },
			{ label: "Aerospace Engineer", y: [82725, 94361, 118683, 129191, 107142] },
			{ label: "Dentist", y: [116777, 131082, 171679, 194336, 146794] }
		  ]
		}]
	}		
}
