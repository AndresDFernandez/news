import {Component, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Store } from './common/store.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private swUpdate: SwUpdate, private store:Store) {
    }

    ngOnInit() {

        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if(confirm("New version available. Load New Version?")) {

                    window.location.reload();
                }
            });
        }
        
        this.store.init();
    }


}
