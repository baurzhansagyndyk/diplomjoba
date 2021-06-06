import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [ProfileComponent, SignUpComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ModulesModule { }
