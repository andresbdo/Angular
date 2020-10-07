import { AuthService } from '../../auth.service';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit { 
  loginForm:FormGroup = new FormGroup({
    username: new FormControl('')
  })

  constructor(
    public router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    if(this.auth.user.username){
      this.router.navigate(['dashboard']);
    }
  }

  sendForm(): void {
    this.loginForm.markAllAsTouched();
    let username = this.loginForm.get('username');
    if(username.hasError('required') || username.hasError('minlength') || username.hasError('maxlength')){
      return;
    }else{
      this.auth.login(username.value)
      this.router.navigate(['dashboard']);
    }
  }

}
