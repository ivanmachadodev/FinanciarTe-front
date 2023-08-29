import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { RecaudacionMensual } from 'src/app/Models/recaudacion-mensual';
import { NavbarService } from 'src/app/Services/navbar.service';
import { ReportesService } from 'src/app/Services/reportes.service';
import { paletGraph1 } from 'src/app/Settings/colors';

@Component({
  selector: 'app-reporte-recaudacion-mensual',
  templateUrl: './reporte-recaudacion-mensual.component.html',
  styleUrls: ['./reporte-recaudacion-mensual.component.css']
})
export class ReporteRecaudacionMensualComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  colores = paletGraph1
  valores: number[] = [];
  recaudacionMensual: RecaudacionMensual[] = [];
  datos: ChartData = {
    labels: ['Recaudacion Real', 'Recaudacion Esperada'],
    datasets: [{
      type: 'bar',
      data: this.valores,
      borderColor: this.colores.mint,
      backgroundColor: [this.colores.mint, this.colores.burntSienna],
      yAxisID: 'y1'
    }]
  }

  options: ChartOptions = {
    plugins: {
      legend: {
          display: false,
          //backgroundcolor // Oculta la leyenda
      }
    },
    responsive: true,
    scales: {
      y1: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {display: true, text: 'Recaudación'},
        ticks: {
          stepSize: 20000
        }
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
      this.servicio.GetRecaudacionMensual().subscribe({
        next: (data) => {this.recaudacionMensual = data, this.llenarArrays(this.recaudacionMensual), this.chart?.chart?.update()},
        error: (error) => {console.log(error)}
      })
    );
  }

  llenarArrays(datos: RecaudacionMensual[]){

    for (let d of datos) {
      this.valores.push(d.recaudacionMensual);
      this.valores.push(d.recaudacionEsperada);
    }
  }

}
