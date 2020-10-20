import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor(
    public auth: AuthService
  ) { }
  
  endTime: number;
  time: number = 1.0;
  interval: any;
  gameStarted: boolean = false;
  win: boolean = false;
  lastResults: string[] = [];
  bet: any[];
  prize: number;
  
  makeRandomNumber(min: number, max: number){  
    return min + (max - min) * Math.random()
  }

  startGame(){
    this.endTime = Number(this.makeRandomNumber(1.1, 10.0).toFixed(1));
    if(this.bet){
      this.bet = null;
    }
    if(this.gameStarted === false){      
      setTimeout(() => {
        this.win = false;
        this.gameStarted = true;
        this.time = 1.0;
        this.interval = setInterval(() => {
          if(Number(this.time.toFixed(1)) < this.endTime) {
            this.time = Number(this.time.toFixed(1)) + 0.1; 
          }else{
            this.endGame();
          }
          if(this.bet && this.bet[1] && Number(this.time.toFixed(1)) === this.bet[1]){
            this.handleWin();
          }
        }, 200)
      }, 5000)
    }
  }

  endGame(){
    this.gameStarted = false;
    clearInterval(this.interval);
    this.handleLastResults();
    if(this.bet){
      if(this.win){
        this.bet.push(this.prize);
        this.auth.pushBetHistory(this.bet);
        return this.startGame();
      }
      this.bet.push(-this.bet[0]);
      this.auth.pushBetHistory(this.bet);
      return this.startGame();
    }
    this.startGame();
  }

  handleLastResults(){
    if(this.lastResults.length > 6){
      let sliceArray = this.lastResults.slice(1);
      this.lastResults = sliceArray.concat(this.time.toFixed(1)); 
    }else if(this.lastResults.length <= 6){
      this.lastResults = [...this.lastResults, this.time.toFixed(1)];
    }
  }

  handleBet(amount: number, cashOut: number){
    this.auth.deductBalance(amount);
    this.bet = [amount, cashOut];
  }

  handleWin(){
    this.win = true;
    this.prize = Number(this.bet[0]) * Number(this.bet[1]);
    this.auth.addBalance(this.prize);
  }

}
