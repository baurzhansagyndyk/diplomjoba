import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContactForm } from '../models/contact-form.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    comments: ['', Validators.required],
  });
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  get cf() {
    return this.contactForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}

  submitForm(): void {
    const value = this.contactForm.value;
    const form: ContactForm = {
      email: value.email,
      name: value.name,
      phoneNumber: value.phoneNumber,
      comments: value.comments,
    };
    this._apiService.sendContactForm(form).subscribe((response) => {
      this.contactForm.reset();
      this._snackBar.open(response.message, 'Жабу', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar'],
        duration: 3000,
      });
    });
  }
}
