import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './eleve.routes';
import { EleveComponent } from './eleve.component';
import { EleveService } from './eleve.service';
import { EleveListComponent } from './list';
import { EleveDetailComponent } from './detail';
import { EleveAjoutComponent } from './ajout';
/*
*  Component used to display data tables
*/
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    EleveComponent,
    EleveListComponent,
    EleveDetailComponent,
    EleveAjoutComponent
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
      EleveService,
  ]
})

export class EleveModule {
  public static routes = routes;
}
