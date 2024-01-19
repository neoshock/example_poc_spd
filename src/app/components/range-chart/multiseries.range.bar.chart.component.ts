import { Component } from '@angular/core';

@Component({
  selector: 'multiseries-range-bar-chart',
  templateUrl: 'chart.component.html',
})
export class MultiSeriesRangeBarChartComponent {
	chartOptions = {
		animationEnabled: true,
		theme: "light1",
		exportEnabled: true,
		title: {
		  text: "Average Temparature Comparsion"
		},
		axisY: { 
		  title: "Temperature (°C)",
		  suffix: " °C"
		}, 
		toolTip: {
		  shared: true,
		},
		data: [{
		  type: "rangeBar",
		  showInLegend: true,
		  yValueFormatString: "#.00°C",
		  name: "California",
		  color: "#F57C00",
		  indexLabel: "{y[#index]}",
		  toolTipContent: "{label}<br/><span style='\"'color:{color}'\"'>{name}</span>: <b>MIN:</b>{y[0]}, <b>MAX:</b>{y[1]}",
		  dataPoints: [
			{ y: [-13.60086075, 36.89945], label: "1979" },
			{ y: [-13.37094904, 38.41296667], label: "1980" },
			{ y: [-11.69145833, 38.10635833], label: "1981" },
			{ y: [-15.2154825, 35.93550833], label: "1982" },
			{ y: [-11.922074, 37.152325], label: "1983" }
		  ]
		},{
		  type: "rangeBar",
		  showInLegend: true,
		  yValueFormatString: "#.00°C",
		  name: "Texas",
		  color: "#FBC02D",
		  indexLabel: "{y[#index]}",
		  toolTipContent: "<span style='\"'color:{color}'\"'>{name}</span>: <b>MIN:</b>{y[0]}, <b>MAX:</b>{y[1]}",
		  dataPoints: [
			{ y: [-4.238106667, 36.84065], label: "1979" },
			{ y: [-2.918750833, 38.03693333], label: "1980" },
			{ y: [-1.542025083, 37.14540833], label: "1981" },
			{ y: [-4.330412333, 37.831475], label: "1982" },
			{ y: [-4.681096558, 37.37269167], label: "1983" }
		  ]
		}]
	}	
}
