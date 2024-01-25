import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentData } from './payment_data.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-poc',
  templateUrl: './example-poc.component.html',
  styleUrls: ['./example-poc.component.css'],
})
export class ExamplePocComponent implements OnInit {

  chartOptions1: any;
  chartOptions2: any;
  chartOptions3: any;
  jsonData: any[] = [];
  jsonFields: string[] = [];
  selectedFields: Set<string> = new Set();
  axisSelection: { [key: string]: 'x' | 'y' } = {};

  xAxisFields: string[] = [];
  yAxisFields: string[] = [];
  chart1: any;
  chart2: any;
  chart3: any;

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

  // profundidad
  drilldownDataEstados: any = {};
  chartDataEstado: any = {};
  drilldownLevel: number = 0;
  showDrilldown: boolean = false;

  constructor(private http: HttpClient, private router: Router) {

  }

  prepareDrilldownData(): void {
    this.jsonData.forEach(item => {
      const estado = item['Estado Aviso'];
      const ramo = item.Ramo;

      if (!this.drilldownDataEstados[estado]) {
        this.drilldownDataEstados[estado] = {};
      }

      if (!this.drilldownDataEstados[estado][ramo]) {
        this.drilldownDataEstados[estado][ramo] = 0;
      }

      this.drilldownDataEstados[estado][ramo]++;
    });
  }

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

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<PaymentData[]>('assets/tableConvert.com_0qevpc.json').subscribe(data => {
      this.jsonData = data;
      console.log(data);
      this.jsonFields = Object.keys(data[0]);
      this.xAxisFields = this.jsonFields;
      this.yAxisFields = this.jsonFields;

      this.selectedFields.add('Ramo');
      this.selectedFields.add('Valor Pago');

      this.axisSelection['Ramo'] = 'x';
      this.axisSelection['Valor Pago'] = 'y';

      this.prepareDataForBarChart();

      this.prepareDataForDoughnutChart();

      this.prepareDataForLineChart();

      this.prepareDataForTotalCases();

      this.prepareDataForTotalPayment();

      this.prepareDataForLiquidatedCases();

      this.prepareDataForAmountInReserve();

      this.prepareDataForTotalCasesByPeriod();

      this.prepareDrilldownData(); // Llama a este método después de cargar los datos

    });
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

  prepareDataForBarChart(): void {
    // Inicializar un objeto para almacenar los datos por ramo y estado
    const dataByEstadoAndRamo: { [estado: string]: { [ramo: string]: number } } = {};

    // Agrupar los casos por estado y ramo
    this.jsonData.forEach(item => {
      const ramo = item.Ramo;
      const estado = item['Estado Aviso'];

      // Inicializar el objeto para un estado si aún no existe
      if (!dataByEstadoAndRamo[estado]) {
        dataByEstadoAndRamo[estado] = {};
      }

      // Inicializar el contador para un ramo si aún no existe
      if (!dataByEstadoAndRamo[estado][ramo]) {
        dataByEstadoAndRamo[estado][ramo] = 0;
      }

      // Incrementar el contador para el estado y el ramo
      dataByEstadoAndRamo[estado][ramo]++;
    });

    // Convertir los datos en un formato adecuado para el gráfico de columnas apiladas
    const dataSeries = Object.keys(dataByEstadoAndRamo).map(estado => {
      const dataPoints = Object.keys(dataByEstadoAndRamo[estado]).map(ramo => {
        return { label: ramo, y: dataByEstadoAndRamo[estado][ramo] };
      });

      return { type: "stackedColumn", name: estado, showInLegend: true, dataPoints };
    });

    let maxValue = 0;
    dataSeries.forEach(series => {
      series.dataPoints.forEach(point => {
        if (point.y > maxValue) {
          maxValue = point.y;
        }
      });
    });

    // Configurar las opciones del gráfico
    this.chartOptions1 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Cantidad de Casos por Estado y Ramo"
      },
      axisY: {
        title: "Cantidad de Casos",
        includeZero: true,
        logarithmic: true, // si quieres seguir utilizando una escala logarítmica
        maximum: maxValue + 1000,
      },
      axisX: {
        title: "Ramo",
        interval: 1,
        labelFormatter: function () {
          return ""; // Esto ocultará las etiquetas del eje X
        }
      },
      legend: {
        verticalAlign: "center", // Alinea la leyenda verticalmente en el centro
        horizontalAlign: "right" // Alinea la leyenda horizontalmente a la derecha
      },
      toolTip: {
        shared: true,
      },
      data: dataSeries
    };

    // Renderizar el gráfico si la instancia ya existe
    if (this.chart1) {
      this.chart1.options = this.chartOptions1;
      this.chart1.render();
    }
  }

  getChartInstanceForAmountInReserve(chartInstance: any): void {
    this.amountInReserveChart = chartInstance;
    this.prepareDataForAmountInReserve(); // Llamar a esto después de obtener la instancia
  }

  getChartInstanceForLiquidatedCases(chartInstance: any): void {
    this.liquidatedCasesChart = chartInstance;
    this.prepareDataForLiquidatedCases(); // Llamar a esto después de obtener la instancia
  }

  getChartInstanceForTotalPayment(chartInstance: any): void {
    this.totalPaymentChart = chartInstance;
    this.prepareDataForTotalPayment(); // Llamar a esto después de obtener la instancia
  }

  getChartInstanceForTotalCases(chartInstance: any): void {
    this.totalCasesChart = chartInstance;
    this.prepareDataForTotalCases(); // Llamar a esto después de obtener la instancia
  }

  getChartInstanceForTotalCasesByPeriod(chartInstance: any): void {
    this.totalCasesByPeriodChart = chartInstance;
    this.prepareDataForTotalCasesByPeriod(); // Llamar a esto después de obtener la instancia
  }


  getChart1Instance(chartInstance: any): void {
    this.chart1 = chartInstance;
    this.prepareDataForBarChart(); // Llamar a esto después de obtener la instancia
  }

  getChart2Instance(chartInstance: any): void {
    this.chart2 = chartInstance;
    this.prepareDataForDoughnutChart(); // Llamar a esto después de obtener la instancia
  }

  getChart3Instance(chartInstance: any): void {
    this.chart3 = chartInstance;
    this.prepareDataForLineChart(); // Llamar a esto después de obtener la instancia
  }


  prepareDataForDoughnutChart(): void {
    // Acumular por 'Estado' para cada 'Broker'
    const dataByEstado = this.jsonData.reduce((acc, item) => {
      const estado = item['Estado Aviso'];
      if (estado) {
        acc[estado] = (acc[estado] || 0) + 1;
      }
      return acc;
    }, {});

    const totalCases = Object.values(dataByEstado).reduce((sum: any, num: any) => sum + num, 0) as number;

    const dataPoints = Object.entries(dataByEstado).map(([estado, count]) => {
      const percentage = (((count as number) / totalCases) * 100).toFixed(2); // Calcula el porcentaje
      return { label: estado, y: count, indexLabel: estado, toolTipContent: `${estado}: {y} (${percentage}%)` };
    });

    this.chartOptions2 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Cantidad Estado Aviso"
      },
      data: [{

        type: "doughnut",
        radius: "100%", // Haz el gráfico más grande
        innerRadius: "50%", // Haz el radio del "donut hole" más pequeño para que el gráfico sea más grande
        indexLabelFontSize: 12, // Ajusta el tamaño de la fuente de la etiqueta según sea necesario
        indexLabel: "{label}: {y} ({indexLabel})", // Muestra el porcentaje en la etiqueta
        dataPoints: dataPoints
      }]
    };

    if (this.chart2) {
      this.chart2.options = this.chartOptions2;
      this.chart2.render();
    }

    this.chartOptions2.data[0].click = (e: any) => {
      this.showDrilldownChart(e.dataPoint.label);
    };
  }

  showDrilldownChart(estado: string): void {
    // Asegúrate de que existan datos para el estado seleccionado
    if (!this.drilldownDataEstados[estado]) {
      console.error(`No se encontraron datos para el estado: ${estado}`);
      return;
    }

    const dataPoints = Object.keys(this.drilldownDataEstados[estado]).map(ramo => {
      return { label: ramo, y: this.drilldownDataEstados[estado][ramo] };
    });

    this.chartDataEstado = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: `Cantidad de Casos por Ramo (${estado})`
      },
      axisY: {
        title: "Cantidad de Casos",
        includeZero: true,
        logarithmic: true,
      },
      axisX: {
        title: "Ramo",
        interval: 1,
      },
      data: [{
        type: "column",
        dataPoints: dataPoints,
        indexLabel: "{y}" // Muestra la cantidad de casos en la barra
      }]
    };

    if (this.chart2) {
      this.showDrilldown = true;
      this.drilldownLevel = 1;
      this.chart2.options = this.chartDataEstado;
      this.chart2.render();
    }

    this.chartDataEstado.data[0].click = (e: any) => {
      this.showBrokerChart(e.dataPoint.label, estado);
    };
  }

  showBrokerChart(ramo: string, estado: string): void {
    // Aquí debes preparar tus datos para los top 10 brokers de ese ramo y estado
    // Por ejemplo:
    const brokerData = this.prepareBrokerData(ramo, estado);

    const dataPoints = brokerData.map((broker: any) => {
      return { label: broker.name, y: broker.count };
    });

    const chartDataBroker = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: `Top 10 Brokers en ${ramo} (${estado})`
      },
      axisX: {
        title: "Broker",
        interval: 1,
        reversed: true, // Para barras horizontales
      },
      axisY: {
        title: "Cantidad de Casos",
        includeZero: true,
        logarithmic: true,
      },
      data: [{
        type: "bar", // Para barras horizontales
        dataPoints: dataPoints
      }]
    };

    if (this.chart2) {
      this.showDrilldown = true;
      this.drilldownLevel = 2;
      this.chart2.options = chartDataBroker;
      this.chart2.render();
    }
  }

  prepareBrokerData(ramo: string, estado: string) {
    // Agrupar los casos por broker
    const casesByBroker = this.jsonData.reduce((acc, item) => {
      if (item.Ramo === ramo && item['Estado Aviso'] === estado) {
        const broker = item.Broker;
        if (broker) {
          acc[broker] = (acc[broker] || 0) + 1; // Incrementar el contador para cada broker
        }
      }
      return acc;
    }, {});

    // Convertir el objeto en un array, ordenarlo por la cantidad de casos y tomar el TOP 10
    const sortedBrokers = Object.entries(casesByBroker)
      .map(([broker, count]) => ({
        name: getInitials(broker), // Obtener las iniciales si el nombre es muy largo
        count: count,
        y: count,
        indexLabel: "{y}", // Muestra la cantidad de casos en la barra
      }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10); // Tomar solo los primeros 10

    // Función para obtener las iniciales de un nombre
    function getInitials(name: string) {
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('');
    }



    return sortedBrokers;
  }


  backToMainChart(): void {
    if (this.chart2) {
      // validar el nivel de profundidad
      if (this.drilldownLevel === 1) {
        this.showDrilldown = false;
        this.drilldownLevel = 0;
        this.chart2.options = this.chartOptions2;
        this.chart2.render();
      } else if (this.drilldownLevel === 2) {
        this.showDrilldownChart(this.chartDataEstado.title.text.split('(')[1].split(')')[0]);
      }
    }
  }

  prepareDataForLineChart(): void {
    // Contar casos por contratante (Broker)
    const casesByBroker = this.jsonData.reduce((acc, item) => {
      const broker = item.Broker;
      if (broker) {
        acc[broker] = (acc[broker] || 0) + 1; // Incrementar el contador para cada broker
      }
      return acc;
    }, {});

    // Convertir el objeto en un array, ordenarlo por la cantidad de casos y tomar el TOP 10
    const sortedBrokers = Object.entries(casesByBroker)
      .map(([broker, count]) => ({
        label: getInitials(broker), // Obtener las iniciales si el nombre es muy largo
        y: count,
        indexLabel: "{y}", // Muestra la cantidad de casos en la barra
        toolTipContent: broker
      }))
      .sort((a: any, b: any) => b.y - a.y)
      .slice(0, 10); // Tomar solo los primeros 10

    // Función para obtener las iniciales de un nombre
    function getInitials(name: string) {
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('');
    }

    // Configuración del gráfico de barras
    this.chartOptions3 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Cantidad de Casos por Contratante (TOP 10)"
      },
      axisY: {
        title: "Cantidad de Casos",
        includeZero: true,
      },
      axisX: {
        title: "Contratante",
        interval: 1,
        reversed: true,
      },
      data: [{
        type: "bar",
        dataPoints: sortedBrokers,
        indexLabel: "{y}" // Muestra la cantidad de casos en la barra
      }]
    };

    // Renderizar el gráfico si la instancia ya existe
    if (this.chart3) {
      this.chart3.options = this.chartOptions3;
      this.chart3.render();
    }
  }

  prepareDataForTotalCasesByPeriod(): void {
    // Crear un objeto para agrupar los casos por ramo y por fecha
    const casesByRamoAndDate = this.jsonData.reduce((accumulator, current) => {
      // Asumiendo que 'Fecha de Aviso' está en formato DD/MM/YYYY
      const dateParts = current['Fecha de Aviso'].split('/');
      const dateKey = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convertir a formato YYYY-MM-DD

      if (!accumulator[current.Ramo]) {
        accumulator[current.Ramo] = {}; // Inicializar el objeto para este ramo
      }
      if (!accumulator[current.Ramo][dateKey]) {
        accumulator[current.Ramo][dateKey] = 0; // Inicializar el contador para esta fecha
      }
      accumulator[current.Ramo][dateKey] += 1; // Incrementar el contador

      return accumulator;
    }, {});

    // Convertir los datos agrupados en un array de series para el gráfico
    const series = Object.keys(casesByRamoAndDate).map(ramo => {
      // Convertir cada subobjeto de fechas en un array de puntos de datos
      const dataPoints = Object.keys(casesByRamoAndDate[ramo]).map(date => {
        return {
          x: new Date(date), // Convertir la fecha en un objeto Date
          y: casesByRamoAndDate[ramo][date], // El total de casos para esa fecha y ramo
        };
      });

      // Ordenar los puntos de datos por fecha
      dataPoints.sort((a: any, b: any) => a.x - b.x);

      return {
        type: "spline",
        name: ramo,
        showInLegend: false,
        dataPoints: dataPoints,
        markerType: "none", // Ocultar los marcadores de los puntos de datos
      };
    });

    // Configuración del gráfico de líneas múltiples
    this.totalCasesByPeriod = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Total de Casos (Comparativa) por Ramo",
      },
      axisX: {
        title: "Periodo",
        valueFormatString: "DD/MM/YYYY",
        interval: 1, // Ajusta según sea necesario para mejorar la distribución

      },
      axisY: {
        logarithmic: true, // Cambia a verdadero para una escala logarítmica
        title: "Cantidad de Casos",
        labelFontSize: 12, // Ajusta el tamaño de la fuente de las etiquetas del eje Y
        stripLines: [
          {
            value: 50,
            labelAlign: "near",
            showOnTop: true,
            color: "#d8d8d8",
            labelFontSize: 14,
            labelBackgroundColor: "white"
          }
        ],
      },
      toolTip: {
        shared: true,
      },
      data: series,
    };

    if (this.totalCasesByPeriodChart) {
      this.totalCasesByPeriodChart.options = this.totalCasesByPeriod;
      this.totalCasesByPeriodChart.render();
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

}
