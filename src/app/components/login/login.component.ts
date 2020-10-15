import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'; 
import { Router } from '@angular/router';
import errors from '../../utils/errorCodes';



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
  
  controlNames = {
    username: this.loginForm.get('username'),
    amount: this.loginForm.get('amount')
  };

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

  getErrorMessage(input: string) {
    let errorsAux;
    if (this.controlNames[input]) errorsAux = this.controlNames[input].errors;
    if (errorsAux) {
      const keys = Object.keys(this.controlNames[input].errors);
      if (!keys || keys.length === 0) return '';
      console.log(errors[Object.keys(this.controlNames[input].errors)[0]])
      return errors[Object.keys(this.controlNames[input].errors)[0]];
    } else {
      return '';
    }
  }


  sendForm(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      return;
    }else{
      this.auth.login(this.controlNames.username.value, this.controlNames.amount.value)
      this.router.navigate(['dashboard']);
    }
  }

}
