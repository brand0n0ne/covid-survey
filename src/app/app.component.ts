import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.changeTheme();
    document.body.classList.toggle('dark');
  }


  changeTheme() {
    document.body.setAttribute('data-theme', 'dark');
  }
}
