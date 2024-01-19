import { Component } from '@angular/core';

@Component({
  selector: 'ohlc-chart',
  templateUrl: 'chart.component.html',
})
export class OHLCChartComponent {
	chartOptions = {
		exportEnabled: true, 
		theme: "light2",
		title: {
		  text: "Litecoin Price"
		},
		axisX: {
		  valueFormatString: "MMM"
		},
		axisY: {
		  title: "Price in USD",
		  prefix: "$"
		},
		data:[{
		  type: "ohlc",
		  yValueFormatString: "$##.##",
		  xValueFormatString: "MMM YYYY",
		  dataPoints: [
			{ x: new Date(2021, 0, 1), y: [124.672768, 185.78035, 114.956459, 129.570816] },
			{ x: new Date(2021, 1, 1), y: [129.5746, 245.95752, 126.350449, 164.92717] },
			{ x: new Date(2021, 2, 1), y: [164.983139, 229.373978, 163.966431, 197.4991] },
			{ x: new Date(2021, 3, 1), y: [197.524368, 335.024536, 195.534042, 271.167084] },
			{ x: new Date(2021, 4, 1), y: [271.14267, 412.960144, 118.642441, 188.033676] },
			{ x: new Date(2021, 5, 1), y: [188.117554, 197.68428, 105.566292, 144.135834] },
			{ x: new Date(2021, 6, 1), y: [144.136642, 147.83606, 104.32589, 144.933212] },
			{ x: new Date(2021, 7, 1), y: [144.509857, 191.38266, 135.994553, 171.659225] },
			{ x: new Date(2021, 8, 1), y: [171.465179, 233.056854, 140.145157, 153.147995] },
			{ x: new Date(2021, 9, 1), y: [153.293655, 214.021576, 151.592651, 191.816376] },
			{ x: new Date(2021, 10, 1), y: [192.045029, 294.562866, 184.106033, 208.014542] },
			{ x: new Date(2021, 11, 1), y: [207.636612, 217.506332, 132.054291, 146.51474] }
		  ]
		}]
	  }		
}
