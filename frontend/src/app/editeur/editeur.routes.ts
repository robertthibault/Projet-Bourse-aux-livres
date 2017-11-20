import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditeurComponent } from './editeur.component';
import { EditeurListeComponent } from './list';
import { EditeurDetailComponent } from './detail';
import { EditeurAjoutComponent } from './ajout';
import { EditeurModifierComponent } from './modifier';

export const routes = [
    { path: 'editeur',
      component: EditeurComponent,
      data : { breadcrumb: 'Éditeur' },
      children: [
        { path: '',  component: EditeurListeComponent, data : { breadcrumb: 'Liste' } },
        {
          path: 'modifier/:id',
          component: EditeurModifierComponent,
          data : { breadcrumb: 'Modifier' }
        },
        {
          path: 'ajout',
          component: EditeurAjoutComponent,
          data : { breadcrumb: 'Ajout' }
        },
        { path: ':id',
          component: EditeurDetailComponent,
          data : { breadcrumb: 'Détail' }
        },
        { path: '**', redirectTo: '' /* otherwise redirect to home*/ }
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class EditeurRoutingModule {}
