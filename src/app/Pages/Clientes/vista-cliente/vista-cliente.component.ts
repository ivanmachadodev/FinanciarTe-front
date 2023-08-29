import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DTOCliente } from 'src/app/Models/cliente';
import { DTOListadoPrestamos, DTOPrestamo } from 'src/app/Models/prestamos';
import { ClienteService } from 'src/app/Services/cliente.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PrestamosService } from 'src/app/Services/prestamos.service';
import { paletColorsApp, paletGraph1 } from 'src/app/Settings/colors';


@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css']
})
export class VistaClienteComponent implements OnInit {
  cliente!: DTOCliente;
  colorTexto!: string;
  colores = paletGraph1;
  id!: number;
  prestamos: DTOListadoPrestamos[] = [];
  offCanvasNewPrestamo: boolean = false;
  statusOk!: boolean;
  statusString!: string;

  constructor(private servicioCliente: ClienteService, private servicioPrestamo: PrestamosService,private params:ActivatedRoute, private nav: NavbarService) { }

  ngOnInit(): void {
    this.id = this.params.snapshot.params['id'];
    this.getCliente(this.id);
    this.nav.show();
  }

  getCliente(id: number){
    this.servicioCliente.GetViewClienteByID(id).subscribe({
      next: (data) => {this.cliente = data, this.getPrestamosByCliente(this.cliente)},
      error: (error) => {console.log(error)}
    })
  }

  newPrestamo(id: number){
    this.id = id;
    this.offCanvasNewPrestamo = true;
  }
  
  getPrestamosByCliente(c: DTOCliente){
    this.servicioPrestamo.GetPrestamosByCliente(c.dni).subscribe({
      next: (data) => {this.prestamos = data, this.getStatus(this.prestamos, c)},
      error: (error) => {console.log(error)}
    })
  }

  getStatus(prestamos: DTOListadoPrestamos[], c: DTOCliente){
    console.log(prestamos)
    const prestamoPendiente = prestamos.find((prestamo) => prestamo.estado === 'Pendiente');
    console.log(prestamoPendiente)

    if (prestamoPendiente !== undefined) {
      if (prestamoPendiente.montoAbonado / prestamoPendiente.montoADevolver > 0.65 && c.scoring >= 2) {
        this.statusOk = true;
        this.colorTexto = this.colores.mint;
        this.statusString = `El cliente tiene un préstamo pendiente con el 65% o más abonado y su scoring es apto. Está en condiciones de refinanciar.`;
      } else {
        this.statusOk = false;
        this.colorTexto = this.colores.burntSienna;
        this.statusString = `El cliente tiene un préstamo pendiente con menos del 65% abonado y/o su scoring no es apto. Por el momento, no está en condiciones de refinanciar su deuda.`;
      }
    } else {
      if (c.scoring === 1) {
        this.statusOk = false;
        this.colorTexto = this.colores.burntSienna;
        this.statusString = `El cliente no tiene préstamos pendientes, pero su scoring no lo habilita a sacar un nuevo préstamo.`;
      } else {
        this.statusOk = true;
        this.colorTexto = this.colores.mint;
        this.statusString = `El cliente no tiene préstamos pendientes y su scoring es apto para poder solicitar un nuevo préstamo. Consulta si desea adquirir uno ahora.`;
      }
    }
  }

}
