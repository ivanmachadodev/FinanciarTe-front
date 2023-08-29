import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Puntos } from 'src/app/Models/puntos';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PuntosService } from 'src/app/Services/puntos.service';

@Component({
  selector: 'app-listado-puntaje',
  templateUrl: './listado-puntaje.component.html',
  styleUrls: ['./listado-puntaje.component.css']
})
export class ListadoPuntajeComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  puntos: Puntos[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private servicio: PuntosService, private router: Router, private nav: NavbarService){}

  ngOnInit(): void {
    this.actualizarListado();
    this.nav.show();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicio.GetHistoricoPuntos().subscribe({
        next: (data) => {this.puntos = data, console.log(this.puntos)},
        error: (error) => {console.log(error)}
      })
    );
  }

}

