var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { State, Action } from '@ngxs/store';
import { NgxsFirestoreConnectActions } from './ngxs-firestore-connect.actions';
import { patch, insertItem, removeItem, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
let NgxsFirestoreState = class NgxsFirestoreState {
    ngxsOnInit(_ctx) { }
    streamConnected({ setState }, { payload }) {
        const conn = {
            connectedAt: new Date(),
            id: payload
        };
        setState(patch({ connections: insertItem(conn) }));
    }
    streamEmitted({ setState }, { payload }) {
        const { id } = payload;
        setState(patch({
            connections: updateItem((x) => x.id === id, patch({ emmitedAt: insertItem(new Date()) }))
        }));
    }
    streamDisconnected({ setState, getState }, { payload }) {
        setState(patch({ connections: removeItem((x) => x.id === payload) }));
    }
};
__decorate([
    Action([NgxsFirestoreConnectActions.StreamConnected])
], NgxsFirestoreState.prototype, "streamConnected", null);
__decorate([
    Action([NgxsFirestoreConnectActions.StreamEmitted])
], NgxsFirestoreState.prototype, "streamEmitted", null);
__decorate([
    Action([NgxsFirestoreConnectActions.StreamDisconnected])
], NgxsFirestoreState.prototype, "streamDisconnected", null);
NgxsFirestoreState = __decorate([
    State({
        name: 'ngxs_firestore',
        defaults: {
            connections: []
        }
    }),
    Injectable()
], NgxsFirestoreState);
export { NgxsFirestoreState };
//# sourceMappingURL=ngxs-firestore.state.js.map