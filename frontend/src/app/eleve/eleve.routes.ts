import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleveComponent } from './eleve.component';
import { EleveListComponent } from './list';
import { EleveDetailComponent } from './detail';
import { EleveAjoutComponent } from './ajout';
import { EleveModifierComponent } from './modifier';

export const routes = [
    { path: 'eleve', component: EleveComponent, data : { breadcrumb: 'Élève' }, children: [
    { path: '',  component: EleveListComponent, data : { breadcrumb: 'Liste' } },
    { path: 'modifier/:id',  component: EleveModifierComponent, data : { breadcrumb: 'Modifier' } },
    { path: 'ajout', component: EleveAjoutComponent, data : { breadcrumb: 'Ajout' } },
    { path: ':id',  component: EleveDetailComponent, data : { breadcrumb: 'Détail' } },
    { path: '**', redirectTo: '' }
  ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class EleveRoutingModule {}
