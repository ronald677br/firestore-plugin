import { OnDestroy } from '@angular/core';
import { Store, Actions } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
interface ActionTypeDef<T> {
    type: string;
    new (...args: any): T;
}
export declare class NgxsFirestoreConnect implements OnDestroy {
    private store;
    private actions;
    private firestoreConnectionsSub;
    private activeFirestoreConnections;
    private actionsPending;
    constructor(store: Store, actions: Actions);
    /**
     * Connect a query that will dispatch a `StreamEmitted` action on each emission.
     *
     * @param actionType Action to connect with
     * @param opts.to Firestore Query to connect with
     * @param opts.trackBy used to allow multiple connections for a same action, and Disconnect them individually
     * @param opts.connectedActionFinishesOn complete connected action on first emit or stream completed
     * @param opts.cancelPrevious cancel previous connected action, (when used combined with trackBy, will cancel stream with same id)
     */
    connect<T>(actionType: ActionTypeDef<T>, opts: {
        to: (action: T) => Observable<any>;
        trackBy?: (action: T) => string;
        connectedActionFinishesOn?: 'FirstEmit' | 'StreamCompleted';
        cancelPrevious?: boolean;
    }): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestoreConnect, never>;
}
export {};

//# sourceMappingURL=ngxs-firestore-connect.service.d.ts.map