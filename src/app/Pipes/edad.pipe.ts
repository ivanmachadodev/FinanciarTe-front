import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: Date): number {
    const nacimiento = new Date(value);
    const hoy = new Date();
    const diff = hoy.getTime() - nacimiento.getTime();
    const edadEnMilisegundos = diff;
    const edadEnAños = edadEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(edadEnAños);
  }

}
