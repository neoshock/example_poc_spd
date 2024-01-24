import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

import { IndexlabelChartComponent } from './components/key-features/indexlabel.chart.component';
import { ZoomableChartComponent } from './components/key-features/zoompan.chart.component';
import { MultiseriesChartComponent } from './components/key-features/multiseries.chart.component';
import { MultiplsAxisChartComponent } from './components/key-features/multiple.axis.chart.component';
import { CombinationChartComponent } from './components/key-features/combination.chart.component';
import { AnimatedChartComponent } from './components/key-features/animated.chart.component';
import { LogarithmicAxisChartComponent } from './components/key-features/logarithmic.axis.chart.component';
import { LineChartAjaxComponent } from './components/key-features/line.chart.ajax.component';
import { DynamicChartComponent } from './components/key-features/dynamic.chart.component';
import { DrilldownChartComponent } from './components/key-features/drilldown.chart.component';
import { ResponsiveChartComponent } from './components/key-features/responsive.chart.component';
import { SynchronizedChartComponent } from './components/key-features/synchronized.chart.component';

import { LineChartComponent } from './components/line-chart/line.chart.component';
import { DashedLineChartComponent } from './components/line-chart/dashed.line.chart.component';
import { MultiseriesLineChartComponent } from './components/line-chart/multiseries.line.chart.component';
import { SplineChartComponent } from './components/line-chart/spline.chart.component';
import { MultiseriesSplineChartComponent } from './components/line-chart/multiseries.spline.chart.component';
import { StepLineChartComponent } from './components/line-chart/stepline.chart.component';
import { MultiseriesSteplineComponent } from './components/line-chart/multiseries.stepline.chart.component';

import { BarChartComponent } from './components/bar-chart/bar.chart.component';
import { MultiSeriesBarChartComponent } from './components/bar-chart/multiseries.bar.chart.component';
import { StackedBarChartComponent } from './components/bar-chart/stacked.bar.chart.component';
import { StackedBar100ChartComponent } from './components/bar-chart/stacked.bar100.chart.component';
import { StackedBar100ChartIndexlabelComponent } from './components/bar-chart/stacked.bar100.chart.indexlabel.component';

import { ColumnChartComponent } from './components/column-chart/column.chart.component';
import { MultiseriesColumnChartComponent } from './components/column-chart/multiseries.column.chart.component';
import { StackedColumnChartComponent } from './components/column-chart/stacked.column.chart.component';
import { StackedColumn100ChartComponent } from './components/column-chart/stacked.column100.chart.component';
import { StackedColumn100ChartIndexlabelComponent } from './components/column-chart/stacked.column100.chart.indexlabel.component';
import { WaterfallChartComponent } from './components/column-chart/waterfall.chart.component';
import { WaterfallChartIndexlabelComponent } from './components/column-chart/waterfall.chart.indexlabel.component';
import { MultiseriesWaterfallChartComponent } from './components/column-chart/multiseries.waterfall.chart.component';

import { PieChartIndexlabelComponent } from './components/pie-chart/pie.chart.indexlabel.component';
import { PieChartDarkThemeComponent } from './components/pie-chart/pie.chart.dark.component';
import { DoughnutChartIndexlabelComponent } from './components/pie-chart/doughnut.chart.indexlabel.component';
import { DoughnutChartDarkThemeComponent } from './components/pie-chart/doughnut.chart.dark.component';

import { AreaChartIndexlabelComponent } from './components/area-chart/area.chart.indexlabel.component';
import { MultiseriesAreaChartComponent } from './components/area-chart/multiseries.area.chart.component';
import { SplineAreaChartComponent } from './components/area-chart/spline.area.chart.component';
import { MultiseriesSplineAreaChartComponent } from './components/area-chart/multiseries.spline.area.chart.component';
import { StepAreaChartComponent } from './components/area-chart/step.area.chart.component';
import { StackedAreaChartComponent } from './components/area-chart/stacked.area.chart.component';
import { StackedArea100ChartComponent } from './components/area-chart/stacked.area100.chart.component';

import { RangeColumnChartComponent } from './components/range-chart/range.column.chart.component';
import { MultiSeriesRangeColumnChartComponent } from './components/range-chart/multiseries.range.column.chart.component';
import { RangeBarChartComponent } from './components/range-chart/range.bar.chart.component';
import { MultiSeriesRangeBarChartComponent } from './components/range-chart/multiseries.range.bar.chart.component';
import { RangeAreaChartComponent } from './components/range-chart/range.area.chart.component';
import { MultiSeriesRangeAreaChartComponent } from './components/range-chart/multiseries.range.area.chart.component';
import { RangeSplineAreaChartComponent } from './components/range-chart/range.spline.area.chart.component';
import { MultiSeriesRangeSplineAreaChartComponent } from './components/range-chart/multiseries.range.spline.area.chart.component';

import { BubbleChartComponent } from './components/bubble-scatter-chart/bubble.chart.component';
import { MultiSeriesScatterChartComponent } from './components/bubble-scatter-chart/scatter.chart.component';

import { FunnelChartComponent } from './components/funnel-pyramid--chart/funnel.chart.component';
import { FunnelChartWithoutNeckChartComponent } from './components/funnel-pyramid--chart/funnel.chart.withoutneck.component';
import { PyramidChartComponent } from './components/funnel-pyramid--chart/pyramid.chart.component';

import { CandlestickChartComponent } from './components/financial-charts/candlestick.chart.component';
import { MultiseriesCandlestickChartComponent } from './components/financial-charts/multiseries.candlestick.chart.component';
import { OHLCChartComponent } from './components/financial-charts/ohlc.chart.component';
import { OHLCChartJSONComponent } from './components/financial-charts/ohlc.chart.json.component';
import { BoxAndWhiskerChartComponent } from './components/financial-charts/boxandwhisker.chart.component';

import { ErrorBarChartComponent } from './components/combination-charts/error.bar.chart.component';
import { ParetoChartComponent } from './components/combination-charts/pareto.chart.component';
import { OHLCTrendChartComponent } from './components/combination-charts/ohlc.chart.trend.component';
import { RangeAreaLineChartComponent } from './components/combination-charts/rangearea.line.chart.component';
import { CandlestickLineChartComponent } from './components/combination-charts/candlestick.line.chart.component';

import { DynamicLineChartComponent } from './components/dynamic-charts/dynamic.line.chart.component';
import { DynamicColumnChartComponent } from './components/dynamic-charts/dynamic.column.chart.component';
import { MultiSeriesDynamicChartComponent } from './components/dynamic-charts/multiseries.dynamic.line.chart.component';

import { StockChartNumericAxisComponent } from './components/stockchart/stockchart.numeric.axis';
import { StockChartDateTimeAxisComponent } from './components/stockchart/stockchart.datetime.axis';
import { StockChartRangeSelectorNavigatorComponent } from './components/stockchart/stockchart.rangeselector.navigator';
import { ExamplePocComponent } from './commponents/example-poc/example-poc.component';
import { StateCasesComponent } from './commponents/state-cases/state-cases.component';
import { EjecutivosCasesComponent } from './commponents/ejecutivos-cases/ejecutivos-cases.component';

const routes: Routes = [
  { path: '', component: ExamplePocComponent, pathMatch: "full" },

  { path: 'chart-index-data-label', component: IndexlabelChartComponent, title: "Angular Chart with Index Label" },
  { path: 'chart-zoom-pan', component: ZoomableChartComponent, title: "Angular Chart with Zooming & Panning" },
  { path: 'multiseries-chart', component: MultiseriesChartComponent, title: "Angular Multi Series Chart" },
  { path: 'multiple-axis', component: MultiplsAxisChartComponent, title: "Angular Chart with Multiple Axis" },
  { path: 'combination-chart', component: CombinationChartComponent, title: "Angular Combination Chart" },
  { path: 'dynamic-realtime-charts', component: DynamicChartComponent, title: "Angular Dynamic Chart" },
  { path: 'chart-with-animation', component: AnimatedChartComponent, title: "Angular Animated Chart" },
  { path: 'chart-logarithmic-axis', component: LogarithmicAxisChartComponent, title: "Angular Chart with Logarithmic Axis" },
  { path: 'line-chart-data-ajax-json', component: LineChartAjaxComponent, title: "Angular Line Chart with Data from AJAX" },
  { path: 'drilldown-chart', component: DrilldownChartComponent, title: "Angular Drilldown Chart" },
  { path: 'responsive-chart', component: ResponsiveChartComponent, title: "Angular Responsive Chart" },
  { path: 'synchronized-chart', component: SynchronizedChartComponent, title: "Angular Synchronized Charts" },

  { path: 'line-chart-with-date-time-axis', component: LineChartComponent, title: "Angular Line Chart" },
  { path: 'dashed-line-chart', component: DashedLineChartComponent, title: "Angular Dashed Line Chart" },
  { path: 'multi-series-line-chart', component: MultiseriesLineChartComponent, title: "Angular Multi Series Line Chart" },
  { path: 'spline-chart', component: SplineChartComponent, title: "Angular Spline Chart" },
  { path: 'multi-series-spline-chart', component: MultiseriesSplineChartComponent, title: "Angular Multi Series Spline Chart" },
  { path: 'step-line-chart', component: StepLineChartComponent, title: "Angular Step Line Chart" },
  { path: 'multi-series-step-line-chart', component: MultiseriesSteplineComponent, title: "Angular Multi Series Step Line Chart" },

  { path: 'bar-chart-category-axis', component: BarChartComponent, title: "Angular Bar Chart" },
  { path: 'multi-series-bar-chart', component: MultiSeriesBarChartComponent, title: "Angular Multi Series Bar Chart" },
  { path: 'stacked-bar-chart', component: StackedBarChartComponent, title: "Angular Stacked Bar Chart" },
  { path: 'stacked-bar-100-chart', component: StackedBar100ChartComponent, title: "Angular Stacked Bar 100% Chart" },
  { path: 'stacked-bar-100-chart-indexlabel', component: StackedBar100ChartIndexlabelComponent, title: "Angular Stacked Bar 100% Chart with Indexlabels" },


  { path: 'column-with-numeric-axis', component: ColumnChartComponent, title: "Angular Column Chart" },
  { path: 'multiseries-column-chart', component: MultiseriesColumnChartComponent, title: "Angular Multi Series Column Chart" },
  { path: 'stacked-column-chart', component: StackedColumnChartComponent, title: "Angular Stacked Column Chart" },
  { path: 'stacked-column100-chart', component: StackedColumn100ChartComponent, title: "Angular Stacked Column 100% Chart" },
  { path: 'stacked-column100-indexlabel-chart', component: StackedColumn100ChartIndexlabelComponent, title: "Angular Stacked Column 100% Chart with Index Labels" },
  { path: 'waterfall-chart', component: WaterfallChartComponent, title: "Angular Waterfall Chart" },
  { path: 'waterfall-chart-index-data-labels', component: WaterfallChartIndexlabelComponent, title: "Angular Waterfall Chart with Indexlabel" },
  { path: 'multi-series-waterfall-chart', component: MultiseriesWaterfallChartComponent, title: "Angular Multi Series Waterfall Chart" },

  { path: 'pie-chart-index-data-label', component: PieChartIndexlabelComponent, title: "Angular Pie Chart" },
  { path: 'pie-chart-dark-theme', component: PieChartDarkThemeComponent, title: "Angular Pie Chart in Dark Theme" },
  { path: 'doughnut-chart-index-data-label', component: DoughnutChartIndexlabelComponent, title: "Angular Doughnut / Donut Chart" },
  { path: 'doughnut-chart-dark-theme', component: DoughnutChartDarkThemeComponent, title: "Angular Doughnut Chart in Dark Theme" },

  { path: 'area-chart-index-data-labels', component: AreaChartIndexlabelComponent, title: "Angular Area Chart with Index Label" },
  { path: 'multi-series-area-chart', component: MultiseriesAreaChartComponent, title: "Angular Multi Series Area Chart" },
  { path: 'spline-area-chart', component: SplineAreaChartComponent, title: "Angular Spline Area Chart" },
  { path: 'multi-series-spline-area-chart', component: MultiseriesSplineAreaChartComponent, title: "Angular Multi Series Spline Area Chart" },
  { path: 'step-area-chart', component: StepAreaChartComponent, title: "Angular Step Area Chart" },
  { path: 'stacked-area-chart', component: StackedAreaChartComponent, title: "Angular Stacked Area Chart" },
  { path: 'stacked-area-100-chart', component: StackedArea100ChartComponent, title: "Angular Stacked Area 100% Chart" },

  { path: 'range-column-chart', component: RangeColumnChartComponent, title: "Angular Range Column Chart" },
  { path: 'multi-series-range-column-chart', component: MultiSeriesRangeColumnChartComponent, title: "Angular Multi Series Range Column Chart" },
  { path: 'range-bar-chart', component: RangeBarChartComponent, title: "Angular Range Bar Chart" },
  { path: 'multi-series-range-bar-chart', component: MultiSeriesRangeBarChartComponent, title: "Angular Multi Series Range Bar Chart" },
  { path: 'range-area-chart', component: RangeAreaChartComponent, title: "Angular Range Area Chart" },
  { path: 'multi-series-range-area-chart', component: MultiSeriesRangeAreaChartComponent, title: "Angular Multi Series Range Area Chart" },
  { path: 'range-spline-area-chart', component: RangeSplineAreaChartComponent, title: "Angular Range Spline Area Chart" },
  { path: 'multi-series-range-spline-area-chart', component: MultiSeriesRangeSplineAreaChartComponent, title: "Angular Multi Series Range Spline Area Chart" },

  { path: 'bubble-chart-index-data-label', component: BubbleChartComponent, title: "Angular Bubble Chart" },
  { path: 'multi-series-scatter-chart', component: MultiSeriesScatterChartComponent, title: "Angular Scatter Chart" },

  { path: 'funnel-chart-index-labels', component: FunnelChartComponent, title: "Angular Funnel Chart" },
  { path: 'funnel-chart-without-neck', component: FunnelChartWithoutNeckChartComponent, title: "Angular Funnel Chart without Neck" },
  { path: 'pyramid-chart-index-labels', component: PyramidChartComponent, title: "Angular Pyramid Chart" },

  { path: 'candlestick-chart', component: CandlestickChartComponent, title: "Angular Candlestick Chart" },
  { path: 'multi-series-candlestick-chart', component: MultiseriesCandlestickChartComponent, title: "Angular Multi Series Candlestick Chart" },
  { path: 'ohlc-chart', component: OHLCChartComponent, title: "Angular OHLC Chart" },
  { path: 'ohlc-chart-json-data', component: OHLCChartJSONComponent, title: "Angular OHLC Chart with JSON Data" },
  { path: 'box-whisker-chart', component: BoxAndWhiskerChartComponent, title: "Angular Box & WhiskerChart" },

  { path: 'error-bar-chart', component: ErrorBarChartComponent, title: "Angular Error Bar Chart" },
  { path: 'pareto-chart', component: ParetoChartComponent, title: "Angular Pareto Chart" },
  { path: 'range-area-line-chart', component: RangeAreaLineChartComponent, title: "Angular Range Area & Line Chart" },
  { path: 'candlestick-line-combo-charts', component: CandlestickLineChartComponent, title: "Angular Candlestick & Line Chart" },
  { path: 'ohlc-chart-trend', component: OHLCTrendChartComponent, title: "Angular OHLC Chart with Trend" },

  { path: 'dynamic-line-chart', component: DynamicLineChartComponent, title: "Angular Dynamic Line Chart" },
  { path: 'dynamic-column-chart', component: DynamicColumnChartComponent, title: "Angular Dynamic Column Chart" },
  { path: 'multi-series-dyanmic-chart', component: MultiSeriesDynamicChartComponent, title: "Angular Multi Series Dynamic Chart" },

  { path: 'stockchart-numeric-axis', component: StockChartNumericAxisComponent, title: "Angular StockChart with Numeric Axis" },
  { path: 'stockchart-datetime-axis', component: StockChartDateTimeAxisComponent, title: "Angular StockChart with Date-Time Axis" },
  { path: 'stockchart-rangeselector-navigator', component: StockChartRangeSelectorNavigatorComponent, title: "Angular StockChart with Range Selector & Navigator" },
  { path: 'example_poc', component: ExamplePocComponent, title: "POC SDP" },
  { path: 'state_cases', component: StateCasesComponent, title: "POC SDP" },
  { path: 'ejecutivos_cases', component: EjecutivosCasesComponent, title: "POC SDP" },


  { path: '**', component: NotFoundComponent, title: "404 Not Found" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }