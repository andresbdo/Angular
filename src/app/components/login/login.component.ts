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
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  })
  public username = this.loginForm.get('username');

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Ingresa un nombre de usuario';
    }else if(this.username.hasError('minlength') || this.username.hasError('maxlength')){
      return 'El nombre de usuario debe tener entre 3 y 20 caracteres';
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
    }else{
      this.auth.login(this.username.value)
      this.router.navigate(['dashboard']);
    }
  }

}
