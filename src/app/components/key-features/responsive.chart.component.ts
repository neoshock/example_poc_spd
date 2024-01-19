import { Component, DoCheck, AfterViewChecked, ElementRef  } from '@angular/core';


@Component({
  selector: 'responsive-chart',
  templateUrl: 'responsive.chart.component.html',
  styles: [".btn-group .btn:focus { box-shadow: none !important; }"]
})

export class ResponsiveChartComponent implements AfterViewChecked , DoCheck{
	chart: any;
	width = "100%";
	widthChanged = false;
	prevWidth = "";
	
	getChartInstance(chart: object) {
		this.chart = chart;
		this.prevWidth = this.width;
	}

	resizeChart = (e:any, w:any) => {
		e.target.parentElement.childNodes.forEach((button:any) => {
			if(button.classList.contains("btn-success")) {
				button.classList.remove("btn-success");
				button.classList.add("btn-outline-success");
			}
		});
		e.target.classList.add("btn-success");
		e.target.classList.remove("btn-outline-success");
		this.width = w + '%';
	}

	ngDoCheck() {
		if(this.prevWidth != this.width && this.chart) {
			this.widthChanged = true;
		}
	}

	ngAfterViewChecked() {
		if(this.widthChanged && this.chart) {
			this.prevWidth = this.width;
			this.chart.render();
		}
	}

	chartOptions = {
		title: {
			text: "Monthly Sales Data"
		},
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		axisY: {
		  includeZero: true,
		  valueFormatString: "$#,##0k"
		},
		data: [{
		  type: "column", //change type to bar, line, area, pie, etc
		  yValueFormatString: "$#,##0k",
		  color: "#01b8aa",
		  dataPoints: [
			  { label: "Jan", y: 172 },
			  { label: "Feb", y: 189 },
			  { label: "Mar", y: 201 },
			  { label: "Apr", y: 240 },
			  { label: "May", y: 166 },
			  { label: "Jun", y: 196 },
			  { label: "Jul", y: 218 },
			  { label: "Aug", y: 167 },
			  { label: "Sep", y: 175 },
			  { label: "Oct", y: 152 },
			  { label: "Nov", y: 156 },
			  { label: "Dec", y: 164 }
		  ]
		}]
	}

}
