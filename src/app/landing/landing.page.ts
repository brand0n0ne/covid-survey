import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public navCtrl: NavController) { 

  }

  changeRoute(){
    this.navCtrl.navigateForward('/Tabs');
  }

  ngOnInit() {
  }

}
