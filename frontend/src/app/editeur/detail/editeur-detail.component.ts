import { Component, OnInit } from '@angular/core';
import { Editeur } from '../editeur';
import { Router } from '@angular/router';
import { EditeurService } from '../editeur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editeur-detail',
  templateUrl: './editeur-detail.component.html'

})

export class EditeurDetailComponent implements OnInit {
  public editeur: Editeur;
  public idEdt: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private EditeurService: EditeurService
  ) { }

  public ngOnInit(): void {
    this.idEdt = + this.route.snapshot.params['id'];
    this.getEditeur(this.idEdt);
    this.logEditeur();
  }

  public getEditeur(idEdt: number): void {
    this.EditeurService.getEditeur(idEdt)
      .then(
        (editeur) => {
          this.editeur = editeur;
        });
  }
  public logEditeur() {
    console.log(this.editeur);
  }

  public back() {
    this.router.navigate(['/editeur']);
  }
}
