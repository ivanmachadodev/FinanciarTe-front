import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteComboBox, DTOCliente } from 'src/app/Models/cliente';
import { DolarIndice } from 'src/app/Models/dolar-indice';
import { EntidadesFinancieras } from 'src/app/Models/entidades-financieras';
import { DTOListadoPrestamos, Prestamos } from 'src/app/Models/prestamos';
import { ClienteService } from 'src/app/Services/cliente.service';
import { DolarIndiceService } from 'src/app/Services/dolar-indice.service';
import { PrestamosService } from 'src/app/Services/prestamos.service';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-altaprestamo',
  templateUrl: './altaprestamo.component.html',
  styleUrls: ['./altaprestamo.component.css']
})
export class AltaprestamoComponent implements OnInit, OnDestroy{
  @Input() cliente!: DTOCliente;
  @Input() offCanvasNewPrestamo: boolean = false;
  //cliente!: DTOCliente;
  form!: FormGroup;
  prestamo!: Prestamos;
  prestamos!: DTOListadoPrestamos[];
  dolar!: DolarIndice;
  clientes: ClienteComboBox[] = [];
  entidadesF: EntidadesFinancieras[] = [];
  cuotas: number[] = Array.from(Array(12), (_, index) => index + 1);
  diaVenc: number[] = Array.from(Array(20), (_, index) => index + 1);

  private subscription: Subscription = new Subscription();

  constructor(private servicioPrestamos: PrestamosService, private servicioCliente: ClienteService,
              private servicioDolarIndice: DolarIndiceService, private formBuilder: FormBuilder, private router: Router, private nav: NavbarService) {
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
  }

  ngOnInit(): void {
    this.getCombos();
    this.getDolarIndice();
    this.getPrestamos(this.cliente.dni)
    this.nav.show();
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
    this.subscription.add(
      this.servicioPrestamos.GetPrestamosByCliente(id).subscribe({
        next: (resultado) => {this.prestamos = resultado},
        error: (error) => {console.log(error)}
      })
    )
  }

  getCliente(id: number){
    this.subscription.add(
      this.servicioCliente.GetViewClienteByID(id).subscribe({
        next: (data) => {this.cliente = data, this.getCombos(); this.getDolarIndice(); this.getPrestamos(id) },
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

  registrarPrestamo(){
    const prestamo = {
      idCliente: this.cliente.dni,
      idEntidadFinanciera: this.form.get('idEntidadFinanciera')?.value,
      montoOtorgado: this.form.get('montoOtorgado')?.value,
      cuotas: this.form.get('cuotas')?.value,
      diaVencimientoCuota: this.form.get('diaVencimientoCuota')?.value,
      refinanciaDeuda: this.form.get('refinanciaDeuda')?.value,// == null ? false : true,
      idPrestamoRefinanciado: this.form.get('refinanciaDeuda')?.value != '' ? this.form.get('idPrestamoRefinanciado')?.value : null,
      idScoring: this.cliente.scoring,
      indiceInteres: this.dolar.indice - this.cliente.beneficioScoring,
      fecha: new Date(),
      montoADevolver: (((this.dolar.indice - this.cliente.beneficioScoring)
                      *this.form.get('cuotas')?.value)*this.form.get('montoOtorgado')?.value
                      + this.form.get('montoOtorgado')?.value),
      valorCuota: (((this.dolar.indice - this.cliente.beneficioScoring)*this.form.get('cuotas')?.value)
                  *this.form.get('montoOtorgado')?.value
                  + this.form.get('montoOtorgado')?.value) / this.form.get('cuotas')?.value
    }
    console.log(prestamo)

    this.servicioPrestamos.PostPrestamo(prestamo).subscribe((data) => {
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
          text: 'Prestamo registrado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigateByUrl("/prestamos/listado/" + this.cliente.dni);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.getCliente(changes['id'].currentValue)
    }
  }

  mostrar() {
    this.offCanvasNewPrestamo = true;
  }

  ocultar() {
    this.offCanvasNewPrestamo = false;
    this.ngOnDestroy()
  }

}
