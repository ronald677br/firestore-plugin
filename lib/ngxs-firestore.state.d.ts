import { StateContext, NgxsOnInit } from '@ngxs/store';
import { NgxsFirestoreConnectActions } from './ngxs-firestore-connect.actions';
import * as ɵngcc0 from '@angular/core';
export interface FirestoreConnection {
    id: string;
    connectedAt: Date;
    emmitedAt: Date[];
}
export interface NgxsFirestoreStateModel {
    connections: FirestoreConnection[];
}
export declare class NgxsFirestoreState implements NgxsOnInit {
    ngxsOnInit(_ctx: StateContext<NgxsFirestoreStateModel>): void;
    streamConnected({ setState }: StateContext<NgxsFirestoreStateModel>, { payload }: NgxsFirestoreConnectActions.StreamConnected): void;
    streamEmitted({ setState }: StateContext<NgxsFirestoreStateModel>, { payload }: NgxsFirestoreConnectActions.StreamEmitted): void;
    streamDisconnected({ setState, getState }: StateContext<NgxsFirestoreStateModel>, { payload }: NgxsFirestoreConnectActions.StreamDisconnected): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestoreState, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<NgxsFirestoreState>;
}

//# sourceMappingURL=ngxs-firestore.state.d.ts.map