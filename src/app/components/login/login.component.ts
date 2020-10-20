import { FormErrorsService } from './../../services/form-errors.service';
import { AuthService } from '../../services/auth.service';
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
  
  controlNames = {
    username: this.loginForm.get('username'),
    amount: this.loginForm.get('amount')
  };

  constructor(
    public router: Router,
    public auth: AuthService,
    public errors: FormErrorsService
  ) {
  }

  ngOnInit(): void {
    if(this.auth.user){
      this.router.navigate(['dashboard']);
    }
  }


  sendForm(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      return;
    }else{
      this.auth.login(this.loginForm.get('username').value, this.loginForm.get('amount').value);
      this.router.navigate(['dashboard']);
    }
  }

}
