import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdherentComponent } from './adherent.component';
import { AdherentListComponent } from './list';
import { AdherentDetailComponent } from './detail';
import { AdherentAjoutComponent } from './ajout';
import { AdherentModifierComponent } from './modifier';

export const routes = [
    { path: 'adherent',
      component: AdherentComponent,
      data: { breadcrumb: 'Adhérent' },
      children: [
        { path: '',  component: AdherentListComponent, data: { breadcrumb: 'Liste'}  },
        {
          path: 'modifier/:id',
          component: AdherentModifierComponent, data: { breadcrumb: 'Modifier' }
        },
        {
          path: 'ajout',
          component: AdherentAjoutComponent,
          data: { breadcrumb: 'Ajout' }
        },
        {
          path: ':id',
          component: AdherentDetailComponent,
          data: { breadcrumb: 'Détail' }
        },
        // { path: '**', redirectTo: '' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AdherentRoutingModule {}
