import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentData } from '../example-poc/payment_data.interface';

@Component({
  selector: 'app-state-cases',
  templateUrl: './state-cases.component.html',
  styleUrls: ['./state-cases.component.css']
})
export class StateCasesComponent implements OnInit {

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

  chartOptions1: any;

  chartOptions4: any;
  chartOptions5: any;
  chartOptions6: any;

  jsonData: any[] = [];
  jsonLiquidateData: any[] = [];
  jsonLiquidateDataByPuntoServicio: any[] = [];
  jsonLiquidateDataByBroker: any[] = [];
  jsonLiquidateDateByEjecutivoSiniestros: any[] = [];

  jsonFields: string[] = [];
  selectedFields: Set<string> = new Set();
  axisSelection: { [key: string]: "x" | "y" } = {};

  xAxisFields: string[] = [];
  yAxisFields: string[] = [];
  chart1: any;

  chart4: any;
  chart5: any;
  chart6: any;

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


  //CASOS LUQUIDADOS 2
  liquidatedCasesNumber2: number = 0;
  liquidatedCases2: any;
  liquidatedCasesChart2: any;

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http
      .get<PaymentData[]>("assets/tableConvert.com_0qevpc.json")
      .subscribe((data) => {
        this.jsonData = data;
        this.jsonLiquidateData = data.filter(
          (item:any) => item["Estado Aviso"] === "Liquidado"
        );
        this.jsonLiquidateDataByPuntoServicio = this.jsonLiquidateData.reduce(
          (acc, item) => {
            const sucursal = item["Sucursal Póliza"];
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

        this.jsonLiquidateDataByBroker = this.jsonLiquidateData.reduce(
          (acc, item) => {
            const sucursal = item["Broker"] || "SIN BROKER";

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

        console.log(data);
        console.log(this.jsonLiquidateData);
        console.log(this.jsonLiquidateDataByPuntoServicio);
        console.log(this.jsonLiquidateDataByBroker);
        console.log(this.jsonLiquidateDateByEjecutivoSiniestros);

        this.jsonFields = Object.keys(data[0]);
        this.xAxisFields = this.jsonFields;
        this.yAxisFields = this.jsonFields;

        this.selectedFields.add("Ramo");
        this.selectedFields.add("Valor Pago");

        this.axisSelection["Ramo"] = "x";
        this.axisSelection["Valor Pago"] = "y";

        this.prepareDataForBarChart();

        this.prepareDataForDoughnutChart();

        this.prepareDataForBarChartLiqByBroker();
        this.prepareDataForBarChartLineChart();

        this.prepareDataForTotalPayment();
        this.prepareDataForLiquidatedCases();
        this.prepareDataForLiquidatedCases2();

      });
  }

  getChart1Instance(chartInstance: any): void {
    this.chart1 = chartInstance;
    this.prepareDataForBarChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChart(): void {
    // Conjunto de datos original (sin normalizar)
    const originalDataByRamo = this.jsonData.reduce<{ [key: string]: number }>(
      (acc, item) => {
        if (item.Ramo && item[" Valor Reserva "]) {
          acc[item.Ramo] =
            (acc[item.Ramo] || 0) + parseFloat(item[" Valor Reserva "]);
        }
        return acc;
      },
      {}
    );
    

    //console.log(originalDataByRamo);

    // Encuentra el valor máximo y mínimo de 'Valor Reserva' en el conjunto original
    const maxOriginalValorReserva = Math.max(
      ...Object.values(originalDataByRamo)
    );
    const minOriginalValorReserva = Math.min(
      ...Object.values(originalDataByRamo)
    );

    // Normaliza los valores acumulados
    const normalizedDataByRamo = this.jsonData.reduce<{
      [key: string]: number;
    }>((acc, item) => {
      if (item.Ramo && item[" Valor Reserva "]) {
        const normalizedValue =
          (parseFloat(item[" Valor Reserva "]) - minOriginalValorReserva) /
          (maxOriginalValorReserva - minOriginalValorReserva);
        acc[item.Ramo] = (acc[item.Ramo] || 0) + normalizedValue;
      }
      return acc;
    }, {});

    // Ordena los datos normalizados de forma descendente
    const sortedResults = Object.entries(normalizedDataByRamo)
    .sort(([, valueA], [, valueB]) => valueB - valueA);

    // Suma total de todos los valores acumulados normalizados
    const totalNormalized = Object.values(normalizedDataByRamo).reduce(
      (sum, value) => sum + value,
      0
    );

    // Crea dataPoints con valores en porcentajes y valores originales después de ordenar
const dataPoints = sortedResults.map(([ramo, normalizedValue]) => {
  const originalValue = Math.trunc(originalDataByRamo[ramo]);
  const percentage = (normalizedValue / totalNormalized) * 100;

  return {
    label: ramo,
    y: originalValue,
    indexLabel: percentage.toFixed(2) + '%'
  };
});

    this.chartOptions1 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Liquidados por Ramo",
      },
      axisY: {
        title: "Valor de Liquidados",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      axisX: {
        title: "Ramo",
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

    if (this.chart1) {
      this.chart1.options = this.chartOptions1;
      this.chart1.render();
    }
  }

  

  getChart4Instance(chartInstance: any): void {
    this.chart4 = chartInstance;
    this.prepareDataForDoughnutChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForDoughnutChart(): void {
    //console.log(this.jsonLiquidateDataByPuntoServicio);

    //{ y: 28, name: "Labour" },
    // const dataPoints = Object.entries(this.jsonLiquidateDataByPuntoServicio).map(([estado, count]) => {
    //   return { label: estado, y: count };
    // });

    // Obtener el total de elementos agrupados para cada sucursal y maquetarlo

     // Suma total de todos los valores acumulados normalizados
     const totalNormalized = Object.values(this.jsonLiquidateDataByPuntoServicio).reduce(
      (sum, value) => sum + value.length,
      0
    );
    console.log(totalNormalized);

    const dataPoints = Object.keys(this.jsonLiquidateDataByPuntoServicio).map((sucursal: any) => {
      const percentage = (this.jsonLiquidateDataByPuntoServicio[sucursal].length / totalNormalized) * 100;
    
      return {
        label: `${sucursal} (${percentage.toFixed(2)}%)`,
        y: this.jsonLiquidateDataByPuntoServicio[sucursal].length,
        toolTipContent: `${sucursal} (${this.jsonLiquidateDataByPuntoServicio[sucursal].length})`,
      };
    });
    

    //console.log(dataPoints);

    this.chartOptions4 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Agencias por # Liquidados",
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

  getChart5Instance(chartInstance: any): void {
    this.chart5 = chartInstance;
    this.prepareDataForBarChartLiqByBroker(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChartLiqByBroker(): void {


    const totalNormalized = Object.values(this.jsonLiquidateDataByBroker).reduce(
      (sum, value) => sum + value.length,
      0
    );
    // Función para obtener las iniciales de un nombre
    function getInitials(name: string) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
    }

    // Obtener el total de elementos agrupados para cada sucursal y maquetarlo
    const dataPoints = Object.keys(this.jsonLiquidateDataByBroker)
      .map((broker: any) => {
        const percentage = (this.jsonLiquidateDataByBroker[broker].length / totalNormalized) * 100;
        return {
          label: getInitials(broker),
          y: this.jsonLiquidateDataByBroker[broker].length,
          indexLabel: "{y}", // Muestra la cantidad de casos en la barra,
          toolTipContent: `${broker} (${percentage.toFixed(2)}%)`,
        };
      })
      .sort((a, b) => b.y - a.y) // Ordena de mayor a menor cantidad de elementos
      .slice(0, 10) // Selecciona los primeros 10 elementos
      .sort((a, b) => a.y - b.y); // Ordena de menor a mayor cantidad de elementos

    this.chartOptions5 = {
      theme: "light2",
      title: {
        text: "Top 10 Liquidados X Contratante",
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

    if (this.chart5) {
      this.chart5.options = this.chartOptions5;
      this.chart5.render();
    }
  }

  getChart6Instance(chartInstance: any): void {
    this.chart6 = chartInstance;
    this.prepareDataForBarChartLineChart(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForBarChartLineChart(): void {
    // Función para obtener las iniciales de un nombre
    function getInitials(name: string) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
    }

    // Obtener el total de elementos agrupados para cada sucursal y maquetarlo
    const dataPoints = Object.keys(this.jsonLiquidateDataByBroker)
      .map((brokerName: any) => {
        const brokerData = this.jsonLiquidateDataByBroker[brokerName];
        //console.log(brokerData);
        const broker = brokerData[0]; // Suponiendo que el brokerData es una matriz y quieres acceder al primer elemento
        return {
          x: broker["Fecha Paso"], // Accede a 'Fecha Paso' dentro del objeto broker
          label: getInitials(brokerName),
          y: brokerData.length,
          indexLabel: "{y}",
          toolTipContent: brokerName,
        };
      })
      .sort((a, b) => b.y - a.y) // Ordena de mayor a menor cantidad de elementos
      .slice(0, 10) // Selecciona los primeros 10 elementos
      .sort((a, b) => a.y - b.y);
    // Ordena de menor a mayor cantidad de elementos

    console.log(dataPoints);

    this.chartOptions6 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Site Traffic",
      },
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        title: "Number of Visits",
        crosshair: {
          enabled: true,
        },
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        dockInsidePlotArea: true,
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === "undefined" ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: "line",
          showInLegend: true,
          name: "Total Visit",
          lineDashType: "dash",
          markerType: "square",
          xValueFormatString: "DD MMM, YYYY",
          dataPoints: [
            { x: new Date(2022, 0, 3), y: 650 },
            { x: new Date(2022, 0, 4), y: 700 },
            { x: new Date(2022, 0, 5), y: 710 },
            { x: new Date(2022, 0, 6), y: 658 },
            { x: new Date(2022, 0, 7), y: 734 },
            { x: new Date(2022, 0, 8), y: 963 },
            { x: new Date(2022, 0, 9), y: 847 },
            { x: new Date(2022, 0, 10), y: 853 },
            { x: new Date(2022, 0, 11), y: 869 },
            { x: new Date(2022, 0, 12), y: 943 },
            { x: new Date(2022, 0, 13), y: 970 },
            { x: new Date(2022, 0, 14), y: 869 },
            { x: new Date(2022, 0, 15), y: 890 },
            { x: new Date(2022, 0, 16), y: 930 },
          ],
        },
        {
          type: "line",
          showInLegend: true,
          name: "Unique Visit",
          lineDashType: "dot",
          dataPoints: [
            { x: new Date(2022, 0, 3), y: 510 },
            { x: new Date(2022, 0, 4), y: 560 },
            { x: new Date(2022, 0, 5), y: 540 },
            { x: new Date(2022, 0, 6), y: 558 },
            { x: new Date(2022, 0, 7), y: 544 },
            { x: new Date(2022, 0, 8), y: 693 },
            { x: new Date(2022, 0, 9), y: 657 },
            { x: new Date(2022, 0, 10), y: 663 },
            { x: new Date(2022, 0, 11), y: 639 },
            { x: new Date(2022, 0, 12), y: 673 },
            { x: new Date(2022, 0, 13), y: 660 },
            { x: new Date(2022, 0, 14), y: 562 },
            { x: new Date(2022, 0, 15), y: 643 },
            { x: new Date(2022, 0, 16), y: 570 },
          ],
        },
      ],
    };

    if (this.chart6) {
      this.chart6.options = this.chartOptions6;
      this.chart6.render();
    }
  }



  getChartInstanceForTotalPayment(chartInstance: any): void {
    this.totalPaymentChart = chartInstance;
    this.prepareDataForTotalPayment(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForTotalPayment(): void {
    // Acumular pagos por 'Fecha de Pago'
    const dataByFechaPago = this.jsonData.reduce((acc, item) => {
      if (item['Estado Aviso'] === 'Liquidado') {
        const fechaParts = item['Fecha de Aviso'].split("/");
        if (fechaParts.length === 3) {
          const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);
          const fechaKey = fecha.toISOString().split('T')[0];
          const valorPago = parseFloat(item[' Valor Reserva ']);
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
      data: [{
        type: "spline",
        xValueFormatString: "DD/MM/YYYY",
        yValueFormatString: "#,###.##'$'",
        dataPoints: sortedDataPoints
      }]
    };
    // Calcular el número total de pagos
    this.totalPaymentNumber = this.jsonData.reduce((acc, item) => {
      if (item['Estado Aviso'] === 'Liquidado') {
        const valorPago = parseFloat(item[' Valor Reserva ']);
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
    this.liquidatedCasesNumber = this.jsonData.filter(item => item['Estado Aviso'] === 'Liquidado').length;

    // Preparar datos para el gráfico (si es necesario)
    const dataByFechaLiquidacion = this.jsonData.reduce((acc, item) => {
      if (item['Estado Aviso'] === 'Liquidado') {
        const fechaParts = item['Fecha de Aviso'].split("/");
        if (fechaParts.length === 3) {
          const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);
          const fechaKey = fecha.toISOString().split('T')[0];
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
      data: [{
        type: "spline",
        xValueFormatString: "DD/MM/YYYY",
        dataPoints: sortedDataPoints
      }]
    };

    if (this.liquidatedCasesChart) {
      this.liquidatedCasesChart.options = this.liquidatedCases;
      this.liquidatedCasesChart.render();
    }
  }


  getChartInstanceForLiquidatedCases2(chartInstance: any): void {
    this.liquidatedCasesChart2 = chartInstance;
    this.prepareDataForLiquidatedCases2(); // Llamar a esto después de obtener la instancia
  }

  prepareDataForLiquidatedCases2(): void {
    // Filtrar casos con 'Estado Aviso' igual a 'Liquidado' y contarlos
    this.liquidatedCasesNumber = this.jsonData.filter(item => item['Estado Aviso'] === 'Liquidado').length;

    // Preparar datos para el gráfico (si es necesario)
    const dataByFechaLiquidacion = this.jsonData.reduce((acc, item) => {
      if (item['Estado Aviso'] === 'Liquidado') {
        const fechaParts = item['Fecha de Aviso'].split("/");
        if (fechaParts.length === 3) {
          const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);
          const fechaKey = fecha.toISOString().split('T')[0];
          acc[fechaKey] = (acc[fechaKey] || 0) + 1;
        }
      }
      return acc;
    }, {});

    const sortedDataPoints = Object.entries(dataByFechaLiquidacion)
      .map(([fecha, count]) => ({ x: new Date(fecha), y: count }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.liquidatedCases2 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "# Casos Liquidados X Fecha",
      },
      axisX: {
        title: "Fecha",
      },
      axisY: {
        title: "No. Casos",
      },
      data: [{
        type: "spline",
        xValueFormatString: "DD/MM/YYYY",
        dataPoints: sortedDataPoints
      }]
    };

    if (this.liquidatedCasesChart2) {
      this.liquidatedCasesChart2.options = this.liquidatedCases2;
      this.liquidatedCasesChart2.render();
    }
  }

}
