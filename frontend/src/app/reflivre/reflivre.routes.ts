import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RefLivreComponent } from './reflivre.component';
import { RefLivreListeComponent } from './list';
import { RefLivreDetailComponent } from './detail';
import { RefLivreModifierComponent } from './modifier';
import { RefLivreAjoutComponent } from './ajout';

export const routes = [
      {path: 'reflivre', component: RefLivreComponent, data : { breadcrumb: 'Références' }, children: [
      { path: '', component: RefLivreListeComponent, data : { breadcrumb: 'Liste' } },
      { path: 'ajout', component: RefLivreAjoutComponent, data : { breadcrumb: 'Ajout' } },
      { path: 'modifier/:id', component: RefLivreModifierComponent, data : { breadcrumb: 'Modifier' } },
      { path: ':id', component: RefLivreDetailComponent, data : { breadcrumb: 'Détail' } },
      { path: '**', redirectTo: '' /* otherwise redirect to home*/ }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RefLivreRoutingModule { }
