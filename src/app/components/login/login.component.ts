import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit { 
  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    amount: new FormControl('', [Validators.required, Validators.min(10), Validators.max(100000)]),
  })

  public username = this.loginForm.get('username');
  public amount = this.loginForm.get('amount');

  getErrorMessage(input: string) {
    if(input === "username"){
      if(this.username.hasError('required')) {
        return 'Este campo es requerido';
      }else if(this.username.hasError('minlength') || this.username.hasError('maxlength')){
        return 'El nombre de usuario debe tener entre 3 y 20 caracteres';
      }
      return '';
    }else if(input === "amount"){
      if(this.amount.hasError('required')){
        return 'Este campo es requerido';
      }else if(this.amount.hasError('min') || this.amount.hasError('max')){
        return 'El monto inicial debe ser mayor a 10$ y menos a 100.000$'
      }
      return '';
    }
    return '';
  }

  constructor(
    public router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    if(this.auth.user){
      this.router.navigate(['dashboard']);
    }
  }

  sendForm(): void {
    this.loginForm.markAllAsTouched();
    if(this.username.hasError('required') || this.username.hasError('minlength') || this.username.hasError('maxlength')){
      return;
    }
    if(this.amount.hasError('required') || this.amount.hasError('min') || this.amount.hasError('max')){
      return;
    }else{
      this.auth.login(this.username.value, this.amount.value)
      this.router.navigate(['dashboard']);
    }
  }

}
