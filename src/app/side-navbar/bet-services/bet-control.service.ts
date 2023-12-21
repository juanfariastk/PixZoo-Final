import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBet } from 'src/app/shared/types/dataBet.type';
import { UserService } from 'src/app/users/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetControlService {
  BASE_URL = environment.URL_API;

  constructor(private http: HttpClient, private userService:UserService) {}

  test(): Observable<any> {
    return this.userService.getCurrentUserAllData();
  }

  createBet(userBet:DataBet){
    return this.http.post(`${this.BASE_URL}/userBet`, userBet);
  }

  listBets(){
    const user = this.userService.getCurrentUser();
    const userId = user?.userId; 
    if (userId !== undefined) {
      return this.http.get(`${this.BASE_URL}/userBet/${userId}`);
    }
    return;
  }
}
