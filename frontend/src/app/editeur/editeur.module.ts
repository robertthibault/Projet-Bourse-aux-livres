import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './editeur.routes';
import { EditeurComponent } from './editeur.component';
import { EditeurService } from './editeur.service';
import { EditeurListeComponent } from './list';
import { EditeurDetailComponent } from './detail';
import { EditeurAjoutComponent } from './ajout';
import { EditeurModifierComponent } from './modifier';

/*
 *  Component used to display data tables
 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'primeng/components/datatable/datatable';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    EditeurComponent,
    EditeurListeComponent,
    EditeurDetailComponent,
    EditeurAjoutComponent,
    EditeurModifierComponent,

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
    EditeurService,
  ]
})

export class EditeurModule {
  public static routes = routes;
}
