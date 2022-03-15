var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { State, Action, Selector } from '@ngxs/store';
import { RacesActions } from './races.actions';
import { tap } from 'rxjs/operators';
import { StreamConnected, StreamEmitted, StreamDisconnected, StreamErrored } from '@ngxs-labs/firestore-plugin';
import { patch, insertItem, iif, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
let RacesState = class RacesState {
    constructor(racesFS, ngxsFirestoreConnect, ngxsFirestorePage) {
        this.racesFS = racesFS;
        this.ngxsFirestoreConnect = ngxsFirestoreConnect;
        this.ngxsFirestorePage = ngxsFirestorePage;
    }
    static races(state) {
        return state.races;
    }
    static activeRaces(state) {
        return state.activeRaces;
    }
    static pageId(state) {
        return state.pageId;
    }
    ngxsOnInit(ctx) {
        this.ngxsFirestoreConnect.connect(RacesActions.GetAll, {
            to: () => this.racesFS.collection$(),
            connectedActionFinishesOn: 'FirstEmit'
        });
        this.ngxsFirestoreConnect.connect(RacesActions.Get, {
            to: ({ payload }) => this.racesFS.doc$(payload)
        });
        this.ngxsFirestoreConnect.connect(RacesActions.GetPages, {
            to: () => {
                const obs$ = this.ngxsFirestorePage.create((pageFn) => this.racesFS.collection$((ref) => pageFn(ref).where('s', '>=', 's')), 5, [{ fieldPath: 'title' }]);
                return obs$;
            }
        });
        this.ngxsFirestoreConnect.connect(RacesActions.Error, {
            to: () => this.racesFS.collection$((ref) => ref
                .where('aaa', '==', 0)
                .where('bbb', '==', 0)
                .orderBy('aaa'))
        });
    }
    error(ctx, { error }) { }
    getPageEmitted(ctx, { action, payload }) {
        ctx.setState(patch({ races: payload.results || [], pageId: payload.pageId }));
    }
    getConnected(ctx, { action }) {
        console.log('[RacesActions.Get]  Connected');
    }
    getEmitted(ctx, { action, payload }) {
        if (payload) {
            ctx.setState(patch({
                races: iif((races) => !!races.find((race) => race.raceId === payload.raceId), updateItem((race) => race.raceId === payload.raceId, patch(payload)), insertItem(payload))
            }));
        }
    }
    getDisconnected(ctx, { action }) {
        console.log('[RacesActions.Get] Disconnected');
    }
    getAllEmitted(ctx, { action, payload }) {
        ctx.setState(patch({ races: payload }));
    }
    getAllOnce({ patchState }) {
        return this.racesFS.collectionOnce$().pipe(tap((races) => {
            patchState({ races });
        }));
    }
    getOnce({ setState, getState, patchState }, { payload }) {
        return this.racesFS.docOnce$(payload).pipe(tap((race) => {
            const races = [...getState().races];
            const exists = races.findIndex((r) => r.raceId === payload);
            if (exists > -1) {
                races.splice(exists, 1, race);
                patchState({ races });
            }
            else {
                patchState({ races: races.concat(race) });
            }
        }));
    }
    create({ patchState, dispatch }, { payload }) {
        return this.racesFS.create$(payload);
    }
    upsert({ patchState, dispatch }, { payload }) {
        return this.racesFS.upsert$(payload);
    }
    update({ patchState, dispatch }, { payload }) {
        return this.racesFS.update$(payload.raceId, payload);
    }
    updateIfExists({ patchState, dispatch }, { payload }) {
        return this.racesFS.updateIfExists(payload.raceId, payload);
    }
    delete({ patchState, dispatch }, { payload }) {
        return this.racesFS.delete$(payload);
    }
};
__decorate([
    Action(StreamErrored(RacesActions.Error))
], RacesState.prototype, "error", null);
__decorate([
    Action(StreamEmitted(RacesActions.GetPages))
], RacesState.prototype, "getPageEmitted", null);
__decorate([
    Action(StreamConnected(RacesActions.Get))
], RacesState.prototype, "getConnected", null);
__decorate([
    Action(StreamEmitted(RacesActions.Get))
], RacesState.prototype, "getEmitted", null);
__decorate([
    Action(StreamDisconnected(RacesActions.Get))
], RacesState.prototype, "getDisconnected", null);
__decorate([
    Action(StreamEmitted(RacesActions.GetAll))
], RacesState.prototype, "getAllEmitted", null);
__decorate([
    Action([RacesActions.GetAllOnce])
], RacesState.prototype, "getAllOnce", null);
__decorate([
    Action([RacesActions.GetOnce])
], RacesState.prototype, "getOnce", null);
__decorate([
    Action(RacesActions.Create)
], RacesState.prototype, "create", null);
__decorate([
    Action(RacesActions.Upsert)
], RacesState.prototype, "upsert", null);
__decorate([
    Action(RacesActions.Update)
], RacesState.prototype, "update", null);
__decorate([
    Action(RacesActions.UpdateIfExists)
], RacesState.prototype, "updateIfExists", null);
__decorate([
    Action(RacesActions.Delete)
], RacesState.prototype, "delete", null);
__decorate([
    Selector()
], RacesState, "races", null);
__decorate([
    Selector()
], RacesState, "activeRaces", null);
__decorate([
    Selector()
], RacesState, "pageId", null);
RacesState = __decorate([
    State({
        name: 'races',
        defaults: {
            races: [],
            pageId: '',
            activeRaces: []
        }
    }),
    Injectable()
], RacesState);
export { RacesState };
//# sourceMappingURL=races.state.js.map