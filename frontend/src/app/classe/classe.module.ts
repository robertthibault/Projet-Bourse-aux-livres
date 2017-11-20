import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './classe.routes';
import { ClasseComponent } from './classe.component';
import { ClasseService } from './classe.service';
import { ClasseListComponent } from './list';
import { ClasseDetailComponent } from './detail';
import { ClasseAjoutComponent } from './ajout';
import { ClasseModifierComponent } from './modifier';
import { TabViewModule, PickListModule } from 'primeng/primeng';

/*
 *  Component used to display data tables
 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { LivreService } from '../livre/livre.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    ClasseComponent,
    ClasseListComponent,
    ClasseDetailComponent,
    ClasseAjoutComponent,
    ClasseModifierComponent
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TabViewModule,
    PickListModule,
    NgxDatatableModule,
    DataTableModule,
  ],
  providers: [
    ClasseService,
    LivreService
  ]
})

export class ClasseModule {
  public static routes = routes;
}
