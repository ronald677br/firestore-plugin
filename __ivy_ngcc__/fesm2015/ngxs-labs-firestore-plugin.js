import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@ngxs/store';
import { Action, State, ofActionDispatched, getActionTypeFromInstance, Actions, NgxsModule, Store, createSelector } from '@ngxs/store';
import { patch, insertItem, updateItem, removeItem } from '@ngxs/store/operators';
import * as i1$1 from '@angular/fire/compat/firestore';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { defer, from, of, Subject, race } from 'rxjs';
import { startWith, map, filter, switchMap, take, timeoutWith, mapTo, tap, share, takeUntil, finalize, catchError, mergeMap } from 'rxjs/operators';
import 'firebase/firestore';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/fire/compat/firestore';
import * as ɵngcc2 from '@ngxs/store';
var NgxsFirestoreConnectActions;
(function (NgxsFirestoreConnectActions) {
    class StreamConnected {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamConnected.type = '[NgxsFirestore] Connected';
    NgxsFirestoreConnectActions.StreamConnected = StreamConnected;
    class StreamEmitted {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamEmitted.type = '[NgxsFirestore] Emitted';
    NgxsFirestoreConnectActions.StreamEmitted = StreamEmitted;
    class StreamDisconnected {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamDisconnected.type = '[NgxsFirestore] Disconnected';
    NgxsFirestoreConnectActions.StreamDisconnected = StreamDisconnected;
})(NgxsFirestoreConnectActions || (NgxsFirestoreConnectActions = {}));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
NgxsFirestoreState.ɵfac = function NgxsFirestoreState_Factory(t) { return new (t || NgxsFirestoreState)(); };
NgxsFirestoreState.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: NgxsFirestoreState, factory: function (t) { return NgxsFirestoreState.ɵfac(t); } });
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
    })
], NgxsFirestoreState);
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestoreState, [{
        type: Injectable
    }], null, null); })();

const NGXS_FIRESTORE_MODULE_OPTIONS = new InjectionToken('NGXS_FIRESTORE_MODULE_OPTIONS');

class DisconnectAll {
}
DisconnectAll.type = '[NgxsFirestore] DisconnectAll';
class Disconnect {
    constructor(payload) {
        this.payload = payload;
    }
}
Disconnect.type = '[NgxsFirestore] Disconnect';
class GetNextPage {
    constructor(payload) {
        this.payload = payload;
    }
}
GetNextPage.type = 'GetNextPage';
class GetLastPage {
    constructor(payload) {
        this.payload = payload;
    }
}
GetLastPage.type = 'GetLastPage';

class NgxsFirestorePageIdService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    createId() {
        return this.firestore.createId();
    }
}
NgxsFirestorePageIdService.ɵfac = function NgxsFirestorePageIdService_Factory(t) { return new (t || NgxsFirestorePageIdService)(ɵngcc0.ɵɵinject(ɵngcc1.AngularFirestore)); };
NgxsFirestorePageIdService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: NgxsFirestorePageIdService, factory: NgxsFirestorePageIdService.ɵfac });
NgxsFirestorePageIdService.ctorParameters = () => [
    { type: AngularFirestore }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestorePageIdService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.AngularFirestore }]; }, null); })();
class NgxsFirestorePageService {
    constructor(actions$, pageId) {
        this.actions$ = actions$;
        this.pageId = pageId;
    }
    create(queryFn, size, orderBy) {
        return defer(() => {
            const pages = [];
            return this.actions$.pipe(ofActionDispatched(GetNextPage, GetLastPage), startWith('INIT'), map((action) => {
                const actionType = getActionTypeFromInstance(action);
                const payload = action === 'INIT' ? this.pageId.createId() : action.payload;
                return { payload, actionType: actionType || 'GetNextPage' };
            }), filter(({ payload, actionType }) => {
                return pages.length === 0 || !!pages.find((page) => page.id === payload);
            }), map(({ payload, actionType }) => {
                const thePage = pages.find((page) => page.id === payload);
                let limit = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) || 0;
                if (actionType === 'GetNextPage') {
                    limit += size;
                }
                else if (limit - size > 0) {
                    limit -= size;
                }
                const skip = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) === limit;
                if (thePage) {
                    thePage.limit = limit;
                }
                else {
                    pages.push({ id: payload, limit });
                }
                return { pageId: payload, limit, skip };
            }), filter(({ skip }) => {
                return !skip;
            }), switchMap(({ pageId, limit }) => {
                return queryFn((ref) => {
                    return orderBy
                        .reduce((prev, curr) => prev.orderBy(curr.fieldPath, curr.directionStr || 'asc'), ref)
                        .limit(limit);
                }).pipe(map((results) => {
                    return { results, pageId, pageSize: limit };
                }));
            }));
        });
    }
}
NgxsFirestorePageService.ɵfac = function NgxsFirestorePageService_Factory(t) { return new (t || NgxsFirestorePageService)(ɵngcc0.ɵɵinject(ɵngcc2.Actions), ɵngcc0.ɵɵinject(NgxsFirestorePageIdService)); };
NgxsFirestorePageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxsFirestorePageService_Factory() { return new NgxsFirestorePageService(i0.ɵɵinject(i1.Actions), i0.ɵɵinject(NgxsFirestorePageIdService)); }, token: NgxsFirestorePageService, providedIn: "root" });
NgxsFirestorePageService.ctorParameters = () => [
    { type: Actions },
    { type: NgxsFirestorePageIdService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestorePageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: ɵngcc2.Actions }, { type: NgxsFirestorePageIdService }]; }, null); })();

class NgxsFirestoreModule {
    static forRoot(options) {
        return {
            ngModule: NgxsFirestoreModule,
            providers: [
                {
                    provide: NGXS_FIRESTORE_MODULE_OPTIONS,
                    useValue: options || { timeoutWriteOperations: false }
                },
                {
                    provide: NgxsFirestorePageIdService,
                    useClass: NgxsFirestorePageIdService
                }
            ]
        };
    }
}
NgxsFirestoreModule.ɵfac = function NgxsFirestoreModule_Factory(t) { return new (t || NgxsFirestoreModule)(); };
NgxsFirestoreModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: NgxsFirestoreModule });
NgxsFirestoreModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[CommonModule, NgxsModule.forFeature([NgxsFirestoreState]), AngularFirestoreModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestoreModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NgxsModule.forFeature([NgxsFirestoreState]), AngularFirestoreModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgxsFirestoreModule, { imports: function () { return [CommonModule, ɵngcc2.ɵbc, AngularFirestoreModule]; } }); })();

class NgxsFirestoreAdapter {
    constructor(firestore, store, options) {
        this.firestore = firestore;
        this.store = store;
        this.options = options;
    }
}
NgxsFirestoreAdapter.ɵfac = function NgxsFirestoreAdapter_Factory(t) { return new (t || NgxsFirestoreAdapter)(ɵngcc0.ɵɵinject(AngularFirestore), ɵngcc0.ɵɵinject(Store), ɵngcc0.ɵɵinject(NGXS_FIRESTORE_MODULE_OPTIONS, 8)); };
NgxsFirestoreAdapter.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxsFirestoreAdapter_Factory() { return new NgxsFirestoreAdapter(i0.ɵɵinject(i1$1.AngularFirestore), i0.ɵɵinject(i1.Store), i0.ɵɵinject(NGXS_FIRESTORE_MODULE_OPTIONS, 8)); }, token: NgxsFirestoreAdapter, providedIn: "root" });
NgxsFirestoreAdapter.ctorParameters = () => [
    { type: AngularFirestore, decorators: [{ type: Inject, args: [AngularFirestore,] }] },
    { type: Store, decorators: [{ type: Inject, args: [Store,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGXS_FIRESTORE_MODULE_OPTIONS,] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestoreAdapter, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: ɵngcc1.AngularFirestore, decorators: [{
                type: Inject,
                args: [AngularFirestore]
            }] }, { type: ɵngcc2.Store, decorators: [{
                type: Inject,
                args: [Store]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [NGXS_FIRESTORE_MODULE_OPTIONS]
            }] }]; }, null); })();

class NgxsFirestore {
    constructor(adapter) {
        this.adapter = adapter;
        this.idField = 'id';
        this.converter = {
            toFirestore: (value) => {
                return value;
            },
            fromFirestore: (snapshot, options) => {
                return Object.assign({}, snapshot.data(options));
            }
        };
    }
    createId() {
        return this.adapter.firestore.createId();
    }
    doc$(id) {
        return this.adapter.firestore
            .doc(this.docRef(id))
            .snapshotChanges()
            .pipe(map((docSnapshot) => {
            if (docSnapshot.payload.exists) {
                return this.getDataWithId(docSnapshot.payload);
            }
            else {
                return undefined;
            }
        }));
    }
    docOnce$(id) {
        return this.doc$(id).pipe(take(1));
    }
    collection$(queryFn = (ref) => ref) {
        return this.adapter.firestore
            .collection(this.path, (ref) => {
            return queryFn(ref.withConverter(this.converter));
        })
            .snapshotChanges()
            .pipe(map((docSnapshots) => docSnapshots.map((docSnapshot) => {
            return this.getDataWithId(docSnapshot.payload.doc);
        })));
    }
    collectionOnce$(queryFn) {
        return this.collection$(queryFn).pipe(take(1));
    }
    update$(id, value, setOptions) {
        return this.docSet(id, value, setOptions);
    }
    delete$(id) {
        return from(this.doc(id).delete()).pipe();
    }
    create$(value) {
        return this.upsert$(value);
    }
    upsert$(value, setOptions) {
        let id;
        let newValue;
        if (Object.keys(value).includes(this.idField) && !!value[this.idField]) {
            id = value[this.idField];
            newValue = Object.assign({}, value);
        }
        else {
            id = this.createId();
            newValue = Object.assign({}, value, { [this.idField]: id });
        }
        return this.docSet(id, newValue, setOptions);
    }
    getDataWithId(doc) {
        const data = doc.data();
        const id = (data && data[this.idField]) || doc.id;
        return Object.assign(Object.assign({}, data), { [this.idField]: id });
    }
    doc(id) {
        return this.adapter.firestore.doc(this.docRef(id));
    }
    docSet(id, value, setOptions) {
        setOptions = setOptions || { merge: true };
        if (this.isOffline()) {
            this.doc(id).set(value, setOptions);
            return of(id);
        }
        if (this.adapter.options && this.adapter.options.timeoutWriteOperations) {
            return from(this.doc(id).set(value, setOptions)).pipe(timeoutWith(this.adapter.options.timeoutWriteOperations, of(id)), mapTo(id));
        }
        else {
            return from(this.doc(id).set(value, setOptions)).pipe(mapTo(id));
        }
    }
    docRef(id) {
        return this.adapter.firestore.doc(`${this.path}/${id}`).ref.withConverter(this.converter);
    }
    isOffline() {
        return navigator.onLine !== undefined && !navigator.onLine;
    }
}
NgxsFirestore.ɵfac = function NgxsFirestore_Factory(t) { return new (t || NgxsFirestore)(ɵngcc0.ɵɵinject(NgxsFirestoreAdapter)); };
NgxsFirestore.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: NgxsFirestore, factory: NgxsFirestore.ɵfac });
NgxsFirestore.ctorParameters = () => [
    { type: NgxsFirestoreAdapter, decorators: [{ type: Inject, args: [NgxsFirestoreAdapter,] }] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestore, [{
        type: Injectable
    }], function () { return [{ type: NgxsFirestoreAdapter, decorators: [{
                type: Inject,
                args: [NgxsFirestoreAdapter]
            }] }]; }, null); })();

function StreamConnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Connected`,
        _a;
}
function StreamEmitted(actionType) {
    var _a;
    return _a = class {
            constructor(action, payload) {
                this.action = action;
                this.payload = payload;
            }
        },
        _a.type = `${actionType.type} Emitted`,
        _a;
}
function StreamDisconnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Disconnected`,
        _a;
}
function StreamErrored(actionType) {
    var _a;
    return _a = class {
            constructor(action, error) {
                this.action = action;
                this.error = error;
            }
        },
        _a.type = `${actionType.type} Errored`,
        _a;
}

/**
 * This key is used to retrieve static metadatas on state classes.
 * This constant is taken from the core codebase
 */
const META_OPTIONS_KEY = 'NGXS_OPTIONS_META';
function attachAction(storeClass, action, fn, options) {
    if (!storeClass[META_OPTIONS_KEY]) {
        throw new Error('storeClass is not a valid NGXS Store');
    }
    const methodName = getActionMethodName(action);
    storeClass.prototype[methodName] = function (_state, _action) {
        return fn(_state, _action);
    };
    Action(action, options)({ constructor: storeClass }, methodName, null);
}
const getActionMethodName = (action) => {
    const actionName = action.type.replace(/[^a-zA-Z0-9]+/g, '');
    return `${actionName}`;
};
const ɵ0$1 = getActionMethodName;

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
class NgxsFirestoreConnect {
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
}
NgxsFirestoreConnect.ɵfac = function NgxsFirestoreConnect_Factory(t) { return new (t || NgxsFirestoreConnect)(ɵngcc0.ɵɵinject(ɵngcc2.Store), ɵngcc0.ɵɵinject(ɵngcc2.Actions)); };
NgxsFirestoreConnect.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxsFirestoreConnect_Factory() { return new NgxsFirestoreConnect(i0.ɵɵinject(i1.Store), i0.ɵɵinject(i1.Actions)); }, token: NgxsFirestoreConnect, providedIn: "root" });
NgxsFirestoreConnect.ctorParameters = () => [
    { type: Store },
    { type: Actions }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(NgxsFirestoreConnect, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: ɵngcc2.Store }, { type: ɵngcc2.Actions }]; }, null); })();

const ɵ0 = (state) => {
    return state.connections;
};
const ngxsFirectoreConnections = createSelector([NgxsFirestoreState], ɵ0);

/**
 * Generated bundle index. Do not edit.
 */

export { Disconnect, DisconnectAll, GetLastPage, GetNextPage, NgxsFirestore, NgxsFirestoreAdapter, NgxsFirestoreConnect, NgxsFirestoreModule, NgxsFirestorePageIdService, NgxsFirestorePageService, StreamConnected, StreamDisconnected, StreamEmitted, StreamErrored, ngxsFirectoreConnections, ɵ0, NgxsFirestoreState as ɵa, NgxsFirestoreConnectActions as ɵb, NGXS_FIRESTORE_MODULE_OPTIONS as ɵd };

//# sourceMappingURL=ngxs-labs-firestore-plugin.js.map