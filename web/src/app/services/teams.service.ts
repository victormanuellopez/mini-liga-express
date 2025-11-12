import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private _refresh$ = new Subject<void>();

  URL: string = environment.API_URL+'teams';

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getTeams(): Observable<any[]>{
    return this.http.get<any[]>(this.URL);
  }

  
}
