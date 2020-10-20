import { User } from '../models/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;

  constructor(){
    this.getUserFromLocalStorage();  
  }

  login(inputUsername: string, inputBalance: number){
    if(!this._user){
      this._user = new User();
      this._user.username = inputUsername;
      this._user.balance = inputBalance;
      this._user.betHistory = [];
      this.setUserToLocalStorage();
    }
  }

  public updateBalance(amount: number, operation: string){
    if(this.user){
      if(operation === "add"){
        let newBalance = this._user.balance + amount;
        this._user.balance = newBalance;
        this.setUserToLocalStorage();
      }else if(operation === "deduct"){
        let newBalance = this._user.balance - amount;
        this._user.balance = newBalance;
        this.setUserToLocalStorage();
      }
    }
    return;
  }

  public pushBetHistory(bet: any[]){
    if(this._user.betHistory.length > 4){
      let sliceArray = this._user.betHistory.slice(1);
      this._user.betHistory = [...sliceArray, bet]; 
    }else if(this._user.betHistory.length <= 4){
      this._user.betHistory = [...this._user.betHistory, bet];
    }
    this.setUserToLocalStorage();
    console.log(this._user.betHistory);
    
  }

  public get user(): User{
    return this._user;
  }

  getUserFromLocalStorage(){
    if(localStorage.getItem('user')){
      this._user = JSON.parse(localStorage.getItem('user'));
    }
  }

  setUserToLocalStorage(){
    if(this._user){
      localStorage.setItem('user', JSON.stringify(this._user));
    }
  }
}
