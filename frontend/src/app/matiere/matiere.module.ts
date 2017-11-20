import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './matiere.routes';
import { MatiereComponent } from './matiere.component';
import { MatiereService } from './matiere.service';
import { MatiereListeComponent } from './list';
import { MatiereDetailComponent } from './detail';
import { MatiereAjoutComponent } from './ajout';
import { MatiereModifierComponent } from './modifier';

/*
 *  Component used to display data tables
 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'primeng/components/datatable/datatable';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    MatiereComponent,
    MatiereListeComponent,
    MatiereDetailComponent,
    MatiereAjoutComponent,
    MatiereModifierComponent,

  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    DataTableModule,
  ],
  providers: [
    MatiereService,
  ]
})

export class MatiereModule {
  public static routes = routes;
}
