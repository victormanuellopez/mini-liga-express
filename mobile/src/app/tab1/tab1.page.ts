import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  matchs: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
      this.getAllMatchs();
  }

  getAllMatchs(){
    this.apiService.getMatchs().subscribe(
      (response: any[]) => {
        this.matchs = response;
      }, error => {
        console.log("Error de la api: ", error);
      }
    )
  }

}
