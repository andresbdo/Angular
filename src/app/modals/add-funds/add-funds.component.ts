import { MatDialogRef } from '@angular/material/dialog';
import { FormErrorsService } from './../../services/form-errors.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.scss']
})
export class AddFundsComponent implements OnInit {
  balanceForm:FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(10), Validators.max(100000)]),
  })
  
  controlNames = {
    amount: this.balanceForm.get('amount')
  };

  constructor(
    public auth: AuthService,
    public errors: FormErrorsService,
    public dialogRef: MatDialogRef<AddFundsComponent>
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  updateBalance(){
    this.balanceForm.markAllAsTouched();
    if(this.balanceForm.invalid){
      return;
    }
    this.auth.updateBalance(this.balanceForm.get('amount').value, "add");
    this.dialogRef.close(true); 
  }

}
