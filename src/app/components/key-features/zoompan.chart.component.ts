import { Component } from '@angular/core';

@Component({
  selector: 'app-zoom-pan',
  templateUrl: 'chart.component.html',
})
export class ZoomableChartComponent {

	generateRandomData = () => {
		var y  = 1000, dps = [];
		for(var i = 0; i < 1000; i++) {
			y += Math.round(Math.random() * 10 - 5);
			dps.push({ y: y});
		}
		return dps;
	}
	chartOptions = {
		zoomEnabled: true,
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2",
		title: {
		text: "Try Zooming & Panning"
		},
		data: [{
			type: "line",
			dataPoints: this.generateRandomData()
		}]
	}

}
