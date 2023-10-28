import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from "@angular/forms";

@Directive({
    selector: "[appEmailValidation]",
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidationDirective,
            multi: true
        }
    ]
})
export class EmailValidationDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return Validators.email(control);
    }
}
