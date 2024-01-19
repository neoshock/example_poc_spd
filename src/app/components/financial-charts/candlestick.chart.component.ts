import { Component } from '@angular/core';

@Component({
  selector: 'candlestick-chart',
  templateUrl: 'chart.component.html',
})
export class CandlestickChartComponent {
	chartOptions = {
		exportEnabled: true, 
		title: {
		  text: "Ethereum Price",
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
		  prefix: "$",
		  crosshair: {
			enabled: true
		  }
		},
		data:[{
		  type: "candlestick",
		  yValueFormatString: "$##.##",
		  xValueFormatString: "MMM YYYY",
		  dataPoints: [
			{ x: new Date(2021, 0, 1), y: [737.708374, 1467.784912, 718.109497, 1314.986206] },
			{ x: new Date(2021, 1, 1), y: [1314.855225, 2036.286499, 1274.357788, 1416.04895] },
			{ x: new Date(2021, 2, 1), y: [1417.151123, 1947.837769, 1416.416138, 1918.362061] },
			{ x: new Date(2021, 3, 1), y: [1919.157227, 2797.972412, 1912.178467, 2773.207031] },
			{ x: new Date(2021, 4, 1), y: [2772.838379, 4362.350586, 1737.46875, 2714.945313] },
			{ x: new Date(2021, 5, 1), y: [2707.560547, 2891.254883, 1707.600586, 2274.547607] },
			{ x: new Date(2021, 6, 1), y: [2274.397461, 2551.161133, 1722.050781, 2536.209961] },
			{ x: new Date(2021, 7, 1), y: [2530.462891, 3466.992188, 2449.353516, 3433.732666] },
			{ x: new Date(2021, 8, 1), y: [3430.762451, 4022.469238, 2676.407471, 3001.678955] },
			{ x: new Date(2021, 9, 1), y: [3001.129395, 4455.735352, 2978.654297, 4288.074219] },
			{ x: new Date(2021, 10, 1), y: [4288.217285, 4891.70459, 3933.506592, 4631.479004] },
			{ x: new Date(2021, 11, 1), y: [4623.679688, 4780.732422, 3525.494141, 3682.632813] }  
		  ]
		}]
	  }			
}
