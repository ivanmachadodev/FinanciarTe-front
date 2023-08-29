import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DTOCliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent {

  clientes: DTOCliente[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private servicio: ClienteService, private router: Router, private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show()
    this.actualizarListado();
  }

  actualizarListado() {
    this.subscription.add(
      this.servicio.GetClientes().subscribe({
        next: (data) => { this.clientes = data, console.log(this.clientes) },
        error: (error) => { console.log(error) }
      })
    );
  }

  desactivar(id: number) {
    Swal.fire({
      title: '¿Deseas eliminar este cliente?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#dc3545",
      confirmButtonColor: "#2c5672",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.DeleteCliente(id).subscribe({
          next: (resultado) => { Swal.fire('Cliente eliminado', '', 'success'), this.actualizarListado() },
          error: (error) => { console.log(error); }
        })

      } else if (result.isDenied) {

      }
    })
  }

  ModificarCliente(id: number) {
    this.router.navigateByUrl("clientes/modificar/" + id)
  }

  verCliente(id: number) {
    this.router.navigateByUrl("clientes/vista/" + id)
  }

  nuevoCliente() {
    this.router.navigateByUrl("/clientes/alta");
  }

}
