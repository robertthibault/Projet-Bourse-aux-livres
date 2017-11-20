import { Component, OnInit } from '@angular/core';
import { Livre } from '../livre';
import { Router } from '@angular/router';
import { LivreService } from '../livre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'livre-detail',
  templateUrl: './livre-detail.component.html',

})

export class LivreDetailComponent implements OnInit {
  public livre: Livre;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livreService: LivreService,
  ) { }

  public getLivre(id: number): void {
    this.livreService.getLivre(id)
      .then(
        (livre) => {
          this.livre = livre;
        }
        );
  }
public 

   public back() {
     this.router.navigate(['/livre']);
   }
}
