import { User } from './models/User';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;

  constructor(){
    this.getUserFromLocalStorage();  
  }

  login(inputUsername: string){
    if(!this._user){
      this._user = new User();
      this._user.username = inputUsername;
      localStorage.setItem('user', JSON.stringify(this._user));
    }
  }

  public get user(): User{
    return this._user;
  }

  getUserFromLocalStorage(){
    if(localStorage.getItem('user')){
      this._user = JSON.parse(localStorage.getItem('user'));
    }
  }
}
