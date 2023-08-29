import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../Services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.usuarioLogueado()) {
      if (!this.loginService.checkCanLoad(route.data['roles'])) {
        this.displayErrors("Usted no tiene los permisos necesarios para acceder a esta sección del sitio", "Error");
        this.router.navigate(['/home']);
      }
      return true;
    }

    this.displayErrors("Se requiere que inicie sesion", "Error");
    this.router.navigate(['/login']);
    return false;
  }

  displayErrors(errorMessage: string, title: string): void {
    Swal.fire({ text: errorMessage, confirmButtonColor: "#2c5672" });
  }
  
}
