var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { State, Action, Selector } from '@ngxs/store';
import { AttendeesActions } from './attendees.actions';
import { StreamEmitted } from '@ngxs-labs/firestore-plugin';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
let AttendeesState = class AttendeesState {
    constructor(attendeesFS, ngxsFirestoreConnect, nxgsFirestorePage) {
        this.attendeesFS = attendeesFS;
        this.ngxsFirestoreConnect = ngxsFirestoreConnect;
        this.nxgsFirestorePage = nxgsFirestorePage;
    }
    static attendees(state) {
        return state.attendees;
    }
    static pageId(state) {
        return state.pageId;
    }
    ngxsOnInit(ctx) {
        this.ngxsFirestoreConnect.connect(AttendeesActions.GetPages, {
            to: () => {
                const obs$ = this.nxgsFirestorePage.create((pageFn) => this.attendeesFS.collection$((ref) => {
                    return pageFn(ref);
                }), 5, [{ fieldPath: 'id' }]);
                return obs$;
            }
        });
    }
    getPageEmitted(ctx, { action, payload }) {
        ctx.setState(patch({ attendees: payload.results || [], pageId: payload.pageId }));
    }
};
__decorate([
    Action(StreamEmitted(AttendeesActions.GetPages))
], AttendeesState.prototype, "getPageEmitted", null);
__decorate([
    Selector()
], AttendeesState, "attendees", null);
__decorate([
    Selector()
], AttendeesState, "pageId", null);
AttendeesState = __decorate([
    State({
        name: 'attendees',
        defaults: {
            attendees: [],
            pageId: ''
        }
    }),
    Injectable()
], AttendeesState);
export { AttendeesState };
//# sourceMappingURL=attendees.state.js.map