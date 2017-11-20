import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reflivre',
  template: `
  <div class="container">
    <div class = "main-content">
      <router-outlet></router-outlet>
    </div>
   </div>
  `,
})

export class RefLivreComponent implements OnInit {

  public ngOnInit() {
    // TODO
  }

}
