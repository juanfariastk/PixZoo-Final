import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animalsArray } from 'src/app/shared/animals/animalsArray';
import { UserAllData } from 'src/app/shared/types/userAllData.type';
import { UserService } from 'src/app/users/services/user.service';
import { AdminService } from '../admin-services/admin-service.service';
import { BetControlService } from '../bet-services/bet-control.service';


@Component({
  selector: 'app-main-content-user',
  templateUrl: './main-content-user.component.html',
  styleUrls: ['./main-content-user.component.scss']
})
export class MainContentUserComponent implements OnInit {
  userDataForm: FormGroup;
  userBets: any[] = [];
  animalsArray = animalsArray;
  actualdraw: any[]= [];
  verifydraw: boolean= false;
  fieldsChanged: boolean = false;

  constructor(
    private betControlService: BetControlService,
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private adminservice: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.userDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      birthday: [''],
      CPF: [''],
      amountDeposited: [''],
    });
  }
  
  getAnimalImageUrl(key: string): string {
    const animal = this.animalsArray.find(animal => animal.name === key);
    return animal ? animal.url : '';
  }
  getactualdraw(){
    this.adminservice.getActualAnimalDraw().subscribe((data)=>{
      if(data.actualDraw&&data.actualDraw.length>0
      ){
        this.verifydraw= true
        this.actualdraw=data.actualDraw
        console.log(this.actualdraw)
      }
    })
  }

  SearchUrl(draw:any):string{
    const animalName =  this.getname(draw)

    const url = this.getAnimalImageUrl(animalName)
    return url
  }

  iscreated(draw: any):boolean{
    return draw.hasOwnProperty("CreatedAt")

  }

  getname(draw:any):string{
    return Object.keys(draw)[0]
  }

  deleteAccount(){
    const userId = this.userService.getCurrentUser()?.userId;
    this.snackBar.open('Redirecionando...','', {
      duration: 2500 
    });
    if (userId) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('Usuário excluído com sucesso.');
        },
        (error) => {
          console.error('Erro ao excluir o usuário:', error);
        }
      );
    } else {
      console.error('Não foi possível obter o ID do usuário para exclusão.');
    }
  }

  changeCurrentUserData() {
    const userId = this.userService.getCurrentUser()?.userId;

    if (userId) {
      const { name, email } = this.userDataForm.value;
      this.userService.updateUser(userId, name, email).subscribe(
        () => {
          console.log('Dados do usuário atualizados com sucesso.');
          this.fieldsChanged = false; 
          this.snackBar.open('Dados alterados com sucesso!','', {
            duration: 3000 
          });
        },
        (error) => {
          console.error('Erro ao atualizar os dados do usuário:', error);
        }
      );
    } else {
      console.error('Não foi possível obter o ID do usuário para atualização.');
    }
  }

  areFieldsChanged(): boolean {
    return this.fieldsChanged; 
  }

  ngOnInit() {

    this.userDataForm.valueChanges.subscribe(() => {
      this.fieldsChanged = this.userDataForm.dirty; 
    });

    this.getactualdraw()
    console.log(this.actualdraw)

    this.userService.getCurrentUserAllData().subscribe((user: UserAllData | null) => {
      if (user) {
        const dateParts = user.birthday.split('/');
        const formattedDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;

        this.userDataForm.patchValue({
          name: user.name,
          email: user.email,
          password: user.password,
          birthday: formattedDate,
          CPF: user.CPF,
          amountDeposited: user.amountDeposited
        });
      }
    });

    this.betControlService.listBets()?.subscribe((bets: any) => {
      if (bets) {
        this.userBets = bets;
      }
    });
  }
}