import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const MaterialComponents = [
  MatFormFieldModule, MatInputModule, MatButtonModule
]

@NgModule({
  imports: [ CommonModule, MaterialComponents], 
  exports: [MaterialComponents]
})
export class MaterialModule { }
