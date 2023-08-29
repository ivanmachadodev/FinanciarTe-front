import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoPutUsuario, ComandoUsuario, TipoUsuario, Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/Services/login-service.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { LegajoValidator } from 'src/app/Validators/legajo-validatorAsync';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent {
  form!: FormGroup;
  usuario!: Usuario;
  id!: number;
  usuarioActivo: boolean = false;
  tiposUsuarios: TipoUsuario[] = [];
  invalidFormMessage: boolean = false;

  constructor(private nav: NavbarService, private formBuilder: FormBuilder, private servicioUsuario: UsuarioService, 
              private router: Router, private params: ActivatedRoute, private serviceLogin: LoginService){
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      apellidos:['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      legajo: ['',[Validators.required, Validators.pattern('^([1-9]\\d*)|[0]')]],
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
    this.id = this.params.snapshot.params['id'];
    this.getUsuario(this.id)
  }

  corroborarUsuario(user: Usuario){
    if(this.serviceLogin.getUser().user == user.user){
      this.usuarioActivo = true;
    }else{
      this.usuarioActivo = false;
    }
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

  getUsuario(id: number){
    this.servicioUsuario.GetUsuarioByID(id).subscribe({
      next: (data) => {this.usuario = data, this.form.patchValue(this.usuario), this.corroborarUsuario(this.usuario)},
      error: (error) => {console.log(error)}
    })
  }
  
  actualizar(){
    if(!this.form.invalid){
      const u: ComandoPutUsuario = {
        nombre: this.form.controls['nombres'].value,
        apellido: this.form.controls['apellidos'].value,
        legajo: this.form.controls['legajo'].value,
        telefono: this.form.controls['telefono'].value,
        calle: this.form.controls['calle'].value,
        numero: this.form.controls['numero'].value,
        user: this.form.controls['user'].value,
        idTipoUsuario: this.form.controls['idTipoUsuario'].value,
        passNueva: this.form.controls['pass'].value
      };
      console.log(u)
      this.servicioUsuario.PutUsuario(u).subscribe((data) => {
        if(!data.ok){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message,
            showConfirmButton: true,
            customClass: {
              confirmButton: 'button-primary-action',
              cancelButton: 'button-cancel-action'
            },
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Usuario actualizado con éxito',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigateByUrl("/usuarios/listado");
        }
      });      
    }else{
      this.invalidFormMessage = true
    }
  }
}
