import { Component } from '@angular/core';

@Component({
  selector: 'app-index-label',
  templateUrl: 'chart.component.html',
})
export class StepLineChartComponent {
  	chartOptions = {
	  animationEnabled: true,
	  exportEnabled: true,
	  title: {
		text: "Stock Movement"
	  },
	  axisY: {
		title: "Stock in Hand"
	  },
	  data: [{
		type: "stepLine",
		dataPoints: [
		  { x: new Date(2021, 0, 1), y: 1792 },
		  { x: new Date(2021, 1, 1), y: 1326 },
		  { x: new Date(2021, 2, 1), y: 1955 },
		  { x: new Date(2021, 3, 1), y: 1727 },
		  { x: new Date(2021, 4, 1), y: 1085 },
		  { x: new Date(2021, 5, 1), y: 1523 },
		  { x: new Date(2021, 6, 1), y: 1257 },
		  { x: new Date(2021, 7, 1), y: 1520 },
		  { x: new Date(2021, 8, 1), y: 1853 },
		  { x: new Date(2021, 9, 1), y: 1738 },
		  { x: new Date(2021, 10, 1), y: 1754 },
		  { x: new Date(2021, 11, 1), y: 1624 }
		]
	  }]
	}	
}
