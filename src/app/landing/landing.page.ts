import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public navCtrl: NavController) { 

  }

  ngOnInit() {
    this.getTerms()
  }


  async changeRoute(){
    await Storage.set({
      key: 'viewedTerms',
      value: 'true'
    });
    await Storage.set({
      key: 'submittedSurvey',
      value: 'false'
    });
    this.navCtrl.navigateForward('/Tabs');
  }

  async getTerms (){
    const { value } = await Storage.get({ key: 'viewedTerms' });
    if(value === "true"){
      this.navCtrl.navigateForward('/Tabs');
    }
  }

}
