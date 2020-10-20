import { AuthService } from './../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from './../../services/game.service';
import { AddFundsComponent } from './../../modals/add-funds/add-funds.component';
import { FormErrorsService } from './../../services/form-errors.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  betForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, this.amountError, this.balanceError(this.auth)]),
    cashOut: new FormControl('', [Validators.required, this.cashOutError]),
  })
  
  controlNames = {
    amount: this.betForm.get('amount'),
    cashOut: this.betForm.get('cashOut')
  }
  
  constructor(
    public auth: AuthService,
    public errors: FormErrorsService,
    public dialog: MatDialog,
    public game: GameService,
    private snackBar: MatSnackBar
  ) { 
  }

  ngOnInit(): void { 
    this.game.startGame();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(AddFundsComponent);
  }

  amountError(control: AbstractControl): {[key: string]: boolean} | null{   
    if(control.value && control.value < 10){
      return {'minBet': true};
    }
    if(control.value && control.value > 100000){
      return {'maxBet': true};
    }else if(!control.value){
      return {'minBet': true};
    }
    return null;
  }

  balanceError(service: AuthService){
    return (control: AbstractControl) => {
        if(control.value && control.value > service.user.balance){
          return {'outOfFunds': true};
        }
      return null;
    }
  }
  
  cashOutError(control: AbstractControl): { [key: string]: boolean} | null {
    if(control.value && (control.value < 1.10 || control.value > 10.0)) {
      return  {'cashOut': true};
    }else if(!control.value){
      return  {'cashOut': true};
    }
    return null;
  }

  placeBet(): void {
    this.betForm.markAllAsTouched();
    if(this.betForm.invalid){
      return;
    }
    if(this.game.gameStarted){
      return;
    }
    this.game.handleBet(this.betForm.get('amount').value, this.betForm.get('cashOut').value);
    this.betForm.reset();
    this.snackBar.open("¡Apuesta hecha!", "Ok", {
      duration: 4000,
      horizontalPosition: "left",
      verticalPosition: "bottom"
    })
  }


}
