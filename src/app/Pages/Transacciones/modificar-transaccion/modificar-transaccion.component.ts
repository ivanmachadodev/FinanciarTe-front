import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/Models/categorias';
import { EntidadesFinancieras } from 'src/app/Models/entidades-financieras';
import { ComandoDetalleTransaccione, ComandoTransaccion, DTOTransacciones_DetT } from 'src/app/Models/transacciones';
import { NavbarService } from 'src/app/Services/navbar.service';
import { TransaccionesService } from 'src/app/Services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-transaccion',
  templateUrl: './modificar-transaccion.component.html',
  styleUrls: ['./modificar-transaccion.component.css']
})
export class ModificarTransaccionComponent implements OnInit, OnDestroy{
  idTransaccion: number = 0;
  transaccion!: DTOTransacciones_DetT;
  entidadesF: EntidadesFinancieras[] = [];
  categorias: Categorias[] = [];
  form!: FormGroup;

  constructor(private servicio: TransaccionesService, private formBuilder: FormBuilder, private params: ActivatedRoute, private router: Router,
              private nav: NavbarService) {
    this.form = this.formBuilder.group({
      idTransaccion: ['',[Validators.required]],
      idEntidadFinanciera: ['',[Validators.required]],
      fechaTransaccion: [new Date],
      detallesTransacciones: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.idTransaccion = this.params.snapshot.params['id'];
    this.getTransaccion(this.idTransaccion);
    this.getCombos();
    this.nav.show();
  }

  ngOnDestroy(): void {
  }

  get detallesTransacciones(): FormArray {
    return this.form.get('detallesTransacciones') as FormArray;
  }

  detalleTransaccionForm() {
    return this.formBuilder.group({
        idCategoria: ['', Validators.required],
        detalle: ['', [Validators.required, Validators.pattern('[a-zA-Z, 1-9]{2,254}')]],
        monto: ['', [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]]
    })
  }

  newDetalleForm(){
    this.detallesTransacciones.push(this.detalleTransaccionForm());
  }

  deleteDetalleForm(i: number){
    this.detallesTransacciones.removeAt(i)
  }

  getTransaccion(id: number){
    this.servicio.GetTransaccionByID(id).subscribe({
      next: (data) => {this.transaccion = data, console.log(this.transaccion),this.form.patchValue(this.transaccion),
                      this.transaccion.detalleTransacciones.forEach((d) => {
                        this.detallesTransacciones.push(
                          this.formBuilder.group({
                            idDetalleTransaccion: [d.idDetalleTransaccion],
                            idTransaccion: [d.idTransaccion],
                            idCategoria: [d.idCategoria, Validators.required],
                            detalle: [d.detalle, [Validators.required, Validators.pattern('[a-zA-Z, 1-9]{2,254}')]],
                            monto: [d.monto, [Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]]
                        })
                      )
                    })},
      error: (error) => {console.log(error)}
    })
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

    this.detallesTransacciones.value.forEach((d: any) => {
      const det = {
        idDetalleTransaccion: d.idDetalleTransaccion,
        idCategoria: d.idCategoria,
        detalle: d.detalle,
        monto: d.monto,
        idTransaccion: d.idTransaccion
      }
      dts.push(det)
    })

    const tr: ComandoTransaccion = {
      idTransaccion: this.transaccion.idTransaccion,
      fechaTransaccion: this.transaccion.fechaTransaccion,
      idEntidadFinanciera: result.idEntidadFinanciera,
      detallesTransacciones: dts
    }

    this.servicio.PutTransaccion(tr).subscribe((data) => {
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
