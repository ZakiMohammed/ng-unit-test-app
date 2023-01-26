import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  appName = environment.appName;
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  hideMenu() {
    this.showMenu = false;
  }
}
