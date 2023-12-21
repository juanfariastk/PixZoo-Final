import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserLogin } from '../../shared/types/login.type';
import { UserRegister } from '../../shared/types/register.type';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.URL_API;

  constructor(private http: HttpClient, private router: Router, private userService:UserService) {}

  register(userData: UserRegister) {
    return this.http.post(`${this.BASE_URL}/users`, userData);
  }

  login(credentials: UserLogin) {
    return this.http.post(`${this.BASE_URL}/login`, credentials).pipe(
      catchError((error: any) => {
        return throwError('Login falhou: ' + error.message);
      }),
      map((response: any) => {
        if (response.userType === 'customer' || response.userType === 'administrator') {
          this.userService.setCurrentUser(response); 
          if (response.userType === 'customer') {
            this.router.navigate(['/dashboard']);
          } else if (response.userType === 'administrator') {
            this.router.navigate(['/admin/all']);
          }
        }
        return response;
      })
    );
  }
}
