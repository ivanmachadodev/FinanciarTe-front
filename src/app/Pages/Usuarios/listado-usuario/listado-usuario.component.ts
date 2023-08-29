import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DTOUsuario } from 'src/app/Models/usuario';
import { NavbarService } from 'src/app/Services/navbar.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent implements OnInit{
  usuarios: DTOUsuario[] = [];

  private subscription = new Subscription();

  constructor(private nav: NavbarService, private servicioUsuarios: UsuarioService, private router: Router){}


  ngOnInit(): void {    
    this.nav.show();
    this.actualizarListado();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicioUsuarios.GetViewUsuarios().subscribe({
        next:(resultado)=>{this.usuarios = resultado, console.log(this.usuarios)},
        error:(error)=>console.log("Error al obtener los datos ", error)
      })
    );
  }

  modificarUsuario(legajo: number){
    this.router.navigateByUrl(`/usuarios/modificar/${legajo}`)
  }

  desactivar(legajo: number){
    Swal.fire({
      title: '¿Deseas eliminar este usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: "Cancelar",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        confirmButton: 'button-primary-action',
        cancelButton: 'button-cancel-action'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioUsuarios.DeleteUsuario(legajo).subscribe({
          next: (resultado) => { Swal.fire({title: 'Usuario desactivado con éxito',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          icon: "success",
          denyButtonText: 'No',
          customClass: {
            confirmButton: 'button-primary-action'
          }}), this.actualizarListado() },
          error: (error) => { console.log(error); }
        })

      } else if (result.isDenied) {

      }
    })
  }

  nuevoUsuario() {
    this.router.navigateByUrl("/usuarios/alta");
  }



}
