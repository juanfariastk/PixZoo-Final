import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CpfPipe } from '../shared/pipes/cpf.pipe';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UsersRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule
  ]
})
export class UsersModule { }
