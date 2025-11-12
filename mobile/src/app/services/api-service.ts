import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private URL = environment.API_URL;

  constructor(private http: HttpClient){}

  getMatchs(): Observable<any[]>{
    return this.http.get<any[]>(`${this.URL}/matchs`);
  }

  sendResult(matchId: number, result:  any):Observable<any> {
    return this.http.post(`${this.URL}/matches/${matchId}/result`, result);
  }
  
}
