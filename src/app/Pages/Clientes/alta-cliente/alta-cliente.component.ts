import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ciudad } from 'src/app/Models/ciudad';
import { Cliente, ComandoCliente } from 'src/app/Models/cliente';
import { ContactosAlternativos } from 'src/app/Models/contactos-alternativos';
import { Provincia } from 'src/app/Models/provincia';
import { ClienteService } from 'src/app/Services/cliente.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { DniValidator } from 'src/app/Validators/dni-validatorAsync';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit{
  form!: FormGroup;
  cliente!: Cliente;
  provincias: Provincia[] = [];
  ciudades: Ciudad[] = [];

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private servicio: ClienteService, private router: Router, private nav: NavbarService) {

      this.form = this.formBuilder.group({
        nroDni: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')], [DniValidator.dniValidator(this.servicio)]],
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
        nombresAlt: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        apellidosAlt: ['',[Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
        telAlt: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
        emailAlt: ['',[Validators.required, Validators.email]],
      });
  }

  ngOnInit(): void {
    this.nav.show();
    this.getCombos();


    this.form.controls['idProvincia'].valueChanges.subscribe(x =>{
      console.log(this.form.controls['idProvincia'].value)
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
  }

  getCombos(){
    this.servicio.GetProvincias().subscribe({
      next: (resultado) => {this.provincias = resultado, console.log(resultado)},
      error: (error) => {console.log(error)}
    })
  }

  limpiarForm(){
    this.form.reset();
  }

  registrar(){
    const cliente: ComandoCliente = {
      nroDni: this.form.get('nroDni')?.value,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      direccion: this.form.get('direccion')?.value,
      numero: this.form.get('numero')?.value,
      activo: true,
      idCiudad: this.form.get('idCiudad')?.value,
      telefono: this.form.get('telefono')?.value,
      email: this.form.get('email')?.value,
      fechaDeNacimiento: this.form.get('fechaDeNacimiento')?.value,
      codigoPostal: this.form.get('codigoPostal')?.value,
      puntosIniciales: this.form.get('puntosIniciales')?.value,
      idContactoAlternativo: 0,
      nombresAlt: this.form.get('nombresAlt')?.value,
      apellidosAlt: this.form.get('apellidosAlt')?.value,
      telAlt: this.form.get('telAlt')?.value,
      emailAlt: this.form.get('emailAlt')?.value
    };
    console.log(cliente);
    this.servicio.PostCliente(cliente).subscribe((data) => {
      if(!data.ok){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
          showConfirmButton: false,
          customClass: {
            confirmButton: 'button-cancel-action'
          },
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Cliente registrado con exito',
          showConfirmButton: false,
          customClass: {
            confirmButton: 'button-primary-action',
          },
          timer: 3000
        });
        this.router.navigateByUrl("/clientes/vista/" + cliente.nroDni);
      }
    });
  }

}
