import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _refresh$ = new Subject<void>();
  URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  get refresh$(){
    return this._refresh$;
  }


  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.URL+'teams');
  }
  
  saveTeam(team: any): Observable<any> {
    return this.http.post<any>(this.URL+'teams', team)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  getStandings(): Observable<any[]> {
    return this.http.get<any[]>(this.URL+'standings')
  }
  

}
