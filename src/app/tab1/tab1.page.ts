import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { GlobalSurveyervice } from '../services/firebase-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  userForm: FormGroup;
  

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private globalSurveyervice: GlobalSurveyervice
    ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      padecimientoCovid: ['', [Validators.required]],
      tipoDePadecimiento: ['', [Validators.required]],
      sintomas: ['', [Validators.required]],
      recaida: ['', [Validators.required]],
      ingresoHospitalario: ['', [Validators.required]],
      contactoConPersona: ['', [Validators.required]],
      tipoDeExamenRealizado: ['', [Validators.required]],
      contagioEnCasa: ['', [Validators.required]],
    })  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Encuesta',
      message: 'Favor de llenar todos los campos',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  get getControl(){
    return this.userForm;
  }
  
  onSubmit(){
    if(this.userForm.status === 'INVALID'){
      this.presentAlert()
    }else{
      this.globalSurveyervice.create(this.userForm.value)
    }
  }

  

}
