var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsFirestoreModule } from '@ngxs-labs/firestore-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RacesState } from './states/races/races.state';
import { OtherComponent } from './components/other/other.component';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { ClassificationsState } from './states/classifications/classifications.state';
import { PagedListComponent } from './components/paged-list/paged-list.component';
import { AttendeesState } from './states/attendees/attendees.state';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [AppComponent, ListComponent, OtherComponent, PagedListComponent],
        imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot([
                { path: 'list', component: ListComponent },
                { path: 'paged-list', component: PagedListComponent },
                { path: 'other', component: OtherComponent },
                { path: '', redirectTo: '/list', pathMatch: 'full' }
            ], { relativeLinkResolution: 'legacy' }),
            AngularFireModule.initializeApp(environment.firebase),
            NgxsModule.forRoot([RacesState, ClassificationsState, AttendeesState], {
                developmentMode: !environment.production
            }),
            NgxsLoggerPluginModule.forRoot({
                disabled: environment.production
            }),
            NgxsFirestoreModule.forRoot({
                timeoutWriteOperations: 1000
            }),
            NgxsActionsExecutingModule.forRoot(),
            NgxsReduxDevtoolsPluginModule.forRoot({
                name: 'Ngxs Firestore',
                disabled: environment.production,
                actionSanitizer: (action) => (Object.assign(Object.assign({}, action), { action: null }))
            })
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map