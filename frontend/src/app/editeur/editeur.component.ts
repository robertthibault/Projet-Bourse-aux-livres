import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editeur',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class EditeurComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }

}
