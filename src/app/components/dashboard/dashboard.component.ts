import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: string;
  constructor(
    public auth: AuthService
  ) { 
    this.user = this.auth.user.username
  }

  ngOnInit(): void { 
  }

}
