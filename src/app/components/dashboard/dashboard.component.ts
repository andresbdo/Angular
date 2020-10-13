import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  betForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(10), Validators.max(100000)]),
    cashOut: new FormControl('', [Validators.required, Validators.min(1.1), Validators.max(10.0)]),
  })
  
  public amount = this.betForm.get('amount');
  public cashOut = this.betForm.get('cashOut');

  getErrorMessage(input: string) {
    if(input === "amount"){
      if(this.amount.hasError('required')) {
        return 'Este campo es requerido';
      }else if(this.amount.hasError('min')){
        return 'El monto mínimo de la apuesta es 10$';
      }else if(this.amount.hasError('max')){
        return 'El monto máximo de la apuesta es 100.000$'
      }
      return '';
    }else if(input === "cashOut"){
      if(this.cashOut.hasError('required')){
        return 'Este campo es requerido';
      }else if(this.cashOut.hasError('min') || this.cashOut.hasError('max')){
        return 'La salida debe estar entre 1.1 y 10.0'
      }
      return '';
    }
    return '';
  }

  sendForm(): void {
    this.betForm.markAllAsTouched();
    if(this.amount.hasError('required') || this.amount.hasError('min') || this.amount.hasError('max')){
      return;
    }
    if(this.amount.hasError('required') || this.amount.hasError('min') || this.amount.hasError('max')){
      return;
    }else{
      return console.log("Apuesta hecha")
    }
  }

  constructor(
    public auth: AuthService
  ) { 
  }

  ngOnInit(): void { 
  }

}
