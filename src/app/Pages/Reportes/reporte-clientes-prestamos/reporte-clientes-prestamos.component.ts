import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ResumenPrestamos } from 'src/app/Models/resumen-prestamos';
import { NavbarService } from 'src/app/Services/navbar.service';
import { ReportesService } from 'src/app/Services/reportes.service';
import { Colors, paletGraph1 } from 'src/app/Settings/colors';

@Component({
  selector: 'app-reporte-clientes-prestamos',
  templateUrl: './reporte-clientes-prestamos.component.html',
  styleUrls: ['./reporte-clientes-prestamos.component.css']
})
export class ReporteClientesPrestamosComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  colores = paletGraph1
  labels: string[] = [];
  qPrestamos: number[] = [];
  qCancelados: number[] = [];
  qPendientes: number[] = [];
  qRefinanciados: number[] = [];
  qCuotasVencidas: number[] = [];
  qTotalCuotas: number[] = [];
  qPorcCumplCuotas: number[] = [];
  clientes: ResumenPrestamos[] = [];
  datos: ChartData = {
    labels: this.labels,
    datasets: [{
      type: 'bar',
      label: 'Total Prestamos',
      data: this.qPrestamos,
      backgroundColor: this.colores.electricBlue
    },
    {
      type: 'bar',
      label: 'Cancelados',
      data: this.qCancelados,
      backgroundColor: this.colores.mint
    },
    {
      type: 'bar',
      label: 'Pendientes',
      data: this.qPendientes,
      backgroundColor: this.colores.selectiveYellow
    },
    {
      type: 'bar',
      label: 'Refinanciados',
      data: this.qRefinanciados,
      backgroundColor: this.colores.burntSienna
    },
    {
      type: 'line',
      label: '% Cumpl. Cuotas',
      data: this.qPorcCumplCuotas,
      backgroundColor: this.colores.yellowGreen,
      yAxisID: 'line'
    },]
  }

  options: ChartOptions = {
    plugins: {
      datalabels: {
          display: true,
          anchor: 'end',
          align: 'end',
          color: '#000',
          font: {
              weight: 'bold'
          }
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {display: true, text: 'Cantidad de Prestamos'},
        ticks: {
          stepSize: 5
        }
      },
      line: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
        title: {display: true, text: '% Cumplimiento de Cuotas'}
      }
    }
  }

  private subscription: Subscription = new Subscription();

  constructor(private servicio: ReportesService, private router: Router, private params: ActivatedRoute, private nav: NavbarService){

  }
  ngOnInit(): void {
    this.getRecaudacionMensual();
    this.nav.show();
  }

  getRecaudacionMensual(){
    this.subscription.add(
      this.servicio.GetResumenPrestamos().subscribe({
        next: (data) => {this.clientes = data, console.log(this.clientes),this.llenarArrays(this.clientes), this.chart?.chart?.update()},
        error: (error) => {console.log(error)}
      })
    );
  }

  llenarArrays(datos: ResumenPrestamos[]){
    for (let d of datos) {
      this.labels.push(d.nombre);
      this.qPrestamos.push(d.cantidadDePrestamos);
      this.qCancelados.push(d.prestamosCancelados);
      this.qPendientes.push(d.prestamosPendientes);
      this.qRefinanciados.push(d.prestamosRefinanciados);
      if(d.totalDeCuotas > 0){
        this.qPorcCumplCuotas.push(d.porcentajeCumplCuotas * 100)
      }
    }
  }

}
