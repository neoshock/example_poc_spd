import { Component } from '@angular/core';

@Component({
  selector: 'multiseries-stepline',
  templateUrl: 'chart.component.html',
})
export class MultiseriesSteplineComponent {
  	chartOptions = {
	   animationEnabled: true,
	   title:{
		 text: "Multi-Series StepLine Chart"
	   },
	   axisY:{
		 labelFontColor: "#4F81BC" ,
		 lineColor: "#4F81BC" ,
		 lineThickness: 3
	   }, 
	   toolTip: {
		 shared: true
	   }, 
	   axisY2:{
		 labelFontColor: "#C0504E",
		 lineColor: "#C0504E",
		 lineThickness: 3     
	   },
	   data: [{
		 type: "stepLine",  
		 lineThickness: 3,
		 dataPoints: [
		   { x: new Date(2020, 2), y: 15.00 },
		   { x: new Date(2020, 3), y: 14.50 },
		   { x: new Date(2020, 4), y: 14.00 },
		   { x: new Date(2020, 5), y: 14.50 },
		   { x: new Date(2020, 6), y: 14.75 },
		   { x: new Date(2020, 7), y: 15.20 },
		   { x: new Date(2020, 8), y: 15.80 },
		   { x: new Date(2020, 9), y: 17.50 }         
		 ]
	   }, {
		 type: "stepLine",  
		 axisYType: "secondary",
		 lineThickness: 3,
		 dataPoints: [
		   { x: new Date(2020, 2), y: 41.00 },
		   { x: new Date(2020, 3), y: 43.50 },
		   { x: new Date(2020, 4), y: 41.00 },
		   { x: new Date(2020, 5), y: 45.50 },
		   { x: new Date(2020, 6), y: 47.55 },
		   { x: new Date(2020, 7), y: 45.00 },
		   { x: new Date(2020, 8), y: 40.70 },
		   { x: new Date(2020, 9), y: 37.00 }         
		 ]
	   }]
	}
}
