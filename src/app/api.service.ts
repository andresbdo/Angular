import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private playersSrc = new BehaviorSubject<any>([]);
  public players$ = this.playersSrc.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPersons(): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.get('https://jsonplaceholder.typicode.com/users', {headers}).pipe(share());
  }

  updatePlayers(players: any[]): void{
    this.playersSrc.next(players);
  }
}
