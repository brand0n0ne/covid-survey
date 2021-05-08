import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { GlobalSurveyervice } from '../services/firebase-service';
import { Plugins } from '@capacitor/core';
const { Geolocation, Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  userForm: FormGroup;
  lat: Number;
  lng: Number;
  submittedForm = 'false';


  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private globalSurveyervice: GlobalSurveyervice
  ) { }

  ngOnInit(): void {
    Geolocation.getCurrentPosition().then((position) => {

      console.log(position);
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude

    }, (err) => {

      console.error('Could not initialise map');

    });
    this.userForm = this.formBuilder.group({
      padecimientoCovid: ['', [Validators.required]],
      tipoDePadecimiento: ['', [Validators.required]],
      sintomas: ['', [Validators.required]],
      recaida: ['', [Validators.required]],
      ingresoHospitalario: ['', [Validators.required]],
      contactoConPersona: ['', [Validators.required]],
      tipoDeExamenRealizado: ['', [Validators.required]],
      contagioEnCasa: ['', [Validators.required]]
    })

    this.hasSubmitted()
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

  async redoSurvey (){
    this.userForm.reset();
    await Storage.set({
      key: 'submittedSurvey',
      value: 'false'
    });

    this.submittedForm = 'false' 
  }


  async hasSubmitted(){
    const { value } = await Storage.get({ key: 'submittedSurvey' });
    this.submittedForm = value
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'Completado',
      subHeader: 'Encuesta',
      message: 'Gracias por llenar tu encuesta, tus datos estan protegidos ante la ley federal de protección de datos en posesión de los particulares',
      buttons: ['OK']
    });

    await alert.present();

    await Storage.set({
      key: 'submittedSurvey',
      value: 'true'
    });

    this.submittedForm = 'true'

    const { role } = await alert.onDidDismiss();
  }

  get getControl() {
    return this.userForm;
  }

  onSubmit() {
    if (this.userForm.status === 'INVALID') {
      this.presentAlert()
    } else {
      this.presentSuccess();
      this.userForm.value.latitude = this.lat
      this.userForm.value.longitude = this.lng
      this.globalSurveyervice.create(this.userForm.value)
    }
  }



}
