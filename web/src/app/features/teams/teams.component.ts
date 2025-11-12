import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTeamComponent } from "./modals/add-team/add-team.component";

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddTeamComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {

  constructor(private apiService: ApiService){}

  listaTeams: any[] = [];

  ngOnInit(): void {
      this.getAllTeams();
  }

  getAllTeams(){
    this.apiService.getTeams().subscribe(
      (response: any[]) => {
        this.listaTeams = response;
      }, error => {
        console.log("Error de la api: ", error);
      }
    )
  }

  onRefreshTable(){
    this.getAllTeams();
  }



}
