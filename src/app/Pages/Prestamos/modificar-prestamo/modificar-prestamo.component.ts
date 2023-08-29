import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteComboBox, DTOCliente } from 'src/app/Models/cliente';
import { DolarIndice } from 'src/app/Models/dolar-indice';
import { EntidadesFinancieras } from 'src/app/Models/entidades-financieras';
import { DTOListadoPrestamos, Prestamos } from 'src/app/Models/prestamos';
import { ClienteService } from 'src/app/Services/cliente.service';
import { DolarIndiceService } from 'src/app/Services/dolar-indice.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { PrestamosService } from 'src/app/Services/prestamos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-prestamo',
  templateUrl: './modificar-prestamo.component.html',
  styleUrls: ['./modificar-prestamo.component.css']
})
export class ModificarPrestamoComponent implements OnInit, OnDestroy {
  id!: number;
  cliente!: DTOCliente;
  form!: FormGroup;
  prestamo!: Prestamos;
  prestamos!: DTOListadoPrestamos[];
  dolar!: DolarIndice;
  clientes: ClienteComboBox[] = [];
  entidadesF: EntidadesFinancieras[] = [];
  cuotas: number[] = Array.from(Array(12), (_, index) => index + 1);
  diaVenc: number[] = Array.from(Array(20), (_, index) => index + 1);

  private subscription: Subscription = new Subscription();

  constructor(private servicioPrestamos: PrestamosService, private servicioCliente: ClienteService, private nav: NavbarService,
              private servicioDolarIndice: DolarIndiceService, private formBuilder: FormBuilder, private router: Router, private params: ActivatedRoute) {
    this.form = this.formBuilder.group({
      cuotas: ['',[Validators.required]],
      montoOtorgado: ['',[Validators.required]],
      diaVencimientoCuota: ['',[Validators.required]],
      refinanciaDeuda: [false,[]],
      idPrestamoRefinanciado: ['',[]],
      idEntidadFinanciera: ['',Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.nav.show();
  }

  ngOnInit(): void {
    this.id = this.params.snapshot.params['id'];
    this.getPrestamo(this.id);
    this.getCombos();
    this.getDolarIndice();
  }

  getCombos(){
    this.servicioCliente.GetClientesForComboBox().subscribe({
      next: (resultado) => {this.clientes = resultado},
      error: (error) => {console.log(error)}
    });
    this.servicioPrestamos.GetEntidadFinanciera().subscribe({
      next: (resultado) => {this.entidadesF = resultado},
      error: (error) => {console.log(error)}
    });
  }

  getPrestamos(id: number){
    this.servicioPrestamos.GetPrestamosByCliente(id).subscribe({
      next: (resultado) => {this.prestamos = resultado},
      error: (error) => {console.log(error)}
    });
  }

  getCliente(id: number){
    this.subscription.add(
      this.servicioCliente.GetViewClienteByID(id).subscribe({
        next: (data) => {this.cliente = data},
        error: (error) => {console.log(error)}
      })
    );
  }

  getPrestamo(id: number){
    this.subscription.add(
      this.servicioPrestamos.getPrestamosByIdToMod(id).subscribe({
        next: (data) => {this.prestamo = data,console.log(this.prestamo), this.form.patchValue(this.prestamo) ,this.getCliente(this.prestamo.idCliente), this.getPrestamos(this.prestamo.idCliente)},
        error: (error) => {console.log(error)}
      })
    );
  }

  getDolarIndice(){
    this.subscription.add(
      this.servicioDolarIndice.GetUltimoDolarIndice().subscribe({
        next: (data) => {this.dolar = data},
        error: (error) => {console.log(error)}
      })
    );
  }

  modificarPrestamo(){
    const p: Prestamos = {
      idPrestamo: this.prestamo.idPrestamo,
      idTransaccion: this.prestamo.idTransaccion,
      idCliente: this.id,
      idEntidadFinanciera: this.form.get('idEntidadFinanciera')?.value,
      montoOtorgado: this.form.get('montoOtorgado')?.value,
      cuotas: this.form.get('cuotas')?.value,
      diaVencimientoCuota: this.form.get('diaVencimientoCuota')?.value,
      refinanciaDeuda: this.form.get('refinanciaDeuda')?.value, //== '' ? false : true,
      idPrestamoRefinanciado: this.form.get('refinanciaDeuda')?.value != '' ? this.form.get('idPrestamoRefinanciado')?.value : null,
      idScoring: this.cliente.scoring,
      indiceInteres: this.prestamo.indiceInteres,
      fecha: new Date(),
      montoADevolver: (((this.prestamo.indiceInteres)
                      *this.form.get('cuotas')?.value)*this.form.get('montoOtorgado')?.value
                      + this.form.get('montoOtorgado')?.value),
      valorCuota: (((this.prestamo.indiceInteres)*this.form.get('cuotas')?.value)
                  *this.form.get('montoOtorgado')?.value
                  + this.form.get('montoOtorgado')?.value) / this.form.get('cuotas')?.value
    }
    console.log(p)

    this.servicioPrestamos.PutPrestamo(p).subscribe((data) => {
      if(!data.ok){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Prestamo amodificado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigateByUrl("/prestamos/listado/" + this.cliente.dni);
      }
    });
  }

}
