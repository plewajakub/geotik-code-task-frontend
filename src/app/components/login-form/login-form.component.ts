import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PasswordValidator } from './password-validator';
import { ConnectionServiceService } from 'src/app/services/connection-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  selectedPage=0;
  loginResponse='';
  // formularz logowania
  loginForm = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });
  //formularz rejestracji
  registerForm = this.formBuilder.group(
  {
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8), PasswordValidator]),
    'rPassword': new FormControl('', [Validators.required])
  },
  {
    // custom validator - czy hasla sa takie same
    validators: [this.passwordMatchValidator('password', 'rPassword')]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private connection: ConnectionServiceService, private _snackBar: MatSnackBar) {}

  passwordMatchValidator(password1: string, password2: string) {
    return(fg: FormGroup)=> {
      const password = fg.controls[password1];
      const rPassword = fg.controls[password2];
      if (rPassword.errors && !rPassword.errors["passwordsDontMatch"]) {
        
      }
      if (password.value !== rPassword.value) {
      rPassword.setErrors({ passwordsDontMatch: true });
      } else {
      rPassword.setErrors(null);
      }
    }
    
  }
 
  updateProgressBar() {
    if (this.registerForm.controls['password'].valid) {
      return 100;
    } else if(this.registerForm.controls['password'].value == '') {
      return 0;
    }
    return 10;
  }

   loginSubmit() {
    if(this.loginForm.invalid) {return;}
    console.log(this.loginForm);
    let loginData = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    };
    this.connection.loginUser(loginData).subscribe(response => {
      console.log(response);
      this.loginResponse = response.status+" "+response.statusText
    }, error => {
      this.loginResponse = error.status+" "+error.statusText;
    });
   }


   registerSubmit() {
    if(this.registerForm.invalid) {return;}
    console.log(this.registerForm);
    let registerData = {
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password
    };
    this.connection.registerUser(registerData).subscribe(response => {
      console.log(response);
      this._snackBar.open("Zarejestrowano", "OK");
      this.selectedPage = 0;
      this.registerForm.reset();
    });
   }
   
}
