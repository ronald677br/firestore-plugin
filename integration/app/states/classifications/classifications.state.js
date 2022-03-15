var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { State, Action, Selector } from '@ngxs/store';
import { ClassificationsActions } from './classifications.actions';
import { StreamEmitted } from '@ngxs-labs/firestore-plugin';
import { iif, insertItem, patch, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
let ClassificationsState = class ClassificationsState {
    constructor(classificationsFS, ngxsFirestoreConnect) {
        this.classificationsFS = classificationsFS;
        this.ngxsFirestoreConnect = ngxsFirestoreConnect;
    }
    static classifications(state) {
        return state.classifications;
    }
    ngxsOnInit(ctx) {
        this.ngxsFirestoreConnect.connect(ClassificationsActions.GetAll, {
            to: ({ raceId }) => {
                this.classificationsFS.setRaceId(raceId);
                return this.classificationsFS.collection$();
            }
        });
        this.ngxsFirestoreConnect.connect(ClassificationsActions.Get, {
            to: ({ payload }) => this.classificationsFS.doc$(payload)
        });
    }
    getEmitted(ctx, { payload }) {
        if (payload) {
            ctx.setState(patch({
                classifications: iif((classifications) => !!classifications.find((classification) => classification.id === payload.id), updateItem((classification) => classification.id === payload.id, patch(payload)), insertItem(payload))
            }));
        }
    }
    getAllEmitted(ctx, { payload }) {
        ctx.setState(patch({ classifications: payload }));
    }
};
__decorate([
    Action(StreamEmitted(ClassificationsActions.Get))
], ClassificationsState.prototype, "getEmitted", null);
__decorate([
    Action(StreamEmitted(ClassificationsActions.GetAll))
], ClassificationsState.prototype, "getAllEmitted", null);
__decorate([
    Selector()
], ClassificationsState, "classifications", null);
ClassificationsState = __decorate([
    State({
        name: 'classifications',
        defaults: {
            classifications: []
        }
    }),
    Injectable()
], ClassificationsState);
export { ClassificationsState };
//# sourceMappingURL=classifications.state.js.map