import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/Models/login';
import { LoginService } from 'src/app/Services/login-service.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup
  changeType: boolean = true;
  visible: boolean = true;

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private nav: NavbarService, private servicio: LoginService,
    private spinner: NgxSpinnerService) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      pass: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.nav.hide()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    this.spinner.show();
    const login: Login = {
      user: this.loginForm.get('user')?.value,
      pass: this.loginForm.get('pass')?.value,
      tipoUsuario: "",
      token: "",
      activo: false,
      nombre: "",
      apellido: "",
      message: "",
      ok: false,
      error: "",
      codigoEstado: 1
    };

    this.subscription.add(
      this.servicio.postLogin(login).subscribe(next => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: `Bienvenido`,
          confirmButtonColor: '#2c5672',
          text: 'Inicio de sesión...',
          timer: 5000
        }).then(x => {
          if (this.servicio.checkUseHasRole(['Administrador', 'CEO', 'Director','Gerente','Jefe', 'Agente'])) {
            this.router.navigate(["/home"]);
          } else {
            Swal.fire({
              title: "¡Cuidado!",
              text: "Solicite al administrador que se le asigne un rol"
            })
            this.router.navigate(["/menu"]);
          }
        });
      }, error => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: '¡Ups, algo salió mal!',
          confirmButtonColor: '#2c5672',
          text: error.error.error,
        });
      })
    );
  }

  viewpass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  
}
