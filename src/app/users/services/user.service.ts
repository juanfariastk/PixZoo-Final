import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, mergeMap } from 'rxjs';
import { UserAllData } from 'src/app/shared/types/userAllData.type';
import { UserLogged } from 'src/app/shared/types/userLogged.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  BASE_URL = environment.URL_API;

  private currentUserSubject: BehaviorSubject<UserLogged | null>;
  public currentUser: Observable<UserLogged | null>;

  constructor(private http: HttpClient,  private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserLogged | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public setCurrentUser(user: UserLogged): void {
    this.currentUserSubject.next(user);
  }

  public getCurrentUser(): UserLogged | null {
    return this.currentUserSubject.value;
  }

  public getCurrentUserAllData(): Observable<UserAllData | null> {
    const user = this.currentUserSubject.value;
    if (user) {
      return this.http.get<UserAllData>(`${this.BASE_URL}/users/${user.userId}`);
    } else {
      return new Observable<UserAllData | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  public updateAmountDeposited(amount: number): Observable<UserAllData> {
    return this.getCurrentUserAllData().pipe(
      mergeMap((userData) => {
        if (!userData) {
          throw new Error('O usuário não está logado.');
        }
  
        if (userData.amountDeposited === undefined) {
          throw new Error('O usuário não possui saldo definido.');
        }
  
        if (amount > userData.amountDeposited) {
          throw new Error('O valor da aposta é maior do que o saldo disponível.');
        }
  
        let updatedAmount = userData.amountDeposited - amount;

        if(updatedAmount == amount) updatedAmount = 0;
        console.log(updatedAmount)
        return this.http.put<UserAllData>(`${this.BASE_URL}/users/${userData.id}`, { amountDeposited: updatedAmount });
      })
    );
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${userId}`).pipe(
      mergeMap(() => {
        this.clearCurrentUser(); 
        this.router.navigate(['/login']);
        return new Observable<any>((observer) => {
          observer.next(null);
          observer.complete();
        });
      })
    );
  }

  public updateUser(userId: number, name: string, email: string): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/users/${userId}`, { name, email });
  }

  public clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }

  public logoffUser():void{
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
