import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'classe',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class ClasseComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }
}
