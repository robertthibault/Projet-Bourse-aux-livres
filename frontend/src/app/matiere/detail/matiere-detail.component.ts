import { Component, OnInit } from '@angular/core';
import { Matiere } from '../matiere';
import { Router } from '@angular/router';
import { MatiereService } from '../matiere.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'matiere-detail',
  templateUrl: './matiere-detail.component.html'

})

export class MatiereDetailComponent implements OnInit {
  public matiere: Matiere;
  public idMat: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private MatiereService: MatiereService
  ) { }

  public ngOnInit(): void {
    this.idMat = + this.route.snapshot.params['id'];
    this.getMatiere(this.idMat);
    this.logMatiere();
  }

  public getMatiere(idMat: number): void {
    this.MatiereService.getMatiere(idMat)
      .then(
        (matiere) => {
          this.matiere = matiere;
        });
  }
  public logMatiere() {
    console.log(this.matiere);
  }

  public cancel(): void {
    this.router.navigate(['/matiere']);
  }
}
