import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-team',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss'
})
export class AddTeamComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService){}

  formTeam!: FormGroup;

  @Output() refreshTable = new EventEmitter<void>();

  get nombre(){
    return this.formTeam.get('name') as FormControl;
  }
  
  ngOnInit(): void {
    this.formTeam = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]]
    });   
  }

  saveTeam(){
    if (this.formTeam.invalid) {
      this.formTeam.markAllAsTouched(); 
      return;
    }
    this.apiService.saveTeam(this.formTeam.value).subscribe(
      response => {

        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Se guardo correctamente el nombre',
          });
        }, 200);
        this.refreshTable.emit();
        this.formTeam.reset();
      }, error => {
        console.log("Error de la Api", error);
      }
    );
  }



}
