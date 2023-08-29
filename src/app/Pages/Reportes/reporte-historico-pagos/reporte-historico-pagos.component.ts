import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-reporte-historico-pagos',
  templateUrl: './reporte-historico-pagos.component.html',
  styleUrls: ['./reporte-historico-pagos.component.css']
})
export class ReporteHistoricoPagosComponent implements OnInit{

  constructor(private nav: NavbarService){

  }

  ngOnInit(): void {
    this.nav.show();
  }

}
