import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComandoUsuario, TipoUsuario, Usuario } from 'src/app/Models/usuario';
import { NavbarService } from 'src/app/Services/navbar.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { LegajoValidator } from 'src/app/Validators/legajo-validatorAsync';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit{  
  form!: FormGroup;
  tiposUsuarios: TipoUsuario[] = [];
  invalidFormMessage: boolean = false;

  constructor(private nav: NavbarService, private formBuilder: FormBuilder, private servicioUsuario: UsuarioService, private router: Router){
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      apellidos:['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      legajo: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')], [LegajoValidator.legajoValidator(this.servicioUsuario)]],
      telefono: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
      calle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      numero: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
      user: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      pass: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      passRepeat: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      idTipoUsuario: ['', [Validators.required]],
    }, {validators: this.compararContraseñas})
  }

  ngOnInit(): void {
    this.nav.show();
    this.getCombos();
  }

  compararContraseñas(formGroup: FormGroup) {
    const contraseña = formGroup.get('pass')?.value;
    const repetirContraseña = formGroup.get('passRepeat')?.value;
  
    if(contraseña  != "" && repetirContraseña != "" ){
      if (contraseña !== repetirContraseña ) {
        formGroup.get('pass')?.setErrors({ noCoincide: true });
        formGroup.get('passRepeat')?.setErrors({ noCoincide: true });
      } else {
        formGroup.get('pass')?.setErrors(null);
        formGroup.get('passRepeat')?.setErrors(null);
      }
    }
  }

  getCombos(){
    this.servicioUsuario.GetTipoUsuario().subscribe({
      next: (resultado) => {this.tiposUsuarios = resultado},
      error: (error) => {console.log(error)}
    })
  }

  limpiarForm(){
    this.form.reset();
  }
  
  registrar(){
    if(!this.form.invalid){
      const u: ComandoUsuario = {
        nombre: this.form.controls['nombres'].value,
        apellido: this.form.controls['apellidos'].value,
        legajo: this.form.controls['legajo'].value,
        telefono: this.form.controls['telefono'].value,
        calle: this.form.controls['calle'].value,
        numero: this.form.controls['numero'].value,
        user: this.form.controls['user'].value,
        idTipoUsuario: this.form.controls['idTipoUsuario'].value,
        pass: this.form.controls['pass'].value
      };
      console.log(u)
      this.servicioUsuario.PostUsuario(u).subscribe((data) => {
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
            text: 'Usuario registrado con exito',
            showConfirmButton: false,
            timer: 3000
          });
          //this.router.navigateByUrl("/clientes/vista/" + cliente.nroDni);
        }
      });      
    }else{
      this.invalidFormMessage = true
    }
  }

}
