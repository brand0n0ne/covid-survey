import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { map } from 'rxjs/operators';
import { GlobalSurveyervice } from '../services/firebase-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page implements OnInit, OnDestroy {
  
  @ViewChild('contacto') contactoChart;
  @ViewChild('contagioEnCasa') contagioEnCasaChart;
  @ViewChild('ingresoHospitalario') ingresoHospitalChart;
  @ViewChild('padecimientoCovid') padecimientoChart;
  @ViewChild('recaida') recaidaChart;
  @ViewChild('tipoDePadecimiento') tipoDePadecimientoChart;
  contactoC: any;
  contagio:any;
  hospital:any;
  padecimiento:any;
  recaidaC:any;
  tipoPadecimiento:any;
  

  constructor(private globalSurveyervice: GlobalSurveyervice) {}

  datosFireBase = []
  contacto={
    si: 0,
    no: 0
  }

  contagioEnCasa={
    si: 0,
    no: 0
  }

  ingresoHospitalario={
    si: 0,
    no: 0
  }

  padecimientoCovid={
    si: 0,
    no: 0
  }

  recaida={
    si: 0,
    no: 0
  }

  tipoDePadecimiento={
    Sintomático: 0,
    Asintomático: 0
  }



  ionViewDidEnter() {
    this.createBarCharts();
  }

  ngOnInit() {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.globalSurveyervice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.datosFireBase = data
      this.countItems()
    });
  }

  countItems(): void {
    this.datosFireBase.forEach( value =>{
      if(value.contactoConPersona === 'si'){
        this.contacto.si = this.contacto.si+1
      }
      if(value.contactoConPersona === 'no'){
        this.contacto.no = this.contacto.no+1
      }

      if(value.contagioEnCasa === 'si'){
        this.contagioEnCasa.si = this.contagioEnCasa.si+1
      }
      if(value.contagioEnCasa === 'no'){
        this.contagioEnCasa.no = this.contagioEnCasa.no+1
      }

      if(value.ingresoHospitalario === 'si'){
        this.ingresoHospitalario.si = this.ingresoHospitalario.si+1
      }
      if(value.ingresoHospitalario === 'no'){
        this.ingresoHospitalario.no = this.ingresoHospitalario.no+1
      }

      if(value.padecimientoCovid === 'si'){
        this.padecimientoCovid.si = this.padecimientoCovid.si+1
      }
      if(value.padecimientoCovid === 'no'){
        this.padecimientoCovid.no = this.padecimientoCovid.no+1
      }

      if(value.recaida === 'si'){
        this.recaida.si = this.recaida.si+1
      }
      if(value.recaida === 'no'){
        this.recaida.no = this.recaida.no +1
      }

      if(value.tipoDePadecimiento === 'Sintomático'){
        this.tipoDePadecimiento.Sintomático = this.tipoDePadecimiento.Sintomático+1
      }
      if(value.tipoDePadecimiento === 'Asintomático'){
        this.tipoDePadecimiento.Asintomático = this.tipoDePadecimiento.Asintomático+1
      }
    })

    this.contactoC.data.datasets[0].data = [this.contacto.si, this.contacto.no]
    this.contactoC.update()

    this.contagio.data.datasets[0].data = [this.contagioEnCasa.si, this.contagioEnCasa.no]
    this.contagio.update()

    this.hospital.data.datasets[0].data = [this.ingresoHospitalario.si, this.ingresoHospitalario.no]
    this.hospital.update()

    this.padecimiento.data.datasets[0].data = [this.padecimientoCovid.si, this.padecimientoCovid.no]
    this.padecimiento.update()

    this.recaidaC.data.datasets[0].data = [this.recaida.si, this.recaida.no]
    this.recaidaC.update()

    this.tipoPadecimiento.data.datasets[0].data = [this.tipoDePadecimiento.Sintomático, this.tipoDePadecimiento.Asintomático]
    this.tipoPadecimiento.update()
    
  }

  ngOnDestroy(){
    
  }

  


  createBarCharts() {
    Chart.register(...registerables);
    this.contactoC = new Chart(this.contactoChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['si', 'no'],
        datasets: [{
          label: 'total',
          data: [this.contacto.si, this.contacto.no],
          backgroundColor: 'rgb(233, 30, 99)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(233, 30, 99)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });


    this.contagio = new Chart(this.contagioEnCasaChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['Si', 'No'],
        datasets: [{
          label: 'total',
          data: [this.contagioEnCasa.si, this.contagioEnCasa.no],
          backgroundColor: '#e91e63', // array should have same number of elements as number of dataset
          borderColor: '#e91e63',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });

    this.hospital = new Chart(this.ingresoHospitalChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['Si', 'No'],
        datasets: [{
          label: 'total',
          data: [this.ingresoHospitalario.si, this.ingresoHospitalario.no],
          backgroundColor: '#e91e63', // array should have same number of elements as number of dataset
          borderColor: '#e91e63',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });

    this.padecimiento = new Chart(this.padecimientoChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['Si', 'No'],
        datasets: [{
          label: 'total',
          data: [this.padecimientoCovid.si, this.padecimientoCovid.no],
          backgroundColor: '#e91e63', // array should have same number of elements as number of dataset
          borderColor: '#e91e63',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });

    this.recaidaC = new Chart(this.recaidaChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['Si', 'No'],
        datasets: [{
          label: 'total',
          data: [this.recaida.si, this.recaida.no],
          backgroundColor: '#e91e63', // array should have same number of elements as number of dataset
          borderColor: '#e91e63',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });

    this.tipoPadecimiento = new Chart(this.tipoDePadecimientoChart.nativeElement, {
      type: 'bar' ,
      data: {
        labels: ['Si', 'No'],
        datasets: [{
          label: 'total',
          data: [this.tipoDePadecimiento.Sintomático, this.tipoDePadecimiento.Asintomático],
          backgroundColor: '#e91e63', // array should have same number of elements as number of dataset
          borderColor: '#e91e63',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {}
      }
    });
  }

   

}
