import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/Models/categorias';
import { EntidadesFinancieras } from 'src/app/Models/entidades-financieras';
import { ComandoDetalleTransaccione, ComandoTransaccion } from 'src/app/Models/transacciones';
import { NavbarService } from 'src/app/Services/navbar.service';
import { TransaccionesService } from 'src/app/Services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-transaccion',
  templateUrl: './alta-transaccion.component.html',
  styleUrls: ['./alta-transaccion.component.css']
})
export class AltaTransaccionComponent implements OnInit{
  transaccion!: ComandoTransaccion;
  entidadesF: EntidadesFinancieras[] = [];
  categorias: Categorias[] = [];
  form!: FormGroup;

  constructor(private servicio: TransaccionesService, private formBuilder: FormBuilder, private router: Router, private nav: NavbarService) {
    this.form = this.formBuilder.group({
      idTransaccion: ['',[Validators.required]],
      idEntidadFinanciera: ['',[Validators.required]],
      fechaTransaccion: [new Date],
      detalleTransacciones: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.getCombos();
    this.newDetalleForm();
    this.nav.show();
  }

  ngOnDestroy(): void {
  }

  get detalleTransacciones(): FormArray {
    return this.form.get('detalleTransacciones') as FormArray;
  }

  detalleTransaccionForm() {
    return this.formBuilder.group({
      idCategoria: ['', Validators.required],
      detalle: ['', [Validators.required, Validators.pattern('[a-zA-Z, 1-9]{2,254}')]],
      monto: ['', [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]]
    });
  }

  newDetalleForm(){
    this.detalleTransacciones.push(this.detalleTransaccionForm());
  }

  deleteDetalleForm(i: number){
    this.detalleTransacciones.removeAt(i)
  }

  getCombos(){
    this.servicio.GetCategorias().subscribe({
      next: (resultado) => {this.categorias = resultado},
      error: (error) => {console.log(error)}
    });
    this.servicio.GetEntidadFinanciera().subscribe({
      next: (resultado) => {this.entidadesF = resultado},
      error: (error) => {console.log(error)}
    })
  }

  guardar(){
    const result = this.form.value
    const dts: ComandoDetalleTransaccione[] = [];

    this.detalleTransacciones.value.forEach((d: any) => {
      const det = {
        idDetalleTransaccion: 0,
        idCategoria: d.idCategoria,
        detalle: d.detalle,
        monto: d.monto,
        idTransaccion: 0
      }
      dts.push(det)
    })

    const tr: ComandoTransaccion = {
      idTransaccion: 0,
      fechaTransaccion: new Date(),
      idEntidadFinanciera: result.idEntidadFinanciera,
      detallesTransacciones: dts
    }
    this.servicio.PostTransaccion(tr).subscribe((data) => {
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
          text: 'Transaccion registrada con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigateByUrl("/transacciones/listado");
      }
    });
  }

}
