import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil';
import { AProposComponent } from './a-propos';
import { AdherentModule } from './adherent';
import { EleveModule } from './eleve';
import { CommandeComponent } from './commande';
import { PageManquanteComponent } from './page-manquante';

import { DataResolver } from './app.resolver';
import { LivreModule } from './livre';
import { MatiereModule } from './matiere';
import { EditeurModule } from './editeur';
import { ClasseModule } from './classe';
import { RefLivreModule } from './reflivre';

export const routes: Routes = [
  { path: '',      component: AccueilComponent },
  {
    path: 'accueil',
    component:  AccueilComponent,
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'apropos',
    component: AProposComponent,
    data: { breadcrumb: 'À propos' }
  },
  { path: 'adherent', component: AdherentModule },
  { path: 'eleve', component: EleveModule },
  {
    path: 'commande',
    component: CommandeComponent,
    data : { breadcrumb: 'Commandes' }
  },
  { path: 'reflivre', component: RefLivreModule },
  { path: 'livre', component: LivreModule },
  { path: 'classe', component: ClasseModule},
  { path: 'matiere', component: MatiereModule },
  { path: 'editeur', component: EditeurModule },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: PageManquanteComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
