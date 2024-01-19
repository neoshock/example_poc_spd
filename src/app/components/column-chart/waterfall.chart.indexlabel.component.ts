import { Component } from '@angular/core';

@Component({
  selector: 'column-chart',
  templateUrl: 'chart.component.html',
})
export class WaterfallChartIndexlabelComponent {
	chartOptions = {
		title:{
		  text: "Company Sales Report"  
		},
		animationEnabled: true,
		axisX: {
		  interval: 1
		},
		axisY: {
		  valueFormatString: "\u20B9#,##0,.L",
		  title: "Amount (in INR)"
		},
		data: [{        
		  type: "waterfall",
		  yValueFormatString: "\u20B9#,##0,.00L",
		  indexLabel: "{y}",
		  indexLabelPlacement: "inside",
		  risingColor: "#4CAF50",
		  fallingColor: "#F44336",
		  dataPoints: [
			{ label: "Jan", y: 8312 },
			{ label: "Feb", y: 5065 },
			{ label: "Mar", y: -2564 },
			{ label: "Apr", y: 7004},
			{ label: "May", y: 4324 },
			{ label: "Jun", y: -3543 },
			{ label: "July", y: 4008 },
			{ label: "Sep", y: -6997 },
			{ label: "Aug", y: 5673 },
			{ label: "Oct", y: 6654 },
			{ label: "Nov", y: -4943 },
			{ label: "Dec", y: 6324 },
			{ label: "Final", isCumulativeSum: true, indexLabel: "{y}", color: "#2196F3" }
		  ]
		}]
	}	
}
