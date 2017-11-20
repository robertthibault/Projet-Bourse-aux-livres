import { Component, OnInit } from '@angular/core';
import { Adherent } from '../../adherent';
import { Router } from '@angular/router';
import { AdherentService } from '../../adherent.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'adherent-detail-view',
    templateUrl: './adherent-detail-view.component.html'

})

export class AdherentDetailViewComponent implements OnInit {
    public adherent: Adherent;
    public id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adherentService: AdherentService
    ) { }

    public ngOnInit(): void {
        this.id = + this.route.snapshot.params['id'];
        this.getAdherent(this.id);
    }

    public getAdherent(id: number): void {
        this.adherentService.getAdherent(id)
            .then(
            (adherent) => {
                this.adherent = adherent;
            });
    }
    public logAdherent() {
        console.log(this.adherent);
    }
}
