var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { ofActionDispatched } from '@ngxs/store';
import { tap, catchError, mergeMap, takeUntil, finalize, filter, take, share } from 'rxjs/operators';
import { race, Subject, defer, of } from 'rxjs';
import { StreamConnected, StreamEmitted, StreamDisconnected, StreamErrored } from './action-decorator-helpers';
import { NgxsFirestoreConnectActions } from './ngxs-firestore-connect.actions';
import { DisconnectAll, Disconnect } from './actions';
import { attachAction } from './attach-action';
import { NgxsFirestoreState } from './ngxs-firestore.state';
function defaultTrackBy(action) {
    return '';
}
function streamId(opts) {
    let id = `${opts.actionType.type}`;
    if (opts.trackBy(opts.action)) {
        id = id.concat(` (${opts.trackBy(opts.action)})`);
    }
    return id;
}
function tapOnce(fn) {
    return (source) => defer(() => {
        let first = true;
        return source.pipe(tap((payload) => {
            if (first) {
                fn(payload);
            }
            first = false;
        }));
    }).pipe(share());
}
let NgxsFirestoreConnect = class NgxsFirestoreConnect {
    constructor(store, actions) {
        this.store = store;
        this.actions = actions;
        this.firestoreConnectionsSub = [];
        this.activeFirestoreConnections = [];
        this.actionsPending = [];
    }
    /**
     * Connect a query that will dispatch a `StreamEmitted` action on each emission.
     *
     * @param actionType Action to connect with
     * @param opts.to Firestore Query to connect with
     * @param opts.trackBy used to allow multiple connections for a same action, and Disconnect them individually
     * @param opts.connectedActionFinishesOn complete connected action on first emit or stream completed
     * @param opts.cancelPrevious cancel previous connected action, (when used combined with trackBy, will cancel stream with same id)
     */
    connect(actionType, opts) {
        const connectedActionFinishesOn = opts.connectedActionFinishesOn || 'FirstEmit';
        const trackBy = opts.trackBy || defaultTrackBy;
        const cancelPrevious = opts.cancelPrevious;
        const subjects = {};
        function getSubjects(id) {
            if (!subjects[id]) {
                const actionCompletedHandlerSubject = new Subject();
                subjects[id] = {
                    actionCompletedHandlerSubject
                };
            }
            return subjects[id];
        }
        attachAction(NgxsFirestoreState, actionType, (_stateContext, action) => {
            const { actionCompletedHandlerSubject } = getSubjects(streamId({ actionType, action, trackBy }));
            const completed$ = actionCompletedHandlerSubject.asObservable().pipe(take(1));
            if (cancelPrevious) {
                return completed$;
            }
            if (this.activeFirestoreConnections.includes(streamId({ actionType, action, trackBy }))) {
                return;
            }
            if (this.actionsPending.includes(streamId({ actionType, action, trackBy }))) {
                return completed$;
            }
            return completed$;
        });
        const actionDispatched$ = this.actions.pipe(ofActionDispatched(actionType), 
        // filter actions not connected already
        // or cancelPrevious
        filter((action) => {
            return cancelPrevious || !this.activeFirestoreConnections.includes(streamId({ actionType, action, trackBy }));
        }), 
        // filter actions dispatched on same tick
        filter((action) => {
            return !this.actionsPending.includes(streamId({ actionType, action, trackBy }));
        }), tap((action) => {
            this.actionsPending.push(streamId({ actionType, action, trackBy }));
        }));
        const firestoreStreamHandler$ = (action) => {
            const streamFn = opts.to;
            return streamFn(action).pipe(
            // connected
            tapOnce((_) => {
                const StreamConnectedClass = StreamConnected(actionType);
                this.store.dispatch(new StreamConnectedClass(action));
                this.activeFirestoreConnections.push(streamId({ actionType, action, trackBy }));
                // remove from actionsPending once connected
                this.actionsPending.splice(this.actionsPending.indexOf(streamId({ actionType, action, trackBy })), 1);
                this.store.dispatch(new NgxsFirestoreConnectActions.StreamConnected(streamId({ actionType, action, trackBy })));
            }), 
            // emmited
            tap((payload) => {
                const StreamEmittedClass = StreamEmitted(actionType);
                this.store.dispatch(new StreamEmittedClass(action, payload));
                this.store.dispatch(new NgxsFirestoreConnectActions.StreamEmitted({
                    id: streamId({ actionType, action, trackBy }),
                    items: payload
                }));
            }), 
            // completed if FirstEmit
            tapOnce(() => {
                if (connectedActionFinishesOn === 'FirstEmit') {
                    const { actionCompletedHandlerSubject } = getSubjects(streamId({ actionType, action, trackBy }));
                    actionCompletedHandlerSubject.next(action);
                }
            }), 
            // disconnect on Disconnect
            takeUntil(race(this.actions.pipe(ofActionDispatched(DisconnectAll)), this.actions.pipe(ofActionDispatched(Disconnect)).pipe(filter((disconnectAction) => {
                const { payload } = disconnectAction;
                if (!payload) {
                    return false;
                }
                const disconnectedStreamId = streamId({
                    actionType: payload.constructor || payload,
                    action: disconnectAction.payload,
                    trackBy
                });
                if (disconnectedStreamId === streamId({ actionType, action, trackBy })) {
                    return true;
                }
                return false;
            })))), 
            // disconnect on action re-dispatched
            takeUntil(this.actions.pipe(ofActionDispatched(actionType), filter((dispatchedAction) => {
                if (!cancelPrevious) {
                    return false;
                }
                //SELF
                if (dispatchedAction === action) {
                    return false;
                }
                const dispatchedActionStreamId = streamId({
                    actionType,
                    action: dispatchedAction,
                    trackBy
                });
                return dispatchedActionStreamId === streamId({ actionType, action, trackBy });
            }))), finalize(() => {
                const StreamDisconnectedClass = StreamDisconnected(actionType);
                this.store.dispatch(new StreamDisconnectedClass(action));
                this.store.dispatch(new NgxsFirestoreConnectActions.StreamDisconnected(streamId({ actionType, action, trackBy })));
                this.activeFirestoreConnections.splice(this.activeFirestoreConnections.indexOf(streamId({ actionType, action, trackBy })), 1);
                // completed if StreamCompleted
                if (connectedActionFinishesOn === 'StreamCompleted') {
                    const { actionCompletedHandlerSubject } = getSubjects(streamId({ actionType, action, trackBy }));
                    actionCompletedHandlerSubject.next(action);
                }
            }), catchError((err) => {
                const { actionCompletedHandlerSubject } = getSubjects(streamId({ actionType, action, trackBy }));
                actionCompletedHandlerSubject.error(err);
                const StreamErroredClass = StreamErrored(actionType);
                this.store.dispatch(new StreamErroredClass(action, err));
                return of({});
            }));
        };
        this.firestoreConnectionsSub.push(actionDispatched$.pipe(mergeMap(firestoreStreamHandler$)).subscribe());
    }
    ngOnDestroy() {
        if (this.firestoreConnectionsSub) {
            this.firestoreConnectionsSub.forEach((sub) => sub.unsubscribe());
        }
    }
};
NgxsFirestoreConnect = __decorate([
    Injectable({ providedIn: 'root' })
], NgxsFirestoreConnect);
export { NgxsFirestoreConnect };
//# sourceMappingURL=ngxs-firestore-connect.service.js.map