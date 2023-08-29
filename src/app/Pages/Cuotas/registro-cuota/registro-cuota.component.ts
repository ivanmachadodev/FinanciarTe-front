import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComandoCuotas, ComandoDetalleCuotas, Cuotas, ViewCuotaCliente } from 'src/app/Models/cuotas';
import { DolarIndice } from 'src/app/Models/dolar-indice';
import { EntidadesFinancieras } from 'src/app/Models/entidades-financieras';
import { CuotasService } from 'src/app/Services/cuotas.service';
import { DolarIndiceService } from 'src/app/Services/dolar-indice.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { TransaccionesService } from 'src/app/Services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-cuota',
  templateUrl: './registro-cuota.component.html',
  styleUrls: ['./registro-cuota.component.css']
})
export class RegistroCuotaComponent implements OnInit{
  dolar!: DolarIndice;
  cuotas: ViewCuotaCliente[] = [];
  cuotasPendientes: Cuotas[] = [];
  entidadesF: EntidadesFinancieras[] = [];
  form!: FormGroup;
  index: number = 0;
  idCliente!: number;
  inputDisabled: boolean = true;

  private subscription: Subscription = new Subscription();

  constructor(private servicioCuota: CuotasService, private servicioTransacciones: TransaccionesService, private formBuilder: FormBuilder,
              private router: Router, private params: ActivatedRoute, private nav: NavbarService){
    this.form = this.formBuilder.group({
      idTransaccion: ['',[Validators.required]],
      idEntidadFinanciera: ['',[Validators.required]],
      fechaTransaccion: [new Date],
      detalleCuota: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.idCliente = this.params.snapshot.params['id'];
    this.getCombos();
    this.actualizarListado(this.idCliente);
    this.nav.show();
  }

  actualizarListado(id: number){
    this.subscription.add(
      this.servicioCuota.GetCuotasCliente(id).subscribe({
        next: (data) => {this.cuotas = data, this.newCuotaForm()},
        error: (error) => {console.log(error)}
      })
    );
  }

  get detalleCuota(): FormArray {
    return this.form.get('detalleCuota') as FormArray;
  }

  detalleCuotaForm(index: number) {
    return this.formBuilder.group({
        idCuota: [{value: this.cuotas[index].idCuota, disabled: true}, Validators.required],
        idPrestamo: [{value: this.cuotas[index].idPrestamo, disabled: true}, Validators.required],
        numeroCuota: [{value: this.cuotas[index].cuotaN, disabled: true}, Validators.required],
        fechaPago: [{value: new Date, disabled: true}, Validators.required],
        montoCuota: [{value: this.cuotas[index].montoDeCuota, disabled: true}, [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        montoAbonado: [{value: this.cuotas[index].montoAbonado, disabled: true}, [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        cuotaVencida: [{value: this.cuotas[index].diasVencidos > 0 ? true : false, disabled: true}, [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]]
    })
  }

  newCuotaForm(){
    if(this.index < this.cuotas.length || this.index == 0){
      this.detalleCuota.push(this.detalleCuotaForm(this.index));
      this.index += 1;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya no hay mas cuotas para este prestamo',
        customClass: {
          confirmButton: 'button-primary-action'
        }
      })
    }
  }

  deleteCuotaForm(){
    if(this.index > 1){
      this.detalleCuota.removeAt(this.index-1)
      this.index -= 1
    }
  }

  getCombos(){
    this.servicioTransacciones.GetEntidadFinanciera().subscribe({
      next: (resultado) => {this.entidadesF = resultado},
      error: (error) => {console.log(error)}
    })
  }

  guardar(){
    console.log(this.detalleCuota.controls)
    console.log(this.form.value)

    const result = this.form.value
    const dts: ComandoDetalleCuotas[] = [];

    this.detalleCuota.value.forEach((c: any) => {
      const cuota = {
        idCuota: c.idCuota,
        idPrestamo: c.idPrestamo,
        numeroCuota: c.numeroCuota,
        fechaPago: c.fechaPago,
        montoAbonado: c.montoAbonado,
        cuotaVencida: c.cuotaVencida,
        idTransaccion: 0,
        idDetalleTransaccion: 0
      }
      dts.push(cuota)
    })

    const cuotasPagas: ComandoCuotas = {
      idTransaccion: 0,
      fechaPago: new Date(),
      idEntidadFinanciera: result.idEntidadFinanciera,
      detalleCuotas: dts
    }
    this.servicioCuota.PostCuota(cuotasPagas).subscribe((data) => {
      if(!data.ok){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
          showConfirmButton: false,
          customClass: {
            confirmButton: 'button-cancel-action'
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Transaccion registrada con exito',
          showConfirmButton: false,
          customClass: {
            confirmButton: 'button-primary-action'
          },
          timer: 3000
        });
        this.router.navigateByUrl("/cuotas/listado/" + this.idCliente);
      }
    });
  }

}
