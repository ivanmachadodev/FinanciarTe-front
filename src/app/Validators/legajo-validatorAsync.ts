
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { UsuarioService } from "../Services/usuario.service";

export class LegajoValidator {
    static legajoValidator(servicio: UsuarioService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return servicio.checkIfLegajoExists(control.value).pipe(
                map((result: boolean) => {
                    return result ? { legajoAlreadyExists: result } : null;
                })
            )
        }
    }
}