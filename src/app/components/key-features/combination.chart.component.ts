import { Component } from '@angular/core';

@Component({
  selector: 'combination-chart',
  templateUrl: 'chart.component.html',
})
export class CombinationChartComponent {

	labelFormatter = (e:any) => {
		var suffixes = ["", "K", "M", "B"];
 
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
 
		var suffix = suffixes[order];
		return ('$' +(e.value / Math.pow(1000, order)) + suffix);
	}
	
	chartOptions = {
	  animationEnabled: true,
	  theme: "light2",
	  title:{
		text: "Alphabet Inc Stock Price 2020"
	  },
	  subtitles: [{
		text: "Monthly Average"
	  }],
	  axisY2: {
		labelFormatter: this.labelFormatter
	  },
	  toolTip: {
		shared: true
	  },
	  data: [{
		type: "candlestick",
		showInLegend: true,
		name: "Stock Price",
		yValueFormatString: "$#,###.00",
		dataPoints: [
			{ label: "Jan", y: [1341.55, 1503.21, 1341.55, 1434.22] },
			{ label: "Feb", y: [1462.00, 1532.10, 1271.00, 1339.32] },
			{ label: "Mar", y: [1351.60, 1410.15, 1013.53, 1162.81] },
			{ label: "Apr", y: [1122.00, 1359.98, 1079.81, 1348.66] },
			{ label: "May", y: [1328.50, 1441.00, 1299.00, 1428.92] },
			{ label: "Jun", y: [1418.39, 1475.94, 1347.01, 1413.60] },
			{ label: "Jul", y: [1411.09, 1586.98, 1409.81, 1482.95] },
			{ label: "Aug", y: [1486.64, 1659.21, 1458.65, 1634.18] },
			{ label: "Sep", y: [1636.63, 1733.18, 1406.55, 1469.59] },
			{ label: "Oct", y: [1484.27, 1687.00, 1436.00, 1621.01] },
			{ label: "Nov", y: [1628.16, 1818.06, 1616.03, 1760.73] },
			{ label: "Dec", y: [1774.36, 1847.19, 1699.00, 1751.88] }
		]
	  },{
		type: "line",
		showInLegend: true,
		name: "Volume",
		axisYType: "secondary",
		dataPoints: [
			{ label: "Jan", y: 33691600 },
			{ label: "Feb", y: 37080600 },
			{ label: "Mar", y: 71392100 },
			{ label: "Apr", y: 46335100 },
			{ label: "May", y: 31866300 },
			{ label: "Jun", y: 38828400 },
			{ label: "Jul", y: 35247000 },
			{ label: "Aug", y: 37830900 },
			{ label: "Sep", y: 40567600 },
			{ label: "Oct", y: 39254200 },
			{ label: "Nov", y: 35035400 },
			{ label: "Dec", y: 31465900 }
		]
	  }]
	}
}
