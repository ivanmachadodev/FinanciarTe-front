import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/Services/login-service.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user!: string;
  usuarioActual!: Usuario;
  
  constructor(public nav: NavbarService, private router: Router, private loginService: LoginService, private servicioUsuario: UsuarioService) {}

  ngOnInit(): void {
      this.user = this.getDisplayUserName();
  }

  desloguear(): void {
    this.loginService.desloguearUsuario();
    this.nav.hide();
  }

  modificarDatos(): void {
    this.servicioUsuario.GetUsuarioByUser(this.loginService.getUser().user).subscribe({
      next: (data) => {this.router.navigateByUrl('/usuarios/modificar/'+ data.legajo)},
      error: (error) => {console.log(error)}
    })
  }

  getDisplayUserName() {
    return `${this.loginService.getUser().nombre}`;
  }

  userHasRole(roles: string[]): boolean {
    return this.loginService.checkUseHasRole(roles);
  }

  async prestamosPorCliente(){
    Swal.fire({
      title: 'Ingrese el DNI',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'button-primary-action',
        cancelButton: 'button-cancel-action'
      },
      inputValidator: (result) => {
        if (!result) {
          return 'Por favor, ingrese un DNI válido';
        } else {
          return ''
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "/prestamos/listado/" + result.value;
        this.router.navigateByUrl(url).then(() => {
          window.location.reload();
        });
      }
    });
  }

  async buscarCliente(){
    Swal.fire({
      title: 'Ingrese el DNI',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'button-primary-action',
        cancelButton: 'button-cancel-action'
      },
      inputValidator: (result) => {
        if (!result) {
          return 'Por favor, ingrese un DNI válido';
        } else {
          return ''
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "clientes/vista/" + result.value;
        this.router.navigateByUrl(url).then(() => {
          window.location.reload();
        });
      }
    });
  }

  async puntosPorCliente(){
    Swal.fire({
      title: 'Ingrese el DNI',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'button-primary-action',
        cancelButton: 'button-cancel-action'
      },
      inputValidator: (result) => {
        if (!result) {
          return 'Por favor, ingrese un DNI válido';
        } else {
          return ''
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "puntos/puntaje-cliente/" + result.value;
        this.router.navigateByUrl(url).then(() => {
          window.location.reload();
        });
      }
    });
  }

}
