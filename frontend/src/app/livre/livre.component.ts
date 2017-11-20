import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'livre',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class LivreComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }

}
