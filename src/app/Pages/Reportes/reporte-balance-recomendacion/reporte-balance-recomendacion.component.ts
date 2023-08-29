import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Balance } from 'src/app/Models/balance';
import { NavbarService } from 'src/app/Services/navbar.service';
import { ReportesService } from 'src/app/Services/reportes.service';
import { paletGraph1 } from 'src/app/Settings/colors';

@Component({
  selector: 'app-reporte-balance-recomendacion',
  templateUrl: './reporte-balance-recomendacion.component.html',
  styleUrls: ['./reporte-balance-recomendacion.component.css']
})
export class ReporteBalanceRecomendacionComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  colores = paletGraph1
  labels: string[] = [];
  montosIniciales: number[] = [];
  montosActuales: number[] = [];
  balance: Balance[] = [];
  datos: ChartData = {
    labels: this.labels,
    datasets: [{
      type: 'bar',
      label: 'Monto Actual',
      data: this.montosActuales,
      borderColor: this.colores.caribbeanCurrent,
      backgroundColor: this.colores.mint,
    },
    {
      type: 'bar',
      label: 'Monto Inicial',
      data: this.montosIniciales,
      borderColor: this.colores.caribbeanCurrent,
      backgroundColor: this.colores.burntSienna,
    }]
  }

  options: ChartOptions = {
    plugins: {
      datalabels: {
          display: true,
          anchor: 'end',
          align: 'top',
          color: '#000',
          font: {
              weight: 'bold'
          }
      }
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        title: {display: true, text: 'Recaudación'},
        ticks: {
          stepSize: 50000
        }
      }
    }
  }

  private subscription: Subscription = new Subscription();

  constructor(private servicio: ReportesService, private router: Router, private params: ActivatedRoute, private nav: NavbarService){

  }
  ngOnInit(): void {
    this.getRecaudacionMensual()
    this.nav.show();
  }

  getRecaudacionMensual(){
    this.subscription.add(
      this.servicio.GetBalance().subscribe({
        next: (data) => {this.balance = data, console.log(this.balance),this.llenarArrays(this.balance), this.chart?.chart?.update()},
        error: (error) => {console.log(error)}
      })
    );
  }

  llenarArrays(datos: Balance[]){
    for (let d of datos) {
      this.labels.push(d.descripcion);
      this.montosIniciales.push(d.montoInicial);
      this.montosActuales.push(d.montoActual);
    }
  }

}
