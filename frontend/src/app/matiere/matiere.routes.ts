import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatiereComponent } from './matiere.component';
import { MatiereListeComponent } from './list';
import { MatiereDetailComponent } from './detail';
import { MatiereAjoutComponent } from './ajout';
import { MatiereModifierComponent } from './modifier';

export const routes = [
    { path: 'matiere', component: MatiereComponent, data : { breadcrumb: 'Matière' }, children: [
    { path: '',  component: MatiereListeComponent, data : { breadcrumb: 'Liste' } },
    { path: 'modifier/:id',  component: MatiereModifierComponent, data : { breadcrumb: 'Modifier' } },
    { path: 'ajout', component: MatiereAjoutComponent, data : { breadcrumb: 'Ajout' } },
    { path: ':id',  component: MatiereDetailComponent, data : { breadcrumb: 'Détail' } },

    { path: '**', redirectTo: '' /* otherwise redirect to home*/ }

  ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class MatiereRoutingModule {}
