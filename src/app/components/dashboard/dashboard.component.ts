import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ControlContainer} from '@angular/forms'; 
import  errors  from '../../utils/errorCodes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  betForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, this.amountError]),
    cashOut: new FormControl('', [Validators.required, this.cashOutError]),
  })
  
  controlNames = {
    amount: this.betForm.get('amount'),
    cashOut: this.betForm.get('cashOut')
  }
  

  constructor(
    public auth: AuthService
  ) { 
  }

  ngOnInit(): void { 
  }

  amountError(control: AbstractControl): {[key: string]: boolean} | null{   
    if(control.value && control.value < 10){
      return {'minBet': true};
    }
    if(control.value && control.value > 100000){
      return {'maxBet': true};
    }
    return null;
  }
  
  cashOutError(control: AbstractControl): { [key: string]: boolean} | null {
    if(control.value && (control.value < 1.10 || control.value > 10.0)) {
      return  {'cashOut': true};
    }
    return null;
  }

  getErrorMessage(input: string) {
    let errorsAux: any;
    if (this.controlNames[input]) errorsAux = this.controlNames[input].errors;
    if (errorsAux) {
      const keys = Object.keys(this.controlNames[input].errors);
      if (!keys || keys.length === 0) return '';
      return errors[Object.keys(this.controlNames[input].errors)[0]];
    } else {
      return '';
    }
  }

  sendForm(): void {
    this.betForm.markAllAsTouched();
    if(this.betForm.invalid){
      return;
    }
    
    return console.log("Apuesta hecha")
  }


}
