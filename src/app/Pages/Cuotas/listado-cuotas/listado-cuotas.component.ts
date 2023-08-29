import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewCuotaCliente } from 'src/app/Models/cuotas';
import { CuotasService } from 'src/app/Services/cuotas.service';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-listado-cuotas',
  templateUrl: './listado-cuotas.component.html',
  styleUrls: ['./listado-cuotas.component.css']
})
export class ListadoCuotasComponent {
  cuotas: ViewCuotaCliente[] = [];
  idCliente: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private servicio: CuotasService, private router: Router, private params: ActivatedRoute, private nav: NavbarService){}

  ngOnInit(): void {
    this.idCliente = this.params.snapshot.params['id'];
    this.actualizarListado(this.idCliente);
    this.nav.show();
  }

  actualizarListado(id: number){
    this.subscription.add(
      this.servicio.GetViewCuotasCliente(id).subscribe({
        next: (data) => {this.cuotas = data, console.log(this.cuotas)},
        error: (error) => {console.log(error)}
      })
    );
  }

  registrarPagos(id: number){
    this.router.navigateByUrl(`/cuotas/alta/${id}`)
  }

}
