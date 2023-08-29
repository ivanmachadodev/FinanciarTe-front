import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Anulaciones } from 'src/app/Models/anulaciones';
import { DTOTransacciones } from 'src/app/Models/transacciones';
import { NavbarService } from 'src/app/Services/navbar.service';
import { TransaccionesService } from 'src/app/Services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-transacciones',
  templateUrl: './listado-transacciones.component.html',
  styleUrls: ['./listado-transacciones.component.css']
})
export class ListadoTransaccionesComponent {
  transaccion!: DTOTransacciones;
  transacciones: DTOTransacciones[] = [];
  idTr: number = 0;
  offCanvasVista: boolean = false;
  offCanvasModificar: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private servicio: TransaccionesService, private router: Router, private nav: NavbarService){}

  ngOnInit(): void {
    this.actualizarListado();
    this.nav.show();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicio.GetTransacciones().subscribe({
        next: (data) => {this.transacciones = data, console.log(this.transacciones) },
        error: (error) => {console.log(error)}
      })
    );
  }

  anular(id: number) {

    Swal.fire({
      title: 'Desea anular la transaccion?',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputValidator: (result) => {
        if (!result) {
          return 'Por favor, ingrese un motivo para la anulación';
        } else {
          return ''
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const anulacion: Anulaciones = {
          id: id,
          motivoAnulacion: result.value
        }
        this.servicio.DeleteSoftTransaccion(anulacion).subscribe({
          next: (resultado) => { Swal.fire('Transacción anulada', '', 'success'), this.actualizarListado() },
          error: (error) => { console.log(error); }
        })
      }
    });
  }

  registrarTransaccion() {
    this.router.navigateByUrl("/transacciones/registrar");
  }

  ModificarTransaccion(id: number) {
    this.router.navigateByUrl("/transacciones/modificar/" + id);
  }

  verTransaccion(id: number) {
    this.offCanvasModificar = false;
    this.idTr = id;
    this.offCanvasVista = true;
  }

}
