import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { MenuItem } from 'primeng/components/common/api';   // ng-prime api
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    '../../node_modules/primeng/resources/themes/voclain/theme.css',
    '../../node_modules/primeng/resources/primeng.min.css',
    '../assets/css/font-awesome/css/font-awesome.min.css'
  ],
  template: `
    <!-- <navbar></navbar> -->
    <p-menubar [model]='menus'></p-menubar>
    <p-breadcrumb [model]='breadcrumbs'></p-breadcrumb>

    <div class='main-content'>
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent implements OnInit {
  public breadcrumbs: MenuItem[];
  public menus: MenuItem[];

  constructor(
    public appState: AppState,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
        this.breadcrumbs = [];
  }

  public ngOnInit(): void {
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
    this.setNavMenus();

    // subscribe to the NavigationEnd event
    this.router.events.filter( (event) => event instanceof NavigationEnd).subscribe( (event) => {
      // set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
      // console.log('breadcrumbs', this.breadcrumbs);
    });
  }
  private setNavMenus() {
    this.menus = [];
    this.menus.push({ icon: 'fa-home fa-2x', routerLink: ['/accueil'] });
    this.menus.push({ label: 'Commandes', icon: 'fa-pencil-square-o fa-2x', routerLink: ['/commande'] });
    this.menus.push({ label: 'Utilisateurs', icon: 'fa-address-book fa-2x', items: [
        { label : 'Adherents', routerLink: ['/adherent'] },
        { label: 'Élèves', routerLink: ['/eleve'] }
      ]
    });
    this.menus.push({ label: 'Bibliothèque', icon: 'fa-book fa-2x', items: [
        { label : 'Références', routerLink: ['/reflivre'] },
        { label: 'Livres', routerLink: ['/livre'] },
        { label: 'Editeurs', routerLink: ['/editeur'] }
      ]
    });
    this.menus.push({ label: 'Enseignement', icon: 'fa-graduation-cap fa-2x', items: [
        { label : 'Classes', routerLink: ['/classe'] },
        { label: 'Matières', routerLink: ['/matiere'] }
      ]
    });
    this.menus.push({ label: 'À propos', icon: 'fa-info-circle fa-2x', routerLink: ['/apropos'] });
  }

  private getBreadcrumbs(route: ActivatedRoute, link: string= '', items: MenuItem[]= []): MenuItem[] {
    console.log('getBreadcrumbs', route);
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

    // get the child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      console.log('no children');
      return items;
    }

    // iterate over each children
    for (let child of children) {
      console.log('children found', children);

      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property 'breadcrumb' is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        // return this.getBreadcrumbs(child, url, items);
      }

      // get the route's URL segment
      let routeURL: string = child.snapshot.url.map( (segment) => segment.path).join('/');
      console.log('route url segment', routeURL);
      // append route URL to URL
      link += `/${routeURL}`;

      // add breadcrumb
      let breadcrumb: MenuItem = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        // params: child.snapshot.params,
        url: link // utiliser l'attribut routerLink plutôt que url pour des raisons de performance
      };
      items.push(breadcrumb);
      console.log('breadcrumb push', breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, link, items);
    }
  }
}
