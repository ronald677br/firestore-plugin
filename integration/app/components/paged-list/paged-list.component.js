var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { actionsExecuting } from '@ngxs-labs/actions-executing';
import { GetLastPage, GetNextPage } from '@ngxs-labs/firestore-plugin';
import { AttendeesActions } from 'integration/app/states/attendees/attendees.actions';
import { AttendeesState } from 'integration/app/states/attendees/attendees.state';
import { RacesActions } from 'integration/app/states/races/races.actions';
import { RacesState } from 'integration/app/states/races/races.state';
let PagedListComponent = class PagedListComponent {
    constructor(store) {
        this.store = store;
        this.races$ = this.store.select(RacesState.races);
        this.attendees$ = this.store.select(AttendeesState.attendees);
        this.nextPageExecuting$ = this.store.select(actionsExecuting([GetNextPage]));
        this.lastPageExecuting$ = this.store.select(actionsExecuting([GetLastPage]));
    }
    ngOnInit() {
        this.store.dispatch(new RacesActions.GetPages());
        this.store.dispatch(new AttendeesActions.GetPages());
    }
    nextPage() {
        const pageId = this.store.selectSnapshot(RacesState.pageId);
        this.store.dispatch(new GetNextPage(pageId));
    }
    lastPage() {
        const pageId = this.store.selectSnapshot(RacesState.pageId);
        this.store.dispatch(new GetLastPage(pageId));
    }
    nextPageAttendees() {
        const pageId = this.store.selectSnapshot(AttendeesState.pageId);
        this.store.dispatch(new GetNextPage(pageId));
    }
    lastPageAttendees() {
        const pageId = this.store.selectSnapshot(AttendeesState.pageId);
        this.store.dispatch(new GetLastPage(pageId));
    }
};
PagedListComponent = __decorate([
    Component({
        selector: 'app-paged-list',
        templateUrl: './paged-list.component.html',
        styleUrls: ['./paged-list.component.scss']
    })
], PagedListComponent);
export { PagedListComponent };
//# sourceMappingURL=paged-list.component.js.map