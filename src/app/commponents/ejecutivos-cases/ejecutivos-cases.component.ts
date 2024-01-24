import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaymentData } from "../example-poc/payment_data.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-ejecutivos-cases",
  templateUrl: "./ejecutivos-cases.component.html",
  styleUrls: ["./ejecutivos-cases.component.css"],
})
export class EjecutivosCasesComponent implements OnInit {
  addSymbols = (e: any) => {
    var suffixes = ["", "K", "M", "B"];

    var order = Math.max(
      Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
      0
    );
    if (order > suffixes.length - 1) order = suffixes.length - 1;

    var suffix = suffixes[order];
    return e.value / Math.pow(1000, order) + suffix;
  };

  chartOptions: any;
  chartOptions2: any;
  chartOptions4: any;
  chartOptions5: any;
  chartOptions6: any;

  jsonData: any[] = [];
  jsonLiquidateData: any[] = [];

  jsonLiquidateDateByEjecutivoSiniestros: any[] = [];
  jsonLiquidateDataByRamo: any[] = [];
  jsonCasesByEjecutivoSiniestros: any[] = [];

  jsonFields: string[] = [];
  selectedFields: Set<string> = new Set();
  axisSelection: { [key: string]: "x" | "y" } = {};

  xAxisFields: string[] = [];
  yAxisFields: string[] = [];
  chart: any;
  chart2: any;
  chart4: any;
  chart5: any;
  chart6: any;

  isButtonVisible = false;
  visitorsChartDrilldownHandler = (e: any) => {
    this.chart2.options = this.visitorsDrilldownedChartOptions;
    this.chart2.options.data = this.chartOptions2[e.dataPoint.name];
    this.chart2.options.title = { text: e.dataPoint.name };
    this.chart2.render();
    this.isButtonVisible = true;
  };

  visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisY: {
      gridThickness: 0,
      lineThickness: 1,
    },
    data: [],
  };

  newVSReturningVisitorsOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "New vs Returning Visitors",
    },
    subtitles: [
      {
        text: "Click on Any Segment to Drilldown",
        backgroundColor: "#2eacd1",
        fontSize: 16,
        fontColor: "white",
        padding: 5,
      },
    ],
    data: [],
  };

  // total cases indicator
  totalCasesChart: any;
  totalCasesNumber: number = 0;
  totalCases: any;

  // total payment indicator
  totalPaymentChart: any;
  totalPayment: any;
  totalPaymentNumber: number = 0;

  // Número de casos liquidados
  liquidatedCasesNumber: number = 0;
  liquidatedCases: any;
  liquidatedCasesChart: any;

  // Valor en reserva
  amountInReserve: any;
  amountInReserveChart: any;
  amountInReserveNumber: number = 0;

  // Total de casos por periodo (Comparativa) x ramo
  totalCasesByPeriod: any;
  totalCasesByPeriodChart: any;

  isDropdownOpen: boolean = false;
  isDropdownOpen2: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen2) {
      this.isDropdownOpen2 = false;
    }
  }

  toggleDropdown2(): void {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http
      .get<PaymentData[]>("assets/tableConvert.com_0qevpc.json")
      .subscribe((data) => {
        this.jsonData = data;
        this.jsonLiquidateData = data.filter(
          (item: any) => item["Estado Aviso"] === "Liquidado"
        );

        this.jsonLiquidateDateByEjecutivoSiniestros =
          this.jsonLiquidateData.reduce((acc, item) => {
            const sucursal = item["Ejecutivo Siniestros"] || "SIN EJECUTIVO";

            if (!acc[sucursal]) {
              acc[sucursal] = [];
            }
            acc[sucursal].push(item);
            // Ordenar por Fecha Paso dentro de cada grupo (sucursal)
            acc[sucursal].sort(
              (a: any, b: any) =>
                new Date(a["Fecha Paso"]).getTime() -
                new Date(b["Fecha Paso"]).getTime()
            );
            return acc;
          }, {});

        this.jsonCasesByEjecutivoSiniestros = this.jsonData.reduce(
          (acc, item) => {
            const sucursal = item["Ejecutivo Siniestros"] || "SIN EJECUTIVO";

            if (!acc[sucursal]) {
              acc[sucursal] = [];
            }
            acc[sucursal].push(item);
            // Ordenar por Fecha Paso dentro de cada grupo (sucursal)
            acc[sucursal].sort(
              (a: any, b: any) =>
                new Date(a["Fecha Paso"]).getTime() -
                new Date(b["Fecha Paso"]).getTime()
            );
            return acc;
          },
          {}
        );

        this.jsonLiquidateDataByRamo = this.jsonData.reduce((acc, item) => {
          const sucursal = item["Ramo"];
          if (!acc[sucursal]) {
            acc[sucursal] = [];
          }
          acc[sucursal].push(item);
          // Ordenar por Fecha Paso dentro de cada grupo (sucursal)
          acc[sucursal].sort(
            (a: any, b: any) =>
              new Date(a["Fecha Paso"]).getTime() -
              new Date(b["Fecha Paso"]).getTime()
          );
          return acc;
        }, {});

        console.log(data);
        console.log(this.jsonLiquidateData);
        console.log(this.jsonLiquidateDateByEjecutivoSiniestros);
        console.log(this.jsonCasesByEjecutivoSiniestros);

        this.jsonFields = Object.keys(data[0]);
        this.xAxisFields = this.jsonFields;
        this.yAxisFields = this.jsonFields;

        this.selectedFields.add("Ramo");
        this.selectedFields.add("Valor Pago");

        this.axisSelection["Ramo"] = "x";
        this.axisSelection["Valor Pago"] = "y";

        this.prepareDataForBarChartLiqByAsesor();
        this.prepareDataForDrillDownChart();

        this.prepareDataForTotalPayment();
        this.prepareDataForLiquidatedCases();

        this.prepareDataForDoughnutChart();

        this.prepareDataForBarChart();

        this.prepareDataForBarChartApilada();

        this.prepareDataForTotalCases();
        this.prepareDataForAmountInReserve();
      });
  }

  getChartInstance(chartInstance: any): void {
    this.chart = chartInstance;
    this.prepareDataForBarChartLiqByAsesor(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChartLiqByAsesor(): void {
    const totalNormalized = Object.values(
      this.jsonLiquidateDateByEjecutivoSiniestros
    ).reduce((sum, value) => sum + value.length, 0);

    // Obtener el total de elementos agrupados para cada sucursal y maquetarlo
    const dataPoints = Object.keys(this.jsonLiquidateDateByEjecutivoSiniestros)
      .map((ejecutivoSiniestros: any) => {
        const percentage =
          (this.jsonLiquidateDateByEjecutivoSiniestros[ejecutivoSiniestros]
            .length /
            totalNormalized) *
          100;
        return {
          label: ejecutivoSiniestros,
          y: this.jsonLiquidateDateByEjecutivoSiniestros[ejecutivoSiniestros]
            .length,
          indexLabel: "{y}", // Muestra la cantidad de casos en la barra,
          toolTipContent: `${ejecutivoSiniestros} (${percentage.toFixed(2)}%)`,
        };
      })
      .sort((a, b) => b.y - a.y) // Ordena de mayor a menor cantidad de elementos
      //.slice(0, 10) // Selecciona los primeros 10 elementos
      .sort((a, b) => a.y - b.y); // Ordena de menor a mayor cantidad de elementos

    this.chartOptions = {
      theme: "light2",
      title: {
        text: " # Liquidados X Ejecutivo",
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        labelLimit: 10,
      },
      axisX: {
        labelLimit: 10, // Establece el límite de caracteres para el texto del eje X
      },
      data: [
        {
          type: "bar",
          indexLabel: "{y}",
          yValueFormatString: "#,###",
          dataPoints: dataPoints,
        },
      ],
    };

    if (this.chart) {
      this.chart.options = this.chartOptions;
      this.chart.render();
    }
  }

  getChartInstance2(chartInstance: any): void {
    this.chart2 = chartInstance;
    this.prepareDataForDrillDownChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForDrillDownChart(): void {
    this.chartOptions2 = {
      "New vs Returning Visitors": [
        {
          type: "pie",
          name: "New vs Returning Visitors",
          startAngle: 90,
          cursor: "pointer",
          explodeOnClick: false,
          showInLegend: true,
          legendMarkerType: "square",
          click: this.visitorsChartDrilldownHandler,
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          dataPoints: [
            {
              y: 551160,
              name: "New Visitors",
              color: "#058dc7",
              indexLabel: "62.56%",
            },
            {
              y: 329840,
              name: "Returning Visitors",
              color: "#50b432",
              indexLabel: "37.44%",
            },
          ],
        },
      ],
      "New Visitors": [
        {
          color: "#058dc7",
          name: "New Visitors",
          type: "column",
          dataPoints: [
            { label: "Jan", y: 42600 },
            { label: "Feb", y: 44960 },
            { label: "Mar", y: 46160 },
            { label: "Apr", y: 48240 },
            { label: "May", y: 48200 },
            { label: "Jun", y: 49600 },
            { label: "Jul", y: 51560 },
            { label: "Aug", y: 49280 },
            { label: "Sep", y: 46800 },
            { label: "Oct", y: 57720 },
            { label: "Nov", y: 59840 },
            { label: "Dec", y: 54400 },
          ],
        },
      ],
      "Returning Visitors": [
        {
          color: "#50b432",
          name: "Returning Visitors",
          type: "column",
          dataPoints: [
            { label: "Jan", y: 21800 },
            { label: "Feb", y: 25040 },
            { label: "Mar", y: 23840 },
            { label: "Apr", y: 24760 },
            { label: "May", y: 25800 },
            { label: "Jun", y: 26400 },
            { label: "Jul", y: 27440 },
            { label: "Aug", y: 29720 },
            { label: "Sep", y: 29200 },
            { label: "Oct", y: 31280 },
            { label: "Nov", y: 33160 },
            { label: "Dec", y: 31400 },
          ],
        },
      ],
    };

    console.log(this.jsonData);
    if (this.chart2) {
      this.chart2.options = this.chartOptions2;
      this.chart2.render();
    }
  }

  getChartInstanceForTotalPayment(chartInstance: any): void {
    this.totalPaymentChart = chartInstance;
    this.prepareDataForTotalPayment(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForTotalPayment(): void {
    // Acumular pagos por 'Fecha de Pago'
    const dataByFechaPago = this.jsonData.reduce((acc, item) => {
      if (item["Estado Aviso"] === "Liquidado") {
        const fechaParts = item["Fecha de Aviso"].split("/");
        if (fechaParts.length === 3) {
          const fecha = new Date(
            `${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`
          );
          const fechaKey = fecha.toISOString().split("T")[0];
          const valorPago = parseFloat(item[" Valor Reserva "]);
          if (!isNaN(valorPago)) {
            acc[fechaKey] = (acc[fechaKey] || 0) + valorPago;
          }
        }
      }
      return acc;
    }, {});
    // Ordenar los datos por fecha
    const sortedDataPoints = Object.entries(dataByFechaPago)
      .map(([fecha, valorPago]) => ({ x: new Date(fecha), y: valorPago }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.totalPayment = {
      animationEnabled: true,
      axisX: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje X en blanco para ocultarlas
        },
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje X en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje X estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje X en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje X en blanco para ocultarlos
      },
      axisY: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje Y en blanco para ocultarlas
        },
        suffix: "",
        stripLines: [],
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje Y en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje Y estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje Y en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje Y en blanco para ocultarlos
      },
      data: [
        {
          type: "spline",
          xValueFormatString: "DD/MM/YYYY",
          yValueFormatString: "#,###.##'$'",
          dataPoints: sortedDataPoints,
        },
      ],
    };
    // Calcular el número total de pagos
    this.totalPaymentNumber = this.jsonData.reduce((acc, item) => {
      if (item["Estado Aviso"] === "Liquidado") {
        const valorPago = parseFloat(item[" Valor Reserva "]);
        if (!isNaN(valorPago)) {
          return acc + valorPago;
        }
      }
      return acc;
    }, 0);

    this.totalPaymentNumber = parseFloat(this.totalPaymentNumber.toFixed(0));

    if (this.totalPaymentChart) {
      this.totalPaymentChart.options = this.totalPayment;
      this.totalPaymentChart.render();
    }
  }

  getChartInstanceForLiquidatedCases(chartInstance: any): void {
    this.liquidatedCasesChart = chartInstance;
    this.prepareDataForLiquidatedCases(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForLiquidatedCases(): void {
    // Filtrar casos con 'Estado Aviso' igual a 'Liquidado' y contarlos
    this.liquidatedCasesNumber = this.jsonData.filter(
      (item) => item["Estado Aviso"] === "Liquidado"
    ).length;

    // Preparar datos para el gráfico (si es necesario)
    const dataByFechaLiquidacion = this.jsonData.reduce((acc, item) => {
      if (item["Estado Aviso"] === "Liquidado") {
        const fechaParts = item["Fecha de Aviso"].split("/");
        if (fechaParts.length === 3) {
          const fecha = new Date(
            `${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`
          );
          const fechaKey = fecha.toISOString().split("T")[0];
          acc[fechaKey] = (acc[fechaKey] || 0) + 1;
        }
      }
      return acc;
    }, {});

    const sortedDataPoints = Object.entries(dataByFechaLiquidacion)
      .map(([fecha, count]) => ({ x: new Date(fecha), y: count }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.liquidatedCases = {
      animationEnabled: true,
      axisX: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje X en blanco para ocultarlas
        },
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje X en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje X estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje X en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje X en blanco para ocultarlos
      },
      axisY: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje Y en blanco para ocultarlas
        },
        suffix: "",
        stripLines: [],
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje Y en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje Y estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje Y en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje Y en blanco para ocultarlos
      },
      data: [
        {
          type: "spline",
          xValueFormatString: "DD/MM/YYYY",
          dataPoints: sortedDataPoints,
        },
      ],
    };

    if (this.liquidatedCasesChart) {
      this.liquidatedCasesChart.options = this.liquidatedCases;
      this.liquidatedCasesChart.render();
    }
  }

  getChart4Instance(chartInstance: any): void {
    this.chart4 = chartInstance;
    this.prepareDataForDoughnutChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForDoughnutChart(): void {
    // Suma total de todos los valores acumulados normalizados
    const totalNormalized = Object.values(this.jsonLiquidateDataByRamo).reduce(
      (sum, value) => sum + value.length,
      0
    );
    console.log(totalNormalized);

    const dataPoints = Object.keys(this.jsonLiquidateDataByRamo).map(
      (sucursal: any) => {
        const percentage =
          (this.jsonLiquidateDataByRamo[sucursal].length / totalNormalized) *
          100;

        return {
          label: `${sucursal} (${percentage.toFixed(2)}%)`,
          y: this.jsonLiquidateDataByRamo[sucursal].length,
          toolTipContent: `${sucursal} (${this.jsonLiquidateDataByRamo[sucursal].length})`,
        };
      }
    );

    //console.log(dataPoints);

    this.chartOptions4 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "# Casos X Ramo",
      },
      data: [
        {
          type: "doughnut",
          innerRadius: "50%",
          dataPoints: dataPoints,
        },
      ],
      
    };

    if (this.chart4) {
      this.chart4.options = this.chartOptions4;
      this.chart4.render();
    }
  }

  getChartInstance5(chartInstance: any): void {
    this.chart5 = chartInstance;
    this.prepareDataForBarChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChart(): void {
    // Convertir el objeto a un array de [clave, valor]
    const entries = Object.entries(this.jsonCasesByEjecutivoSiniestros);

    // Ordenar el array de entradas en función de la longitud de los arrays (número de casos)
    entries.sort(([, casosA], [, casosB]) => casosB.length - casosA.length);

    // Construir el nuevo objeto ordenado
    const orderedJsonCasesByEjecutivoSiniestros = Object.fromEntries(entries);

    // Convertir el objeto a un array de [clave, valor]
    const entries2 = Object.entries(orderedJsonCasesByEjecutivoSiniestros);

    // Calcular el total de casos
    const totalCasos = entries2.reduce(
      (sum, [, casos]) => sum + casos.length,
      0
    );

    // Mapear sobre las entradas y construir dataPoints
    const dataPoints = entries2.map(([nombreEjecutivo, casos]) => {
      const porcentaje = (casos.length / totalCasos) * 100;

      return {
        label: nombreEjecutivo,
        y: casos.length,
        indexLabel: "{y}",
        toolTipContent: `${nombreEjecutivo} (${porcentaje.toFixed(2)}%)`,
      };
    });

    this.chartOptions5 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "# Casos x Ejecutivo",
      },
      axisY: {
        title: "No. de Casos",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      axisX: {
        title: "Ejecutivo",
        labelFormatter: function () {
          return ""; // Función para ocultar las etiquetas del eje X
        },
      },
      data: [
        {
          type: "column",
          dataPoints: dataPoints,
          indexLabelPlacement: "outside", // Coloca las etiquetas fuera de las columnas
          indexLabelOrientation: "horizontal", // Orientación horizontal de las etiquetas
        },
      ],
    };

    if (this.chart5) {
      this.chart5.options = this.chartOptions5;
      this.chart5.render();
    }
  }

  getChartInstance6(chartInstance: any): void {
    this.chart6 = chartInstance;
    this.prepareDataForBarChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChartApilada(): void {
    // Convertir el objeto a un array de [clave, valor]
    const entries = Object.entries(this.jsonCasesByEjecutivoSiniestros);

    // Ordenar el array de entradas en función de la longitud de los arrays (número de casos)
    entries.sort(([, casosA], [, casosB]) => casosB.length - casosA.length);

    // Construir el nuevo objeto ordenado
    const orderedJsonCasesByEjecutivoSiniestros = Object.fromEntries(entries);

    // Convertir el objeto a un array de [clave, valor]
    const entries2 = Object.entries(orderedJsonCasesByEjecutivoSiniestros);

    // Calcular el total de casos
    const totalCasos = entries2.reduce(
      (sum, [, casos]) => sum + casos.length,
      0
    );

    const dataPoints = entries2.map(([nombreEjecutivo, casos]) => {
      const porcentaje = (casos.length / totalCasos) * 100;
    
      return {
        label: nombreEjecutivo,
        y: casos.length,
        indexLabel: "{y}",
        toolTipContent: `${nombreEjecutivo} (${porcentaje.toFixed(2)}%)`,
      };
    });


    const totalNormalized = Object.values(
      this.jsonLiquidateDateByEjecutivoSiniestros
    ).reduce((sum, value) => sum + value.length, 0);

    const dataPoints2 = Object.keys(this.jsonLiquidateDateByEjecutivoSiniestros)
  .map((ejecutivoSiniestros: any) => {
    const percentage =
      (this.jsonLiquidateDateByEjecutivoSiniestros[ejecutivoSiniestros].length /
        totalNormalized) *
      100;
    return {
      label: ejecutivoSiniestros,
      y: this.jsonLiquidateDateByEjecutivoSiniestros[ejecutivoSiniestros]
        .length,
      indexLabel: "{y}", // Muestra la cantidad de casos en la barra,
      toolTipContent: `${ejecutivoSiniestros} (${percentage.toFixed(2)}%)`,
    };
  })
  .sort((a, b) => b.y - a.y) // Ordena de mayor a menor cantidad de elementos
  .sort((a, b) => a.y - b.y); // Ordena de menor a mayor cantidad de elementos


  // Obtén un conjunto único de etiquetas (ejecutivos) para ambos conjuntos de datos
const uniqueLabels = new Set([
  ...dataPoints.map((data) => data.label),
  ...dataPoints2.map((data) => data.label),
]);

// Reorganiza ambos conjuntos de datos para que compartan las mismas etiquetas
const alignedDataPoints = Array.from(uniqueLabels).map((label) => {
  const data1:any = dataPoints.find((data) => data.label === label) || { y: 0 };
  const data2:any = dataPoints2.find((data) => data.label === label) || { y: 0 };

  return {
    label: label,
    y1: data1.y,
    y2: data2.y,
    indexLabel1: data1.indexLabel,
    indexLabel2: data2.indexLabel,
    toolTipContent1: data1.toolTipContent,
    toolTipContent2: data2.toolTipContent,
  };
});




    this.chartOptions6 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "# Casos x Ejecutivo",
      },
      axisY: {
        title: "No. de Casos",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      axisX: {
        title: "Ejecutivo",
        labelFormatter: function () {
          return ""; // Función para ocultar las etiquetas del eje X
        },
      },
      data: [
        {
          type: "bar",
          showInLegend: true,
          legendText: "Total Casos",
          dataPoints: alignedDataPoints.map((data) => ({
            label: data.label,
            y: data.y1,
            indexLabel: data.indexLabel1,
            toolTipContent: data.toolTipContent1,
          })),
          // ...
        },
        {
          type: "bar",
          axisYType: "secondary",
          showInLegend: true,
          legendText: "Casos Liquidados",
          dataPoints: alignedDataPoints.map((data) => ({
            label: data.label,
            y: data.y2,
            indexLabel: data.indexLabel2,
            toolTipContent: data.toolTipContent2,
          })),
          // ...
        },
      ],
    };

    if (this.chart6) {
      this.chart6.options = this.chartOptions6;
      this.chart6.render();
    }
  }



  getChartInstanceForAmountInReserve(chartInstance: any): void {
    this.amountInReserveChart = chartInstance;
    this.prepareDataForAmountInReserve(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForAmountInReserve(): void {
    // Calcular el total en reserva para todos los casos
    this.amountInReserveNumber = this.jsonData.reduce((acc, item) => {
      const valorReserva = parseFloat(item[' Valor Reserva ']);
      if (!isNaN(valorReserva)) { // Asegurar que valorReserva sea un número válido
        return acc + valorReserva;
      }
      return acc;
    }, 0);

    // Redondear a 2 decimales
    this.amountInReserveNumber = parseFloat(this.amountInReserveNumber.toFixed(0));

    // Preparar datos para el gráfico
    const dataByFechaReserva = this.jsonData.reduce((acc, item) => {
      const fechaParts = item['Fecha de Aviso'].split("/");
      if (fechaParts.length === 3) {
        const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);
        const fechaKey = fecha.toISOString().split('T')[0];
        const valorReserva = parseFloat(item[' Valor Reserva ']);
        if (!isNaN(valorReserva)) {
          acc[fechaKey] = (acc[fechaKey] || 0) + valorReserva;
        }
      }
      return acc;
    }, {});

    const sortedDataPoints = Object.entries(dataByFechaReserva)
      .map(([fecha, valorReserva]) => ({ x: new Date(fecha), y: valorReserva }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.amountInReserve = {
      animationEnabled: true,
      axisX: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje X en blanco para ocultarlas
        },
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje X en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje X estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje X en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje X en blanco para ocultarlos
      },
      axisY: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje Y en blanco para ocultarlas
        },
        suffix: "",
        stripLines: [],
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje Y en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje Y estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje Y en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje Y en blanco para ocultarlos
      },
      data: [{
        type: "spline",
        xValueFormatString: "DD/MM/YYYY",
        yValueFormatString: "#,###.##'$'",
        dataPoints: sortedDataPoints
      }]
    };

    if (this.amountInReserveChart) {
      this.amountInReserveChart.options = this.amountInReserve;
      this.amountInReserveChart.render();
    }
  }


  getChartInstanceForTotalCases(chartInstance: any): void {
    this.totalCasesChart = chartInstance;
    this.prepareDataForTotalCases(); // Llamar a esto después de obtener la instancia
  }


  prepareDataForTotalCases(): void {
    // Acumular casos por 'Fecha de Aviso'
    const dataByFechaAviso = this.jsonData.reduce((acc, item) => {
      const fechaParts = item['Fecha de Aviso'].split("/");
      if (fechaParts.length === 3) {
        // Convertir DD/MM/YYYY a MM/DD/YYYY para crear el objeto Date correctamente
        const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);
        const fechaKey = fecha.toISOString().split('T')[0]; // Convertir a formato YYYY-MM-DD para agrupar
        acc[fechaKey] = (acc[fechaKey] || 0) + 1; // Sumar 1 por cada caso
      }
      return acc;
    }, {});
    // Ordenar los datos por fecha
    const sortedDataPoints = Object.entries(dataByFechaAviso)
      .map(([fecha, count]) => ({ x: new Date(fecha), y: count }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.totalCases = {
      animationEnabled: true,
      axisX: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje X en blanco para ocultarlas
        },
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje X en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje X estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje X en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje X en blanco para ocultarlos
      },
      axisY: {
        title: null,
        labelFormatter: function () {
          return " "; // Establece las etiquetas del eje Y en blanco para ocultarlas
        },
        suffix: "",
        stripLines: [],
        gridThickness: 0, // Establece el grosor de la cuadrícula del eje Y en 0 para ocultarla
        lineColor: "white", // Oculta la línea del eje Y estableciéndola en blanco
        tickLength: 0, // Establece la longitud de los ticks del eje Y en 0 para ocultarlos
        tickColor: "white", // Establece el color de los ticks del eje Y en blanco para ocultarlos
      },
      data: [{
        type: "spline",
        xValueFormatString: "DD/MM/YYYY",
        dataPoints: sortedDataPoints
      }]
    };
    // Calcular el número total de casos
    this.totalCasesNumber = this.jsonData.length;
    if (this.totalCasesChart) {
      this.totalCasesChart.options = this.totalCases;
      this.totalCasesChart.render();
    }
  }

  goHome(){
    this.router.navigate(["example_poc"]);
  }

  goLiquidates(){
    this.router.navigate(["state_cases"]);
  }

  goEjecutivos(){
    this.router.navigate(["ejecutivos_cases"]);
  }

  


  handleClick(event: Event) {
    this.chart.options = this.newVSReturningVisitorsOptions;
    this.chart.options.data = this.chartOptions2["New vs Returning Visitors"];
    this.chart.render();
    this.isButtonVisible = false;
  }
}
