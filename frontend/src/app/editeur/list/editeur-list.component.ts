import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Editeur } from '../editeur';
import { EditeurService } from '../editeur.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'Editeur',
  templateUrl: './editeur-list.component.html',
  styleUrls: ['./editeur-list.component.css']
})

export class EditeurListeComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 5;

  public editeurs: Editeur[];
  public selectedEditeur = [];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;

  public columns: any[];

  constructor(private router: Router,
              private EditeurService: EditeurService) {
  }

  public ngOnInit(): void {
    this.columns = [
      {name: 'Identifiant', prop: 'id'},
      {name: 'Nom', prop: 'nom'},
      {
        cellTemplate: this.actionLink,
        name: 'Action'
      },
    ];

    this.getEditeur();
  }

  public getEditeur(): void {
    this.EditeurService.getEditeurs()
      .then(
        (editeursRetour) => {
          this.editeurs = editeursRetour;
          this.cache = editeursRetour;
        });
  }

  public onSelect(selected: String): void {
    // this.selectedEditeur = selected;
  }

  public updateFilter(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.cache.filter((d) => {

      if (isNumeric(val)) {
        return d.id.indexOf(val) !== -1 || !val;
      } else {
        return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.editeurs = temp;
    // console.log('updateFilter - filtered data', this.editeurs );
  }

  public edit(id): void {
    this.router.navigate(['/editeur/modifier', id]);

  }

  public create(): void {
    this.router.navigate(['/editeur/ajout']);
  }

  public show(id): void {
    this.router.navigate(['/editeur/', id]);
  }

}
