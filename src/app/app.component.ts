import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'hgb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    // DESIGN: 0d0dacd9: hide splash screen when loaded question form
    let subscription1stEvent = this.router.events.subscribe(rEvent => {
      let splashElem = document.querySelector('#app-splash-screen');
      if (splashElem && rEvent instanceof NavigationEnd) {
        splashElem.remove();
        subscription1stEvent.unsubscribe();
      }
    });
  }

}

