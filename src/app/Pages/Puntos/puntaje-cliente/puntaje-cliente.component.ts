import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Puntos } from 'src/app/Models/puntos';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PuntosService } from 'src/app/Services/puntos.service';

@Component({
  selector: 'app-puntaje-cliente',
  templateUrl: './puntaje-cliente.component.html',
  styleUrls: ['./puntaje-cliente.component.css']
})
export class PuntajeClienteComponent {
  id!: number;
  cliente!: string;
  puntos: Puntos[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private servicio: PuntosService, private router: Router, private nav: NavbarService, private params:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.params.snapshot.params['id'];
    this.actualizarListado(this.id);
    this.nav.show();
  }

  actualizarListado(id: number){
    this.subscription.add(
      this.servicio.GetHistoricoPuntosByCliente(id).subscribe({
        next: (data) => {this.puntos = data, this.cliente = this.puntos[0].cliente, console.log(this.puntos) },
        error: (error) => {console.log(error)}
      })
    );
  }
  
}
