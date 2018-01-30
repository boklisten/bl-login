import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from "./login.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
