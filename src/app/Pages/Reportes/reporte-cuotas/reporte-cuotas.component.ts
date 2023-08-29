import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js/dist';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { DTOCuotasMesEnCurso } from 'src/app/Models/cuotas';
import { NavbarService } from 'src/app/Services/navbar.service';
import { ReportesService } from 'src/app/Services/reportes.service';
import { paletGraph1 } from 'src/app/Settings/colors';

@Component({
  selector: 'app-reporte-cuotas',
  templateUrl: './reporte-cuotas.component.html',
  styleUrls: ['./reporte-cuotas.component.css']
})
export class ReporteCuotasComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  colores = paletGraph1;
  labels: string[] = [];
  values: number[] = [];
  balance: DTOCuotasMesEnCurso[] = [];
  datos: ChartData = {
    labels: this.labels,
    datasets: [{
      type: 'doughnut',
      data: this.values,
      backgroundColor: [this.colores.mint, this.colores.burntSienna, this.colores.electricBlue]
    }]
  }

  options: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'right',
        offset: 0,
        //color: '#000',
        /*font: {
            weight: 'bold'
        },
        color: function(context) {
          return context.dataset.backgroundColor;
        },*/
        font: function(context) {
          var w = context.chart.width;
          return {
            size: w < 512 ? 12 : 14,
            weight: 'bold',
          };
        },/*
        formatter: function(value, context) {
          return context.chart.data.labels?[context.dataIndex];
        }*/
      }
    },
    responsive: true
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
      this.servicio.GetCuotasMesEnCurso().subscribe({
        next: (data) => {this.balance = data, this.llenarArrays(this.balance), console.log(this.labels), this.chart?.chart?.update()},
        error: (error) => {console.log(error)}
      })
    );
  }

  llenarArrays(datos: DTOCuotasMesEnCurso[]){
    for (let d of datos) {
      this.labels.push(d.descripcion);
      this.values.push(d.cantidad);
    }
  }

}