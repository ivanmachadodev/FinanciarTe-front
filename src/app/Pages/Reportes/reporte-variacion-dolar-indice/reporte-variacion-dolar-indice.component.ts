import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { DolarIndice } from 'src/app/Models/dolar-indice';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';
import { ReportesService } from 'src/app/Services/reportes.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Colors, paletGraph1 } from 'src/app/Settings/colors';
import 'chartjs-adapter-moment';


@Component({
  selector: 'app-reporte-variacion-dolar-indice',
  templateUrl: './reporte-variacion-dolar-indice.component.html',
  styleUrls: ['./reporte-variacion-dolar-indice.component.css']
})
export class ReporteVariacionDolarIndiceComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  colores = paletGraph1
  form!: FormGroup;
  fechaDesde!: any;
  fechaHasta!: any;
  hFechas: any[] = [];
  hDolarOficial: number[] = [];
  hDolarBlue: number[] = [];
  hIndices: number[] = [];
  dolarIndice: DolarIndice[] = [];
  maxMinDolarIndice: DolarIndice[] = [];
  datos: ChartData = {
    labels: this.hFechas,
    datasets: [{
      type: 'bar',
      label: 'Dolar Oficial',
      data: this.hDolarOficial,
      borderColor: this.colores.mint,
      backgroundColor: this.colores.mint,
      yAxisID: 'y1'
    }, {
      type: 'bar',
      label: 'Dolar Blue',
      data: this.hDolarBlue,
      borderColor: this.colores.electricBlue,
      backgroundColor: this.colores.electricBlue,
      yAxisID: 'y1'
    }, {
      type: 'line',
      label: 'Indice FinanciarTe',
      data: this.hIndices,
      fill: false,
      borderColor: this.colores.selectiveYellow,
      pointBackgroundColor: this.colores.selectiveYellow,
      yAxisID: 'y2'
    }]
  }

  options: ChartOptions = {
    responsive: true,
    scales: {
      x:{
        type: 'time',
        time: {
          unit:'day', // or year, month, day of week, hour, minute, second
          displayFormats: {
            day: 'DD/MM/YYYY', // Formato para mostrar días
            month: 'MM/YYYY', // Formato para mostrar meses
            year: 'YYYY' // Formato para mostrar años
            // Puedes agregar otros formatos según tus necesidades
          },
          tooltipFormat: 'DD/MM/YYYY'
        }
      },
      y1: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {display: true, text: 'Precio Dolar Oficial - Blue'},
        ticks: {
          stepSize: 200
        }
      },
      y2: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
        title: {display: true, text: 'Indice Financiarte'}
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
  }

  private subscription: Subscription = new Subscription();

  constructor(private servicio: ReportesService, private router: Router, private formBuilder: FormBuilder,
    private params: ActivatedRoute, private nav: NavbarService){
    this.form = this.formBuilder.group({
      fechaDesde: [this.fechaDesde],
      fechaHasta: [this.fechaHasta],
    })
  }
  ngOnInit(): void {
    this.getDolarIndice();
    this.nav.show();
  }

  getDolarIndice(){
    this.subscription.add(
      this.servicio.GetValoresDolarIndice().subscribe({
        next: (data) => {this.dolarIndice = data, this.llenarArraysG1(this.dolarIndice), this.chart?.chart?.update()},
        error: (error) => {console.log(error)}
      })
    );
  }

  /*
  getMaxMinDolarIndice(){
    this.subscription.add(
      this.servicio.GetMaxMInDolarIndice().subscribe({
        next: (data) => {this.maxMinDolarIndice = data, this.llenarArraysG2(this.dolarIndice)},
        error: (error) => {console.log(error)}
      })
    );
  }
  */

  llenarArraysG1(datos: DolarIndice[]){
    for (let d of datos) {
      this.hFechas.push(new Date(d.fecha).toISOString().substring(0, 10));
      this.hDolarOficial.push(d.valorDolar);
      this.hDolarBlue.push(d.valorDolarBlue);
      this.hIndices.push(d.indice*100);
    }

    const primeraFecha = new Date(this.hFechas[this.hFechas.length - 21])
    const ultimaFecha = new Date(this.hFechas[this.hFechas.length - 1]);   

    this.fechaDesde = new Date(primeraFecha).toISOString().substring(0, 10);
    this.fechaHasta =  new Date(ultimaFecha).toISOString().substring(0, 10);

    this.filtrarFechas()

  }

  filtrarFechas(){
    const fechas = [...this.hFechas];
    const dolarOficial = [...this.hDolarOficial];
    const dolarBlue = [...this.hDolarBlue];
    const indice = [...this.hIndices];
    const inicio = this.form.get('fechaDesde')?.value ?? this.fechaDesde;
    const fin = this.form.get('fechaHasta')?.value ?? this.fechaHasta;

    const indexInicio = fechas.indexOf(inicio);
    const indexFin = fechas.indexOf(fin);

    const filterFechas = fechas.slice(indexInicio, indexFin + 1);
    const filterDolarOficial = dolarOficial.slice(indexInicio, indexFin + 1);
    const filterDolarBlue = dolarBlue.slice(indexInicio, indexFin + 1);
    const filterIndices = indice.slice(indexInicio, indexFin + 1);

    this.datos.labels = filterFechas;
    this.datos.datasets[0].data = filterDolarOficial;
    this.datos.datasets[1].data = filterDolarBlue;
    this.datos.datasets[2].data = filterIndices;
    
    this.chart.chart?.update();

  }

}
