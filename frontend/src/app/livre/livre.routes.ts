import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreComponent } from './livre.component';
import { LivreListeComponent } from './list';
import { LivreDetailComponent } from './detail';
import { LivreAjoutComponent } from './ajout';
import { LivreModifierComponent } from './modifier';

export const routes = [
  {
    path: 'livre', component: LivreComponent, data : { breadcrumb: 'Livre' }, children: [
      { path: '', component: LivreListeComponent, data : { breadcrumb: 'Liste' } },
      { path: 'ajout', component: LivreAjoutComponent, data : { breadcrumb: 'Ajout' } },
      { path: 'modifier/:id', component: LivreModifierComponent, data : { breadcrumb: 'Modifier' } },
      { path: ':id', component: LivreDetailComponent, data : { breadcrumb: 'Détail' } },
      { path: '**', redirectTo: '' /* otherwise redirect to home*/ }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class LivreRoutingModule { }
