import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ciudad } from 'src/app/Models/ciudad';
import { Cliente, ComandoCliente } from 'src/app/Models/cliente';
import { Provincia } from 'src/app/Models/provincia';
import { ClienteService } from 'src/app/Services/cliente.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificacion-cliente',
  templateUrl: './modificacion-cliente.component.html',
  styleUrls: ['./modificacion-cliente.component.css']
})
export class ModificacionClienteComponent implements OnInit{
  form!: FormGroup;
  provincias: Provincia[] = [];
  ciudades: Ciudad[] = [];
  idCliente: number = 0;
  comandoCliente!: ComandoCliente;

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private servicio: ClienteService, private params:ActivatedRoute, private router: Router,
              private nav: NavbarService) {

      this.form = this.formBuilder.group({
        nroDni: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        apellidos: ['',[Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        direccion: ['',[Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        numero: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        telefono: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        email: ['',[Validators.required, Validators.email]],
        idCiudad: [null,[Validators.required]],
        idProvincia: [null,[Validators.required]],
        fechaDeNacimiento: [null,[Validators.required]],
        codigoPostal: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        puntosIniciales: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        activo: [''],
        nombresAlt: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        apellidosAlt: ['',[Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        telAlt: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        emailAlt: ['',[Validators.required, Validators.email]],
      });
  }

  ngOnInit(): void {
    this.nav.show()
    this.getCombos();

    const fechaControl = this.form.get('fechaDeNacimiento');
    fechaControl?.valueChanges.subscribe(value => {
      if (value) {
        const fecha = new Date(value);
        const fechaFormateada = fecha.toISOString().substring(0, 10);
        fechaControl.patchValue(fechaFormateada, { emitEvent: false });
      }
    });


    this.form.controls['idProvincia'].valueChanges.subscribe(x =>{
      this.subscription.add(
        this.servicio.GetCiudades(x).subscribe({
          next: (resultado: Ciudad[]) => {
            this.ciudades = resultado
          },
          error: (e) => {
            console.log(e);
          }
        })
      )
    })

    this.idCliente = this.params.snapshot.params['id'];
    this.getCombos();
    this.getCliente(this.idCliente);
  }

  getCombos(){
    this.servicio.GetProvincias().subscribe({
      next: (resultado) => {this.provincias = resultado},
      error: (error) => {console.log(error)}
    })
  }

  getCliente(id: number){
    this.servicio.GetClienteByID(id).subscribe({
      next: (data) => {this.comandoCliente = data, this.form.patchValue(this.comandoCliente)},
      error: (error) => {console.log(error)}
    })
  }

  limpiarForm(){
    this.form.reset();
  }

  modificar(){
    console.log(this.form.value);

    this.servicio.PutCliente(this.form.value).subscribe({
      next: (resultado) => (Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente actualizado',
        showConfirmButton: false,
        timer: 1500
      }), this.router.navigateByUrl("/clientes/listado"), console.log(resultado)),
      error: (error) => (console.log(error))
    })
  }

}
