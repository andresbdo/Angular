import { User } from './models/User';
import { Injectable } from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User = null;
  constructor(){
    this._user = new User();
    this.getUserFromLocalStorage();  
  }

  login(ingresedUsername: string){
    if(!this._user.username){
      this._user.username = ingresedUsername;
      localStorage.setItem('username', this._user.username);
    }
  }

  public get user(): User{
    return this._user;
  }

  getUserFromLocalStorage(){
    if(!this.user.username){
      this._user.username = localStorage.getItem('username');
    }
  }
}
