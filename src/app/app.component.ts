import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  icon: IconProp | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.firstChild;
        this.title = (route?.data as any).title;
        this.icon = (route?.data as any).icon;
      }
    })
  }
}
