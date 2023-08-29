import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ClienteService } from "../Services/cliente.service";

export class DniValidator {
    static dniValidator(servicio: ClienteService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return servicio.checkIfDniExists(control.value).pipe(
                map((result: boolean) => {
                    return result ? { dniAlreadyExists: result } : null;
                })
            )
        }
    }

}
