import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {CoursesService} from './services/courses.service';
import {CourseResolver} from './services/course.resolver';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { HttpClientModule} from '@angular/common/http';
import {AppShellNoRenderDirective} from './directives/app-shell-no-render.directive';
import {AppShellRenderDirective} from './directives/app-shell-render.directive';
import { NewsletterService } from './services/newsletter.service';
import {SwPush, ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './shared/utils';
import { reducers, metaReducers } from './reducers';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule',
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        CourseDialogComponent,
        AppShellNoRenderDirective,
        AppShellRenderDirective
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
       // AppRoutingModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        AuthModule.forRoot(),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'})
    ],
    providers: [
        CoursesService,
        CourseResolver,
        NewsletterService,
        { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    bootstrap: [AppComponent],
    entryComponents: [CourseDialogComponent]
})
export class AppModule {
}
