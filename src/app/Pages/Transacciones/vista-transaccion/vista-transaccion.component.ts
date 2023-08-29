import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DTOTransacciones } from 'src/app/Models/transacciones';
import { NavbarService } from 'src/app/Services/navbar.service';
import { TransaccionesService } from 'src/app/Services/transacciones.service';


@Component({
  selector: 'app-vista-transaccion',
  templateUrl: './vista-transaccion.component.html',
  styleUrls: ['./vista-transaccion.component.css']
})
export class VistaTransaccionComponent implements OnInit, OnDestroy {
  transaccion!: DTOTransacciones;
  @Input() id!: number;
  @Input() offCanvasVista: boolean = false;


  private subscription: Subscription = new Subscription();

  constructor(private servicio: TransaccionesService, private nav: NavbarService) { }

  ngOnInit(): void {
    this.getTransaccion(this.id);
    this.nav.show();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTransaccion(id: number) {
    this.servicio.GetTransaccionByID(id).subscribe({
      next: (data) => { this.transaccion = data; },
      error: (error) => { console.log(error); }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.getTransaccion(changes['id'].currentValue);
    }
  }

  mostrar() {
    this.offCanvasVista = true;
  }

  ocultar() {
    this.offCanvasVista = false;
    this.ngOnDestroy();
  }

}

