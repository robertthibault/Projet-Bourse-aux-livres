import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './adherent.routes';
import { AdherentComponent } from './adherent.component';
import { AdherentListComponent } from './list';
import { AdherentDetailComponent } from './detail';
import { AdherentDetailViewComponent } from './detail/view/adherent-detail-view.component';
import { AdherentAjoutComponent } from './ajout';
import { AdherentModifierComponent } from './modifier';

import { AdherentService } from './adherent.service';
import { EleveService } from '../eleve/eleve.service';

import { TabViewModule } from 'primeng/primeng';

/*
*  Component used to display data tables
*/
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EleveModifierComponent } from '../eleve/modifier/eleve-modifier.component';
import { DataTableModule } from 'primeng/components/datatable/datatable';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    AdherentComponent,
    AdherentListComponent,
    AdherentDetailComponent,
    AdherentAjoutComponent,
    AdherentModifierComponent,
    EleveModifierComponent,
    AdherentDetailViewComponent
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    TabViewModule
    ],
  providers: [
      AdherentService,
      EleveService
  ]
})

export class AdherentModule {
  public static routes = routes;
}
