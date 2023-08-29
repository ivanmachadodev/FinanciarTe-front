import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DTOPrestamo } from 'src/app/Models/prestamos';
import { PrestamosService } from 'src/app/Services/prestamos.service';

@Component({
  selector: 'app-vista-prestamo',
  templateUrl: './vista-prestamo.component.html',
  styleUrls: ['./vista-prestamo.component.css']
})
export class VistaPrestamoComponent {
  prestamo!: DTOPrestamo;
  @Input() id!: number;
  @Input() offCanvasVista: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private servicio: PrestamosService) { }

  ngOnInit(): void {
    this.getPrestamo(this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPrestamo(id: number){
    this.subscription.add(
      this.servicio.GetPrestamoByID(id).subscribe({
        next: (data) => {this.prestamo = data, console.log(this.prestamo) },
        error: (error) => {console.log(error)}
      })
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.getPrestamo(changes['id'].currentValue)
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
