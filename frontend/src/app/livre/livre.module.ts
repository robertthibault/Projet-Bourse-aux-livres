import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './livre.routes';
import { LivreComponent } from './livre.component';
import { LivreService } from './livre.service';
import { LivreListeComponent } from './list';
import { LivreDetailComponent } from './detail';
import { LivreAjoutComponent } from './ajout';
import { LivreModifierComponent } from './modifier';

/*
 *  Component used to display data tables
 */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    LivreComponent,
    LivreListeComponent,
    LivreDetailComponent,
    LivreAjoutComponent,
    LivreModifierComponent,
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    DropdownModule

  ],
  providers: [
    LivreService,
  ]
})

export class LivreModule {
  public static routes = routes;
}
