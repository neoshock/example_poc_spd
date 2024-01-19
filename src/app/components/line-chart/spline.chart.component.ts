import { Component } from '@angular/core';

@Component({
  selector: 'app-index-label',
  templateUrl: 'chart.component.html',
})
export class SplineChartComponent {
  	chartOptions = {
	  animationEnabled: true,
	  exportEnabled: true,
	  title: {
		text: "World Population Growth Rate",
		fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		fontWeight: "bold"
	  },
	  axisY: {
		title: "Annual Population Growth (in %)",
		valueFormatString: "#,###.##'%'"
	  },
	  data: [{
		type: "spline",
		xValueFormatString: "YYYY",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { x: new Date(1961, 0, 1), y: 1.30072410817561 },
		  { x: new Date(1962, 0, 1), y: 1.7243462047616 },
		  { x: new Date(1963, 0, 1), y: 2.08332248580949 },
		  { x: new Date(1964, 0, 1), y: 2.05319982551457 },
		  { x: new Date(1965, 0, 1), y: 2.05524143402917 },
		  { x: new Date(1966, 0, 1), y: 2.10866788828604 },
		  { x: new Date(1967, 0, 1), y: 2.04952806653054 },
		  { x: new Date(1968, 0, 1), y: 2.0557795099968 },
		  { x: new Date(1969, 0, 1), y: 2.08817694565934 },
		  { x: new Date(1970, 0, 1), y: 2.09125276275897 },
		  { x: new Date(1971, 0, 1), y: 2.13311686340344 },
		  { x: new Date(1972, 0, 1), y: 2.03121137162374 },
		  { x: new Date(1973, 0, 1), y: 1.98294336877748 },
		  { x: new Date(1974, 0, 1), y: 1.92954936287425 },
		  { x: new Date(1975, 0, 1), y: 1.8558336723775 },
		  { x: new Date(1976, 0, 1), y: 1.79507967654773 },
		  { x: new Date(1977, 0, 1), y: 1.74961533313858 },
		  { x: new Date(1978, 0, 1), y: 1.74802018504161 },
		  { x: new Date(1979, 0, 1), y: 1.7620417897177 },
		  { x: new Date(1980, 0, 1), y: 1.74866104222924 },
		  { x: new Date(1981, 0, 1), y: 1.76406767844979 },
		  { x: new Date(1982, 0, 1), y: 1.80049048590014 },
		  { x: new Date(1983, 0, 1), y: 1.78432403887979 },
		  { x: new Date(1984, 0, 1), y: 1.74712530080474 },
		  { x: new Date(1985, 0, 1), y: 1.74895086012958 },
		  { x: new Date(1986, 0, 1), y: 1.76830078138659 },
		  { x: new Date(1987, 0, 1), y: 1.78300118456379 },
		  { x: new Date(1988, 0, 1), y: 1.77018316822685 },
		  { x: new Date(1989, 0, 1), y: 1.73856862522462 },
		  { x: new Date(1990, 0, 1), y: 1.73544185116863 },
		  { x: new Date(1991, 0, 1), y: 1.66842050994094 },
		  { x: new Date(1992, 0, 1), y: 1.57292819054604 },
		  { x: new Date(1993, 0, 1), y: 1.56456504240188 },
		  { x: new Date(1994, 0, 1), y: 1.52044016094899 },
		  { x: new Date(1995, 0, 1), y: 1.50599110708553 },
		  { x: new Date(1996, 0, 1), y: 1.45269465711498 },
		  { x: new Date(1997, 0, 1), y: 1.427219157415 },
		  { x: new Date(1998, 0, 1), y: 1.39160819986147 },
		  { x: new Date(1999, 0, 1), y: 1.35179096679923 },
		  { x: new Date(2000, 0, 1), y: 1.32307577883421 },
		  { x: new Date(2001, 0, 1), y: 1.2975934295266 },
		  { x: new Date(2002, 0, 1), y: 1.27680831188725 },
		  { x: new Date(2003, 0, 1), y: 1.26147763010064 },
		  { x: new Date(2004, 0, 1), y: 1.25426340053367 },
		  { x: new Date(2005, 0, 1), y: 1.24692384480321 },
		  { x: new Date(2006, 0, 1), y: 1.24369497414078 },
		  { x: new Date(2007, 0, 1), y: 1.23574121285958 },
		  { x: new Date(2008, 0, 1), y: 1.24085406678891 },
		  { x: new Date(2009, 0, 1), y: 1.22174269013 },
		  { x: new Date(2010, 0, 1), y: 1.20333276891564 },
		  { x: new Date(2011, 0, 1), y: 1.17025832977265 },
		  { x: new Date(2012, 0, 1), y: 1.18393451235548 },
		  { x: new Date(2013, 0, 1), y: 1.18384476275419 },
		  { x: new Date(2014, 0, 1), y: 1.18021596062547 },
		  { x: new Date(2015, 0, 1), y: 1.16873977624677 },
		  { x: new Date(2016, 0, 1), y: 1.16374431044332 },
		  { x: new Date(2017, 0, 1), y: 1.14385698082209 },
		  { x: new Date(2018, 0, 1), y: 1.10615060940842 },
		  { x: new Date(2019, 0, 1), y: 1.06513053318513 },
		  { x: new Date(2020, 0, 1), y: 1.03599084817998 }
		]
	  }]
	}	
}
