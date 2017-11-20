import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { AccueilComponent } from './accueil';
import { LivreModule } from './livre';
import { NavbarComponent } from './navbar';
import { AdherentModule } from './adherent';
import { EleveModule } from './eleve';
import { MatiereModule } from './matiere';
import { EditeurModule } from './editeur';
import { RefLivreModule } from './reflivre';
import { PageManquanteComponent } from './page-manquante';
import { CommandeComponent } from './commande';
import { AProposComponent } from './a-propos';
import { ClasseModule } from './classe';
import { DataTableModule, SharedModule, FieldsetModule,
  TabViewModule, BreadcrumbModule, DropdownModule, PickListModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/components/menubar/menubar';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AccueilComponent,
    PageManquanteComponent,
    CommandeComponent,
    NavbarComponent,
    AProposComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RefLivreModule,
    AdherentModule,
    EleveModule,
    LivreModule,
    ClasseModule,
    MatiereModule,
    EditeurModule,
    AppRoutingModule,
    BreadcrumbModule,
    TabViewModule,
    DataTableModule,
    SharedModule,
    DropdownModule,
    PickListModule,
    BrowserAnimationsModule,
    FieldsetModule,
    MenubarModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
