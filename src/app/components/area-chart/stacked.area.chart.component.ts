import { Component } from '@angular/core';

@Component({
  selector: 'area-chart',
  templateUrl: 'chart.component.html',
})
export class StackedAreaChartComponent {
	chartOptions = {
		title: {
		  text: "Productivity by Day"             
		},
		animationEnabled: true,
		axisX: {      
		  valueFormatString: "DDD"
		},
		toolTip: {
		  shared: true,
		  contentFormatter: function (e: any) {
			var weekday = ["Sun","Mon", "Tue", "Wed", "Thu","Fri","Sat"];
			var content = weekday[e.entries[0].dataPoint.x.getDay()] + "<br/>";
			for (var i = e.entries.length - 1; i >= 0; i--) {
			  content += "<span style ='color:" + e.entries[i].dataSeries.color + "; font-weight: bold;';>" + e.entries[i].dataSeries.name + "</span>:" + e.entries[i].dataPoint.y + "hrs";
			  content += "<br/>";
			}
			return content;
		  }
		},
		legend: {
		  cursor: "pointer",
		  itemclick: function(e: any) {
			if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			  e.dataSeries.visible = false;
			}
			else {
			  e.dataSeries.visible = true;
			}
			e.chart.render();
		  }
		},
		data: [
		  {
			type: "stackedArea",
			name: "Very Distracting",
			showInLegend: true,
			legendMarkerType: "square",
			color: "rgba(211,19,14,.9)",
			markerSize: 0,
			dataPoints: [
			  {x: new Date(2020, 2, 15), y: 2.4 },
			  {x: new Date(2020, 2, 16), y: .6 },
			  {x: new Date(2020, 2, 17), y: .8 },
			  {x: new Date(2020, 2, 18), y: 1.6 },
			  {x: new Date(2020, 2, 19), y: 1.4 },
			  {x: new Date(2020, 2, 20), y: 1.4 },
			  {x: new Date(2020, 2, 21), y: 2.6 }
			]
		  },
		  {
			type: "stackedArea",        
			name: "Distracting",
			showInLegend: true,
			legendMarkerType: "square",
			markerSize: 0,
			color: "rgba(95,53,87,.9)",
			dataPoints: [
			  {x: new Date(2020, 2, 15), y: 3.3 },
			  {x: new Date(2020, 2, 16), y: 1.6 },
			  {x: new Date(2020, 2, 17), y: 2.1 },
			  {x: new Date(2020, 2, 18), y: 1.6 },
			  {x: new Date(2020, 2, 19), y: 1.4 },
			  {x: new Date(2020, 2, 20), y: 1.7 },
			  {x: new Date(2020, 2, 21), y: 4.6 }
			]
		  },            
		  {
			type: "stackedArea",
			name: "Productive",
			showInLegend: true,
			legendMarkerType: "square",
			markerSize: 0,
			color: "rgba(60,84,151,.9)",
			dataPoints: [
			  {x: new Date(2020, 2, 15), y: 2.4 },
			  {x: new Date(2020, 2, 16), y:  2 },
			  {x: new Date(2020, 2, 17), y: 2.8 },
			  {x: new Date(2020, 2, 18), y: 1.6 },
			  {x: new Date(2020, 2, 19), y: 1.4 },
			  {x: new Date(2020, 2, 20), y: 1.4 },
			  {x: new Date(2020, 2, 21), y: 1.6 }
			]
		  },
		  {
			legendMarkerType: "square",
			name: "Very Productive",
			showInLegend: true,
			type: "stackedArea",
			markerSize: 0,
			color: "rgba(22,115,211,.9)",
			dataPoints: [
			  {x: new Date(2020, 2, 15), y: .4 },
			  {x: new Date(2020, 2, 16), y: 7 },
			  {x: new Date(2020, 2, 17), y: 6.8 },
			  {x: new Date(2020, 2, 18), y: 4.6 },
			  {x: new Date(2020, 2, 19), y: 6.4 },
			  {x: new Date(2020, 2, 20), y: 7.4 },
			  {x: new Date(2020, 2, 21), y: 1.6 }
			]
		  }
		]
	}	
}
