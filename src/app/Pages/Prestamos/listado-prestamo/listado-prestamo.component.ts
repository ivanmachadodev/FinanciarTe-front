import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DTOListadoPrestamos } from 'src/app/Models/prestamos';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PrestamosService } from 'src/app/Services/prestamos.service';

@Component({
  selector: 'app-listado-prestamo',
  templateUrl: './listado-prestamo.component.html',
  styleUrls: ['./listado-prestamo.component.css']
})
export class ListadoPrestamoComponent implements OnInit{
  id!: number;
  prestamos: DTOListadoPrestamos[] = [];
  idPrestamo: number = 0;
  offCanvasVista: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private servicio: PrestamosService, private router: Router, private params: ActivatedRoute, private nav: NavbarService){}

  ngOnInit(): void {
    this.id = this.params.snapshot.params['id'];
    this.actualizarListado(this.id);
    this.nav.show();
  }

  actualizarListado(id: number){
    this.subscription.add(
      this.servicio.GetPrestamosByCliente(id).subscribe({
        next: (data) => {this.prestamos = data, console.log(this.prestamos)},
        error: (error) => {console.log(error)}
      })
    );
  }

  verPrestamo(id: number){
    this.idPrestamo = id;
    this.offCanvasVista = true;
  }

  modificarPrestamo(id: number){
    this.router.navigateByUrl("prestamos/modificar/" + id)
  }

  anular(id: number){

  }

}
