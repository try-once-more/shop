import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validates a username to ensure it follows a specific pattern:
 * - Starts with an uppercase letter (Unicode uppercase).
 * - Followed by one or more lowercase letters (Unicode lowercase).
 * - No spaces, special characters, or numbers are allowed.
 *
 * @param control The form control to validate.
 * @returns A ValidationErrors object if the username is invalid, or null if it's valid.
 */
export function usernameValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\p{Lu}\p{Ll}+$/u;
    return pattern.test(control.value)
        ? null
        : { invalidUsername: true };
}


