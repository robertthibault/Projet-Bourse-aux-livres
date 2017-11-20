import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eleve',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class EleveComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }
}
