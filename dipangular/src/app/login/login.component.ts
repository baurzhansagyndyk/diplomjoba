import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string = '';
  userName: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {

  }

loginForm : FormGroup = new FormGroup({
  "userName": new FormControl(this.userName, Validators.required),
  "password": new FormControl(this.password, Validators.required)
});
  get form(){
    return this.loginForm;
  }

  login(){
    const form = this.form;
    const username = form.controls['userName'].value;
    const password = form.controls['password'].value;
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['profile']),
      error => {this.error = error;
        console.log(this.error);
      }
    );
    if(username == 'admin' && password == 'admin123!'){
      localStorage.setItem('user','admin');
    }
    else {
      localStorage.setItem('user','author');
    }
  }
}
