import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  formulario: FormGroup = new FormGroup({});
  listMatchs: any[] = []; 

  constructor(private fb: FormBuilder, private apiService: ApiService, private alertController: AlertController) {}

  ngOnInit(): void {

      this.formulario = this.fb.group({
      match: ['', Validators.required],
      homeScore: [0, [Validators.required, Validators.min(0)]],
      awayScore: [0, [Validators.required, Validators.min(0)]]
    });

    this.listMacth();

  }


  listMacth(){
    this.apiService.getMatchs().subscribe(
      (response: any[]) => {
        this.listMatchs = response;
      }, error => {
        console.log("Error de la api: ", error);
      }
    )
  }


  async guardarResultado() {
    if (this.formulario.valid) {

      const formValues = this.formulario.value;
      const matchId = formValues.match;

      this.apiService.sendResult(matchId, this.formulario.value).subscribe({
        next: async (response) => {

          const alert = await this.alertController.create({
            header: '¡Éxito!',
            message: 'El resultado se guardó correctamente.',
            buttons: ['OK'],
          })
          await alert.present();

          this.formulario.reset();
          this.listMacth();
        },
        error: async (err) => {
          console.error(err)
        } 
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
