import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error:string = '';
  userName: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  signUpForm : FormGroup = new FormGroup({
    "userName": new FormControl(this.userName, Validators.required),
    "email": new FormControl(this.email, Validators.required),
    "password1": new FormControl(this.password1, Validators.required),
    "password2": new FormControl(this.password2, Validators.required)
});
  get form(){
    return this.signUpForm;
  }

  signUp(){
    const form = this.form;
    const username = form.controls['userName'].value;
    const email = form.controls['email'].value;
    const password1 = form.controls['password1'].value;
    const password2 = form.controls['password2'].value;
    console.log(username,email,password1,password2);
    this.authService.signup(username, email, password1, password2).subscribe(
      success => this.router.navigate(['profile']),
      error => {this.error = error;
      console.log(this.error);
      }
    );
  }
}
