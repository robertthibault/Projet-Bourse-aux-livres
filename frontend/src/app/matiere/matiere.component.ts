import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matiere',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class MatiereComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }

}
