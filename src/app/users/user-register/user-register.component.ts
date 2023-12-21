import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { UserRegister } from 'src/app/shared/types/register.type';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm | undefined; 
  
  name: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';
  CPF: string = '';
  amountDeposited: number = 0;
  cpfPipe: CpfPipe = new CpfPipe;

  registrationSuccess: boolean = false;
  showProgressBar: boolean = false;

  error409: boolean = false;
  errorMessage409: string = '';

  constructor(private authService:AuthService,  private router: Router ){}

  formatCPF(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const cpfValue = inputElement.value;
    const cpfFormatted = this.cpfPipe.transform(cpfValue);
    this.CPF = cpfFormatted;
  }  

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  register() {
    if(this.error409){
      this.error409 = false;
    }
    
    if (this.birthday) {
      const date = new Date(this.birthday);
      const userData: UserRegister = {
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: this.formatDate(date),
        CPF: this.CPF,
        amountDeposited: this.amountDeposited
      };
  
      this.showProgressBar = true;
  
      this.authService.register(userData).subscribe(response => {
        this.registrationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.showProgressBar = false;
          this.error409 = true;
          this.errorMessage409 = 'O registro com este email ou CPF já existe. Por favor, use dados válidos.';
        } else {
          console.error('Erro inesperado:', error.message);
        }
      });
    }
  }
  

}
