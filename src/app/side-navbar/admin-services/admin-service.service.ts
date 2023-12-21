import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalDraw, GetAnimalDrawResponse, PostAnimalDrawRequest, PostAnimalDrawResponse } from 'src/app/shared/types/animal.type';
import { UserBet } from 'src/app/shared/types/userBet.type';
import { UserData } from 'src/app/shared/types/userData.type';
import { UserLogged } from 'src/app/shared/types/userLogged.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  getLoginData(): Observable<UserLogged[]> {
    return this.http.get<UserLogged[]>(`${this.BASE_URL}/login`);
  }

  getAllUsersData(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.BASE_URL}/users`);
  }

  getAllUserBets(): Observable<UserBet[]> {
    return this.http.get<UserBet[]>(`${this.BASE_URL}/userBet/all`);
  }

  getAnimalDraws(draws: string): Observable<AnimalDraw[]> {
    return this.http.get<AnimalDraw[]>(`${this.BASE_URL}/animals/draw/${draws}`);
  }

  getActualAnimalDraw(): Observable<GetAnimalDrawResponse> {
    return this.http.get<GetAnimalDrawResponse>(`${this.BASE_URL}/animals/draw`);
  }

  postAnimalDraw(data: PostAnimalDrawRequest): Observable<PostAnimalDrawResponse> {
    return this.http.post<PostAnimalDrawResponse>(`${this.BASE_URL}/animals/draw`, data);
  }
  
  putAnimalFraud(data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/animals/fraud`, data);
  }
}
