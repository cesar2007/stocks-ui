import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  userNotVerified = false;
  invalidLogin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router){}

  ngOnInit():void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  get email(){
    return this.form.controls['email'].value;
  }

  get password(){
    return this.form.controls['password'].value;
  }

  onSubmit() {
    this.authService.basicLoginWithEncryption(this.email, this.password).subscribe(
      data => {
        this.invalidLogin = false;
        this.router.navigate(['/home']);
      },
      error => {
        console.log('there was an error in the response', error);
      }
    )
  }

}
