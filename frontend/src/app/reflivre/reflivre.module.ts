import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './reflivre.routes';
import { RefLivreComponent } from './reflivre.component';
import { RefLivreService } from './reflivre.service';
import { RefLivreListeComponent } from './list';
import { RefLivreDetailComponent } from './detail';
import { RefLivreAjoutComponent } from './ajout';
import { RefLivreModifierComponent } from './modifier';

/*
 *  Component used to display data tables
 */
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    RefLivreComponent,
    RefLivreListeComponent,
    RefLivreDetailComponent,
    RefLivreAjoutComponent,
    RefLivreModifierComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    DropdownModule,
  ],
  providers: [
    RefLivreService,
  ]
})

export class RefLivreModule {
  public static routes = routes;
}
