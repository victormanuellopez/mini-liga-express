import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standings',
  imports: [CommonModule],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss'
})
export class StandingsComponent implements OnInit {

  constructor(private apiService: ApiService){}

  listStandings: any[] = [];

  ngOnInit(): void {
      this.getAllStandings();
  }

  getAllStandings(){
    this.apiService.getStandings().subscribe(
      (response: any[]) => {
        this.listStandings = response;
      }, error => {
        console.log("Error de la api: ", error);
      }
    )
  }

}
