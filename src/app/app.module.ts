import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';
import { AppComponent } from './app.component';

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

import { NotFoundComponent } from './components/not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { ExamplePocComponent } from './commponents/example-poc/example-poc.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

    IndexlabelChartComponent,
    ZoomableChartComponent,
    MultiseriesChartComponent,
    MultiplsAxisChartComponent,
    CombinationChartComponent,
    DynamicChartComponent,
    AnimatedChartComponent,
    LogarithmicAxisChartComponent,
    LineChartAjaxComponent,
    DrilldownChartComponent,
    ResponsiveChartComponent,
    SynchronizedChartComponent,

    LineChartComponent,
    DashedLineChartComponent,
    MultiseriesLineChartComponent,
    SplineChartComponent,
    MultiseriesSplineChartComponent,
    StepLineChartComponent,
    MultiseriesSteplineComponent,

    BarChartComponent,
    MultiSeriesBarChartComponent,
    StackedBarChartComponent,
    StackedBar100ChartComponent,
    StackedBar100ChartIndexlabelComponent,

    ColumnChartComponent,
    MultiseriesColumnChartComponent,
    StackedColumnChartComponent,
    StackedColumn100ChartComponent,
    StackedColumn100ChartIndexlabelComponent,
    WaterfallChartComponent,
    WaterfallChartIndexlabelComponent,
    MultiseriesWaterfallChartComponent,

    PieChartIndexlabelComponent,
    PieChartDarkThemeComponent,
    DoughnutChartIndexlabelComponent,
    DoughnutChartDarkThemeComponent,

    AreaChartIndexlabelComponent,
    MultiseriesAreaChartComponent,
    SplineAreaChartComponent,
    MultiseriesSplineAreaChartComponent,
    StepAreaChartComponent,
    StackedAreaChartComponent,
    StackedArea100ChartComponent,

    RangeColumnChartComponent,
    MultiSeriesRangeColumnChartComponent,
    RangeBarChartComponent,
    MultiSeriesRangeBarChartComponent,
    RangeAreaChartComponent,
    MultiSeriesRangeAreaChartComponent,
    RangeSplineAreaChartComponent,
    MultiSeriesRangeSplineAreaChartComponent,

    BubbleChartComponent,
    MultiSeriesScatterChartComponent,

    FunnelChartComponent,
    FunnelChartWithoutNeckChartComponent,
    PyramidChartComponent,

    CandlestickChartComponent,
    MultiseriesCandlestickChartComponent,
    OHLCChartComponent,
    OHLCChartJSONComponent,
    BoxAndWhiskerChartComponent,

    ErrorBarChartComponent,
    ParetoChartComponent,
    OHLCTrendChartComponent,
    RangeAreaLineChartComponent,
    CandlestickLineChartComponent,
    DynamicLineChartComponent,
    DynamicColumnChartComponent,
    MultiSeriesDynamicChartComponent,

    StockChartNumericAxisComponent,
    StockChartDateTimeAxisComponent,
    StockChartRangeSelectorNavigatorComponent,

    NotFoundComponent,

    ExamplePocComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CanvasJSAngularStockChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
