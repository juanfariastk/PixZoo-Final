import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from 'src/app/shared/types/login.type';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined; 
  //private user:UserLogin={email:'email@cnpjoto.com', password:'123456789'}
  email: string = ''; 
  password: string = ''; 
  
  constructor(private authService: AuthService, private snackbar:MatSnackBar) {}

  login() {
    const user: UserLogin = { email: this.email, password: this.password };
    this.authService.login(user)
      .pipe(
        catchError(error => {
          console.error('Erro no login:', error);
          this.Showerrorsnackbar()
          return of(null); 
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Login bem sucedido');
        }
      });
  }
  
  Showerrorsnackbar() {
    this.snackbar.open("Erro ao realizar login!","Fechar",{duration:3000})
  }
}
