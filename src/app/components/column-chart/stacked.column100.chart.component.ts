import { Component } from '@angular/core';

@Component({
  selector: 'stacked-column100-chart',
  templateUrl: 'chart.component.html',
})
export class StackedColumn100ChartComponent {
	chartOptions = {
		animationEnabled: true,
		title:{
		  text: "Composition of Internet Traffic in North America"
		},
		axisX: {
		  tickThickness: 0,
		  interval: 1,
		  intervalType: "year"
		},
		toolTip: {
		  shared: true
		},
		axisY: {
		  lineThickness: 0,
		  tickThickness: 0,
		  interval: 20
		},
		legend:{
		  verticalAlign: "center",
		  horizontalAlign: "right",
		  reversed: true
		},
		data: [{        
		  name: "Real-Time",
		  showInLegend: true,
		  type: "stackedColumn100", 
		  color: "#004B8D ",
		  dataPoints: [
			{x: new Date(2017,0), y: 30},
			{x: new Date(2018,0), y: 40},
			{x: new Date(2019,0), y: 50},
			{x: new Date(2020,0), y: 60}
		  ]
		}, {        
		  name: "Web Browsing",
		  showInLegend: true,
		  type: "stackedColumn100", 
		  color: "#0074D9 ",
		  dataPoints: [
			{x: new Date(2017,0), y: 40},
			{x: new Date(2018,0), y: 28},
			{x: new Date(2019,0), y: 18},
			{x: new Date(2020,0), y: 12}
		  ]
		}, {        
		  name: "File Sharing",
		  showInLegend: true,
		  type: "stackedColumn100", 
		  color: "#4192D9 ",
		  dataPoints: [
			{x: new Date(2017,0), y: 15},
			{x: new Date(2018,0), y: 15},
			{x: new Date(2019,0), y: 12},
			{x: new Date(2020,0), y: 10}
		  ]
		}, {        
		  name: "Other",
		  showInLegend: true,
		  type: "stackedColumn100", 
		  color: "#7ABAF2 ",
		  dataPoints: [
			{x: new Date(2017,0), y: 15},
			{x: new Date(2018,0), y: 17},
			{x: new Date(2019,0), y: 20},
			{x: new Date(2020,0), y: 18}
		  ]
		}]
	}	
}
