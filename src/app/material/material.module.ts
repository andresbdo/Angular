import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const MaterialComponents = [
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule
]

@NgModule({
  imports: [ CommonModule, MaterialComponents], 
  exports: [MaterialComponents]
})
export class MaterialModule { }
