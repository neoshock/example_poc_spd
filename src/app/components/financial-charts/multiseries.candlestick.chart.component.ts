import { Component } from '@angular/core';

@Component({
  selector: 'multiseries-candlestick-chart',
  templateUrl: 'chart.component.html',
})
export class MultiseriesCandlestickChartComponent {
	chartOptions = {
		exportEnabled: true, 
		theme: "light2",
		title: {
		  text: "Stock Price: AAPL vs MSFT"
		},
		axisX: {
		  valueFormatString: "MMM",
		  crosshair: {
			enabled: true,
			valueFormatString: "MMM YYYY",
			snapToDataPoint: true
		  }
		},
		axisY: {
		  title: "Price in USD",
		  prefix: "$"
		},
		toolTip: {
		  shared: true
		},
		legend: {
		  cursor: "pointer",
		  itemclick: function(e:any) {
			if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			  e.dataSeries.visible = false;
			} else {
			  e.dataSeries.visible = true;
			}
			e.chart.render();
		  }
		},
		data:[{
		  type: "candlestick",
		  name: "AAPL",
		  showInLegend: true,
		  yValueFormatString: "$##.##",
		  xValueFormatString: "MMM YYYY",
		  dataPoints: [
			{ x: new Date(2021, 0, 1), y: [133.520004, 145.089996, 126.379997, 131.960007] },
			{ x: new Date(2021, 1, 1), y: [133.75, 137.880005, 118.389999, 121.260002] },
			{ x: new Date(2021, 2, 1), y: [123.75, 128.720001, 116.209999, 122.150002] },
			{ x: new Date(2021, 3, 1), y: [123.660004, 137.070007, 122.489998, 131.460007] },
			{ x: new Date(2021, 4, 1), y: [132.039993, 134.070007, 122.25, 124.610001] },
			{ x: new Date(2021, 5, 1), y: [125.080002, 137.410004, 123.129997, 136.960007] },
			{ x: new Date(2021, 6, 1), y: [136.600006, 150, 135.759995, 145.860001] },
			{ x: new Date(2021, 7, 1), y: [146.360001, 153.490005, 144.5, 151.830002] },
			{ x: new Date(2021, 8, 1), y: [152.830002, 157.259995, 141.270004, 141.5] },
			{ x: new Date(2021, 9, 1), y: [141.899994, 153.169998, 138.270004, 149.800003] },
			{ x: new Date(2021, 10, 1), y: [148.990005, 165.699997, 147.479996, 165.300003] },
			{ x: new Date(2021, 11, 1), y: [167.479996, 182.130005, 157.800003, 177.570007] }
		  ]
		},{
		  type: "candlestick",
		  name: "MSFT",
		  showInLegend: true,
		  yValueFormatString: "$##.##",
		  xValueFormatString: "MMM YYYY",
		  dataPoints: [
			{ x: new Date(2021, 0, 1), y: [222.529999, 242.639999, 211.940002, 231.960007] },
			{ x: new Date(2021, 1, 1), y: [235.059998, 246.130005, 227.880005, 232.380005] },
			{ x: new Date(2021, 2, 1), y: [235.899994, 241.050003, 224.259995, 235.770004] },
			{ x: new Date(2021, 3, 1), y: [238.470001, 263.190002, 238.050003, 252.179993] },
			{ x: new Date(2021, 4, 1), y: [253.399994, 254.350006, 238.070007, 249.679993] },
			{ x: new Date(2021, 5, 1), y: [251.229996, 271.649994, 243, 270.899994] },
			{ x: new Date(2021, 6, 1), y: [269.609985, 290.149994, 269.600006, 284.910004] },
			{ x: new Date(2021, 7, 1), y: [286.359985, 305.839996, 283.73999, 301.880005] },
			{ x: new Date(2021, 8, 1), y: [302.869995, 305.320007, 281.619995, 281.920013] },
			{ x: new Date(2021, 9, 1), y: [282.119995, 332, 280.25, 331.619995] },
			{ x: new Date(2021, 10, 1), y: [331.359985, 349.670013, 326.369995, 330.589996] },
			{ x: new Date(2021, 11, 1), y: [335.130005, 344.299988, 317.25, 336.320007] }
		  ]
		}]
	  }		
}
