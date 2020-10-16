import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {

  interval;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {

    this.interval = setInterval(() => this.getPersons(), 5000);

    this.api.players$.subscribe(players => console.log({players}));
  }

  ngOnDestroy(): void{
    clearInterval(this.interval);
  }

  getPersons(): void{
    this.api.getPersons().subscribe(res => {
      this.api.updatePlayers(this.shuffle(res));
    });
  }


  shuffle(arra1): any[] {
    let ctr = arra1.length;
    let temp;
    let index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }

}
