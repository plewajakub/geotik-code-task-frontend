import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConnectionServiceService } from 'src/app/services/connection-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  submitted=false;
  responseMessage='';
  forgotPasswordForm = this.formBuilder.group ({
    'email': new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private formBuilder: FormBuilder, private connection: ConnectionServiceService) { }

  forgotPasswordSubmit(){
    let email = this.forgotPasswordForm.value.email;
    this.connection.resetPassword(email).subscribe(response => {
      console.log(response);
      this.responseMessage = "Haslo zostalo zresetowane, sprawdz skrzynke e-mail."
      this.submitted = true;
    }, error => {
      console.log(error);
    })
  }

}
