import { Component } from '@angular/core';

@Component({
  selector: 'log-axis-chart',
  templateUrl: 'chart.component.html',
})
export class LogarithmicAxisChartComponent {
  step:number = Math.pow(10, .05);
  chartOptions = {
    zoomEnabled: true,
    zoomType: "xy",
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Frequency Response of Low Pass Filters"
    },
    subtitles:[{
      text: "X Axis scale is Logarithmic",
      fontSize: 14
    }],
    axisX: {
      logarithmic: true,
      title: "Frequency \u03C9(rad/s)",
      minimum: .01,
      suffix: "\u03C9\u2099",
      stripLines: [{
        value: 1,
        label: "Cutoff Frequency",
        labelFontColor: "#808080",
        labelAlign: "near"
      }]
    },
    axisY: {
      title: "Type 1 Magnitude (db)",
      lineThickness: 1,
      lineColor: "#6D78AD",
      tickColor: "#6D78AD",
      titleFontColor: "#6D78AD",
      labelFontColor: "#6D78AD"
    },
    axisY2: {
      title: "Type 2 Magnitude (db)",
      lineThickness: 1,
      lineColor: "#51CDA0",
      tickColor: "#51CDA0",
      titleFontColor: "#51CDA0",
      labelFontColor: "#51CDA0"
    },
    toolTip: {
      shared: true
    },
    legend:{
      cursor:"pointer",
      itemclick: function(e:any) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else{
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      name: "Type 1 Filter",
      showInLegend: true,
      yValueFormatString: "#,##0.00 db",
      xValueFormatString: "\u03C9 = #,##0.00#\u03C9\u2099",
      dataPoints: this.type1DataPoints(this.step)
    },
    {
      type: "line",
      name: "Type 2 Filter",
      color: "#51CDA0",
      showInLegend: true,
      axisYType: "secondary",
      yValueFormatString: "#,##0.00 db",
      xValueFormatString: "\u03C9 = #,##0.00#\u03C9\u2099",
      dataPoints: this.type2DataPoints(.02, this.step)
    }]
  }
 
  type1DataPoints(step:any){
    var dataPoints = [];
    var h;
    for(var w = .01; w < 100 ; w *= step){
      h =  -5 * Math.log(w*w + 1);
      dataPoints.push({x: w, y: h});
    }
    return dataPoints
  }
  
  type2DataPoints(e:any, step:any){
    var dataPoints = [];
    var h;
    for(var w = .01; w < 100 ; w *= step){
      h =  -5 * Math.log(Math.pow((1 - w*w), 2) + 4 *e*e*w*w);
      dataPoints.push({x: w, y: h});
    }
    return dataPoints;
  }	
}
