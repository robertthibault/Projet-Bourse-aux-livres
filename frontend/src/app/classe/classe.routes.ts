import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClasseComponent } from './classe.component';
import { ClasseListComponent } from './list';
import { ClasseDetailComponent } from './detail';
import { ClasseAjoutComponent } from './ajout';
import { ClasseModifierComponent } from './modifier/classe-modifier.component';

export const routes = [
  { path: 'classe',
    component: ClasseComponent,
    data : { breadcrumb: 'Classe' },
    children: [
      {
        path: '',   component: ClasseListComponent,
        data : { breadcrumb: 'Liste' }
      },
      {
        path: 'modifier/:id',
        component: ClasseModifierComponent,
        data : { breadcrumb: 'Modifier' }
      },
      {
        path: 'ajout',
        component: ClasseAjoutComponent,
        data : { breadcrumb: 'Ajout' }
      },
      {
        path: ':id',
        component: ClasseDetailComponent,
        data : { breadcrumb: 'Détail' }
      },
      { path: '**', redirectTo: '' /* otherwise redirect to home*/ }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class ClasseRoutingModule {}
