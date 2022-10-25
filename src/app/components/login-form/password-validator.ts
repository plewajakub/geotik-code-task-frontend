import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  if (!value) {
    return null
  }

  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `Haslo musi zawierac przynajmniej 1 wielka litere` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `Haslo musi zawierac przynajmniej 1 mala litere` };
  }


  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `Haslo musi zawierac przynajmniej 1 cyfre` };
  }
  return null;
}