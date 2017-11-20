import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'adherent',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class AdherentComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }
}
