import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animalsArray } from 'src/app/shared/animals/animalsArray';
import { Animal } from 'src/app/shared/types/animal.type';
import { DataBet } from 'src/app/shared/types/dataBet.type';
import { UserAllData } from 'src/app/shared/types/userAllData.type';
import { UserService } from 'src/app/users/services/user.service';
import { BetControlService } from '../bet-services/bet-control.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  animals: Animal[] = animalsArray; 
  selectedAnimals: Animal[] = [];
  betAmount: number=0;

  constructor(private betControlService: BetControlService, private userService:UserService, private snackBar: MatSnackBar, ){}

  toggleSelection(animal: Animal) {
    if (this.isSelected(animal)) {
      this.selectedAnimals = this.selectedAnimals.filter((a) => a !== animal);
    } else if (this.selectedAnimals.length < 5) {
      this.selectedAnimals.push(animal);
    }
  }

  isSelected(animal: Animal): boolean {
    return this.selectedAnimals.includes(animal);
  }

  isAbleToBet(): boolean {
    return this.selectedAnimals.length > 0 && this.betAmount > 0;
  }

  apostar() {

    if (!this.isAbleToBet()) {
      this.snackBar.open('Selecione pelo menos um animal e insira um valor válido.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }

    this.userService.getCurrentUserAllData().subscribe(async (currentUser: UserAllData | null) => {
      if (!currentUser) {
        console.log('O usuário não está logado. Você não pode criar uma aposta.');
        return;
      }

      const animalsSelected = this.selectedAnimals.map((animal) => {
        return {
          key: animal.name,
          value: animal.value.map(String)
        };
      });

      const dataBet: DataBet = {
        userId: currentUser.id, 
        userCPF: currentUser.CPF,
        userEmail: currentUser.email,
        animalsSelected: animalsSelected,
        amountBet: this.betAmount+0.98, 
      };

      try {
        await this.userService.updateAmountDeposited(dataBet.amountBet).toPromise();
        this.snackBar.open('Aposta Realizada! Você pode checar na aba de Conta', 'Fechar', {
          duration: 3500,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        console.log('Saldo atualizado com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar o saldo:', error);
        this.snackBar.open('O valor da aposta é maior do que o saldo disponível.', 'Fechar', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        return;
      }

      try {
        const response = await this.betControlService.createBet(dataBet).toPromise();
        //console.log('Aposta criada com sucesso:', response);
        const responseBets = await this.betControlService.listBets()?.toPromise();
        this.selectedAnimals = [];
      } catch (error) {
        console.error('Erro ao criar a aposta:', error);
      }
    });
  }
}