import { Component } from '@angular/core';

@Component({
  selector: 'area-chart',
  templateUrl: 'chart.component.html',
})
export class StackedArea100ChartComponent {
	chartOptions = {
		animationEnabled: true,
		title:{
		  text: "Products Sold by ACME Ltd."
		},
		exportEnabled: true,
		axisX:{
		  title: "Seasons",
		  minimum: -0.02,
		  maximum: 3.02
		},
		axisY:{
		  title:"Sales"
		},
		toolTip:{
		  shared: true
		},
		data: [{
		  type: "stackedArea100",
		  name: "Mosquito Repellents",
		  showInLegend: "true",
		  color: "#006064",
		  toolTipContent: "{label}<br/><span style='\"'color:{color}'\"'>{name}:</span> ${y} (#percent%)",
		  dataPoints: [
			{ y: 93450 , label: "Spring" },
			{ y: 61240, label: "Summer" },
			{ y: 74120, label: "Autumn" },
			{ y: 81450, label: "Fall" }
		  ]
		},{
		  type: "stackedArea100",
		  name: "Liquid Soap",
		  showInLegend: "true",
		  color: "#0097A7",
		  toolTipContent: "<span style='\"'color:{color}'\"'>{name}:</span> ${y} (#percent%)",
		  dataPoints: [
			{ y: 30140 , label: "Spring" },
			{ y: 40170, label: "Summer" },
			{ y: 34410, label: "Autumn" },
			{ y: 48120, label: "Fall" }
		  ]
		},{
		  type: "stackedArea100",
		  name: "Napkins",
		  showInLegend: "true",
		  color: "#00BCD4",
		  toolTipContent: "<span style='\"'color:{color}'\"'>{name}:</span> ${y} (#percent%)",
		  dataPoints: [
			{ y: 55120 , label: "Spring" },
			{ y: 60350, label: "Summer" },
			{ y: 58410, label: "Autumn" },
			{ y: 63120, label: "Fall" }
		  ]
		},{
		  type: "stackedArea100",
		  name: "Sanitizer",
		  showInLegend: "true",
		  color: "#4DD0E1",
		  toolTipContent: "<span style='\"'color:{color}'\"'>{name}:</span> ${y} (#percent%)",
		  dataPoints: [
			{ y: 51050, label: "Spring" },
			{ y: 56100, label: "Summer" },
			{ y: 55010, label: "Autumn" },
			{ y: 53100, label: "Fall" }
		  ]
		}]
	}		
}
