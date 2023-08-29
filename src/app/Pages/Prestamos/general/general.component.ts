import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DTOListadoPrestamos } from 'src/app/Models/prestamos';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PrestamosService } from 'src/app/Services/prestamos.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{
  prestamos: DTOListadoPrestamos[] = [];
  idPrestamo: number = 0;
  offCanvasVista: boolean = false;


  private subscription: Subscription = new Subscription();

  constructor(private servicio: PrestamosService, private router: Router, private nav: NavbarService){}

  ngOnInit(): void {
    this.actualizarListado();
    this.nav.show();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicio.GetPrestamos().subscribe({
        next: (data) => {this.prestamos = data},
        error: (error) => {console.log(error)}
      })
    );
  }

  verPrestamo(id: number){
    this.idPrestamo = id;
    this.offCanvasVista = true;
  }

  modificarPrestamo(id: number){

  }

  anular(id: number){

  }

}
