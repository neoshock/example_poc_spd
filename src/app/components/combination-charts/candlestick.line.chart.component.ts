import { Component } from '@angular/core';

@Component({
  selector: 'candlestick-line-chart',
  templateUrl: 'combination.chart.component.html',
})
export class CandlestickLineChartComponent {
	chart:any;
	getChartInstance(chart: object) {
	  this.chart = chart;
	  let sma = this.calculateSMA(this.chartOptions.data[0].dataPoints, 7);
	  this.chart.addTo("data", {
		type: "line",
		showInLegend: true, 
		markerSize: 0,
		yValueFormatString: "$#,###.00", 
		name: "Simple Moving Average",
		dataPoints: sma
	  });
	}
	
	calculateSMA(dps: any, period: any){
	  let avg = function(dps:any) {
		let sum = 0, period = 0, val;
		for (let i = 0; i < dps.length; i++) {
		  val = dps[i].y[3]; sum += val; period++;
		}
		return sum / period;
	  };
	  let result = [], val;
	  period = period || 5;
	  for (let i=0; i < period; i++)
		result.push({ x: dps[i].x , y: null});
	  for (let i=period - 1, len=dps.length; i < len; i++) {
		val = avg(dps.slice(i - period + 1, i));
		if (isNaN(val))
		  result.push({ x: dps[i].x, y: null});
		else
		  result.push({ x: dps[i].x, y: val});
	  }
	  return result;
	}
   
	chartOptions = {
	  title:{
		text:"Technical Indicators: SMA"
	  },
	  subtitles: [{
		text:"Simple Moving Average"
	  }],
	  axisY: {
		title: "Price in USD",
		prefix: "$"
	  },
	  axisX: {
		valueFormatString: "MMM D",
	  },
	  legend: {
		verticalAlign: "bottom",
		dockInsidePlotArea: "inside",
		cursor: "pointer",
		itemclick: function (e:any) {
		  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		  } else {
			e.dataSeries.visible = true;
		  }
		  e.chart.render();
		}
	  },
	  toolTip: {
		shared: true
	  },
	  data: [{
		type: "candlestick",
		showInLegend: true,
		name: "Stock Price",
		yValueFormatString: "$#,###.00",
		xValueType: "dateTime",
		dataPoints: [
		  { x: new Date("2021-01-01"), y: [737.708374, 749.201843, 719.792236, 730.367554] },
		  { x: new Date("2021-01-02"), y: [730.402649, 786.798462, 718.109497, 774.534973] },
		  { x: new Date("2021-01-03"), y: [774.511841, 1006.565002, 771.561646, 975.50769] },
		  { x: new Date("2021-01-04"), y: [977.058838, 1153.189209, 912.305359, 1040.233032] },
		  { x: new Date("2021-01-05"), y: [1041.498779, 1129.37146, 986.811279, 1100.006104] },
		  { x: new Date("2021-01-06"), y: [1101.005005, 1209.428589, 1064.233398, 1207.112183] },
		  { x: new Date("2021-01-07"), y: [1208.078369, 1282.57959, 1167.443115, 1225.678101] },
		  { x: new Date("2021-01-08"), y: [1225.967896, 1273.827515, 1076.081543, 1224.197144] },
		  { x: new Date("2021-01-09"), y: [1223.740479, 1303.871826, 1182.270386, 1281.077271] },
		  { x: new Date("2021-01-10"), y: [1280.871094, 1347.926147, 1194.715576, 1262.246704] },
		  { x: new Date("2021-01-11"), y: [1261.622925, 1261.622925, 924.922607, 1090.145386] },
		  { x: new Date("2021-01-12"), y: [1088.526733, 1149.240234, 1012.76416, 1043.43457] },
		  { x: new Date("2021-01-13"), y: [1043.740967, 1134.338501, 994.549072, 1130.73938] },
		  { x: new Date("2021-01-14"), y: [1130.231201, 1244.163086, 1093.060791, 1218.453003] },
		  { x: new Date("2021-01-15"), y: [1221.877197, 1250.505859, 1090.721069, 1171.834595] },
		  { x: new Date("2021-01-16"), y: [1171.443115, 1290.053589, 1157.623779, 1233.537598] },
		  { x: new Date("2021-01-17"), y: [1233.453369, 1265.644653, 1174.38855, 1230.172241] },
		  { x: new Date("2021-01-18"), y: [1230.313232, 1259.450073, 1187.311035, 1257.279541] },
		  { x: new Date("2021-01-19"), y: [1257.43457, 1432.300049, 1254.522949, 1377.295898] },
		  { x: new Date("2021-01-20"), y: [1375.248413, 1405.744141, 1243.299927, 1382.274048] },
		  { x: new Date("2021-01-21"), y: [1382.684448, 1382.684448, 1098.476196, 1121.570923] },
		  { x: new Date("2021-01-22"), y: [1118.889038, 1271.687622, 1046.596558, 1236.512207] },
		  { x: new Date("2021-01-23"), y: [1235.267944, 1272.151123, 1200.893311, 1230.990601] },
		  { x: new Date("2021-01-24"), y: [1231.210571, 1395.111328, 1225.274048, 1391.609375] },
		  { x: new Date("2021-01-25"), y: [1390.639893, 1467.784912, 1304.973999, 1324.414795] },
		  { x: new Date("2021-01-26"), y: [1323.741699, 1376.085083, 1253.340332, 1357.058105] },
		  { x: new Date("2021-01-27"), y: [1358.333374, 1368.074097, 1215.311279, 1253.187134] },
		  { x: new Date("2021-01-28"), y: [1251.279785, 1356.288696, 1226.17395, 1332.492188] },
		  { x: new Date("2021-01-29"), y: [1369.086792, 1428.981201, 1292.240112, 1382.522827] },
		  { x: new Date("2021-01-30"), y: [1382.231934, 1402.39978, 1328.529053, 1376.115479] },
		  { x: new Date("2021-01-31"), y: [1376.823608, 1378.916016, 1288.501587, 1314.986206] }
		]
	  }]
	}	
}
