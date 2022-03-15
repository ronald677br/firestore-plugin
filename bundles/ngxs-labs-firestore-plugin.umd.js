(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ngxs/store'), require('@ngxs/store/operators'), require('@angular/fire/firestore'), require('rxjs'), require('rxjs/operators'), require('firebase/firestore')) :
    typeof define === 'function' && define.amd ? define('@ngxs-labs/firestore-plugin', ['exports', '@angular/core', '@angular/common', '@ngxs/store', '@ngxs/store/operators', '@angular/fire/firestore', 'rxjs', 'rxjs/operators', 'firebase/firestore'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["ngxs-labs"] = global["ngxs-labs"] || {}, global["ngxs-labs"]["firestore-plugin"] = {}), global.ng.core, global.ng.common, global["ngxs-store"], global.operators, global.ng.fire.firestore, global.rxjs, global.rxjs.operators));
})(this, (function (exports, i0, common, i1, operators, i1$1, rxjs, operators$1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    exports["ɵb"] = void 0;
    (function (NgxsFirestoreConnectActions) {
        var StreamConnected = /** @class */ (function () {
            function StreamConnected(payload) {
                this.payload = payload;
            }
            return StreamConnected;
        }());
        StreamConnected.type = '[NgxsFirestore] Connected';
        NgxsFirestoreConnectActions.StreamConnected = StreamConnected;
        var StreamEmitted = /** @class */ (function () {
            function StreamEmitted(payload) {
                this.payload = payload;
            }
            return StreamEmitted;
        }());
        StreamEmitted.type = '[NgxsFirestore] Emitted';
        NgxsFirestoreConnectActions.StreamEmitted = StreamEmitted;
        var StreamDisconnected = /** @class */ (function () {
            function StreamDisconnected(payload) {
                this.payload = payload;
            }
            return StreamDisconnected;
        }());
        StreamDisconnected.type = '[NgxsFirestore] Disconnected';
        NgxsFirestoreConnectActions.StreamDisconnected = StreamDisconnected;
    })(exports["ɵb"] || (exports["ɵb"] = {}));

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    exports["ɵa"] = /** @class */ (function () {
        function NgxsFirestoreState() {
        }
        NgxsFirestoreState.prototype.ngxsOnInit = function (_ctx) { };
        NgxsFirestoreState.prototype.streamConnected = function (_a, _b) {
            var setState = _a.setState;
            var payload = _b.payload;
            var conn = {
                connectedAt: new Date(),
                id: payload
            };
            setState(operators.patch({ connections: operators.insertItem(conn) }));
        };
        NgxsFirestoreState.prototype.streamEmitted = function (_a, _b) {
            var setState = _a.setState;
            var payload = _b.payload;
            var id = payload.id;
            setState(operators.patch({
                connections: operators.updateItem(function (x) { return x.id === id; }, operators.patch({ emmitedAt: operators.insertItem(new Date()) }))
            }));
        };
        NgxsFirestoreState.prototype.streamDisconnected = function (_a, _b) {
            var setState = _a.setState, getState = _a.getState;
            var payload = _b.payload;
            setState(operators.patch({ connections: operators.removeItem(function (x) { return x.id === payload; }) }));
        };
        return NgxsFirestoreState;
    }());
    exports["ɵa"].decorators = [
        { type: i0.Injectable }
    ];
    __decorate([
        i1.Action([exports["ɵb"].StreamConnected])
    ], exports["ɵa"].prototype, "streamConnected", null);
    __decorate([
        i1.Action([exports["ɵb"].StreamEmitted])
    ], exports["ɵa"].prototype, "streamEmitted", null);
    __decorate([
        i1.Action([exports["ɵb"].StreamDisconnected])
    ], exports["ɵa"].prototype, "streamDisconnected", null);
    exports["ɵa"] = __decorate([
        i1.State({
            name: 'ngxs_firestore',
            defaults: {
                connections: []
            }
        })
    ], exports["ɵa"]);

    var NGXS_FIRESTORE_MODULE_OPTIONS = new i0.InjectionToken('NGXS_FIRESTORE_MODULE_OPTIONS');

    var DisconnectAll = /** @class */ (function () {
        function DisconnectAll() {
        }
        return DisconnectAll;
    }());
    DisconnectAll.type = '[NgxsFirestore] DisconnectAll';
    var Disconnect = /** @class */ (function () {
        function Disconnect(payload) {
            this.payload = payload;
        }
        return Disconnect;
    }());
    Disconnect.type = '[NgxsFirestore] Disconnect';
    var GetNextPage = /** @class */ (function () {
        function GetNextPage(payload) {
            this.payload = payload;
        }
        return GetNextPage;
    }());
    GetNextPage.type = 'GetNextPage';
    var GetLastPage = /** @class */ (function () {
        function GetLastPage(payload) {
            this.payload = payload;
        }
        return GetLastPage;
    }());
    GetLastPage.type = 'GetLastPage';

    var NgxsFirestorePageIdService = /** @class */ (function () {
        function NgxsFirestorePageIdService(firestore) {
            this.firestore = firestore;
        }
        NgxsFirestorePageIdService.prototype.createId = function () {
            return this.firestore.createId();
        };
        return NgxsFirestorePageIdService;
    }());
    NgxsFirestorePageIdService.decorators = [
        { type: i0.Injectable }
    ];
    NgxsFirestorePageIdService.ctorParameters = function () { return [
        { type: i1$1.AngularFirestore }
    ]; };
    var NgxsFirestorePageService = /** @class */ (function () {
        function NgxsFirestorePageService(actions$, pageId) {
            this.actions$ = actions$;
            this.pageId = pageId;
        }
        NgxsFirestorePageService.prototype.create = function (queryFn, size, orderBy) {
            var _this = this;
            return rxjs.defer(function () {
                var pages = [];
                return _this.actions$.pipe(i1.ofActionDispatched(GetNextPage, GetLastPage), operators$1.startWith('INIT'), operators$1.map(function (action) {
                    var actionType = i1.getActionTypeFromInstance(action);
                    var payload = action === 'INIT' ? _this.pageId.createId() : action.payload;
                    return { payload: payload, actionType: actionType || 'GetNextPage' };
                }), operators$1.filter(function (_a) {
                    var payload = _a.payload, actionType = _a.actionType;
                    return pages.length === 0 || !!pages.find(function (page) { return page.id === payload; });
                }), operators$1.map(function (_a) {
                    var payload = _a.payload, actionType = _a.actionType;
                    var thePage = pages.find(function (page) { return page.id === payload; });
                    var limit = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) || 0;
                    if (actionType === 'GetNextPage') {
                        limit += size;
                    }
                    else if (limit - size > 0) {
                        limit -= size;
                    }
                    var skip = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) === limit;
                    if (thePage) {
                        thePage.limit = limit;
                    }
                    else {
                        pages.push({ id: payload, limit: limit });
                    }
                    return { pageId: payload, limit: limit, skip: skip };
                }), operators$1.filter(function (_a) {
                    var skip = _a.skip;
                    return !skip;
                }), operators$1.switchMap(function (_a) {
                    var pageId = _a.pageId, limit = _a.limit;
                    return queryFn(function (ref) {
                        return orderBy
                            .reduce(function (prev, curr) { return prev.orderBy(curr.fieldPath, curr.directionStr || 'asc'); }, ref)
                            .limit(limit);
                    }).pipe(operators$1.map(function (results) {
                        return { results: results, pageId: pageId, pageSize: limit };
                    }));
                }));
            });
        };
        return NgxsFirestorePageService;
    }());
    NgxsFirestorePageService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function NgxsFirestorePageService_Factory() { return new NgxsFirestorePageService(i0__namespace.ɵɵinject(i1__namespace.Actions), i0__namespace.ɵɵinject(NgxsFirestorePageIdService)); }, token: NgxsFirestorePageService, providedIn: "root" });
    NgxsFirestorePageService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgxsFirestorePageService.ctorParameters = function () { return [
        { type: i1.Actions },
        { type: NgxsFirestorePageIdService }
    ]; };

    var NgxsFirestoreModule = /** @class */ (function () {
        function NgxsFirestoreModule() {
        }
        NgxsFirestoreModule.forRoot = function (options) {
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
        };
        return NgxsFirestoreModule;
    }());
    NgxsFirestoreModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule, i1.NgxsModule.forFeature([exports["ɵa"]]), i1$1.AngularFirestoreModule]
                },] }
    ];

    var NgxsFirestoreAdapter = /** @class */ (function () {
        function NgxsFirestoreAdapter(firestore, store, options) {
            this.firestore = firestore;
            this.store = store;
            this.options = options;
        }
        return NgxsFirestoreAdapter;
    }());
    NgxsFirestoreAdapter.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function NgxsFirestoreAdapter_Factory() { return new NgxsFirestoreAdapter(i0__namespace.ɵɵinject(i1__namespace$1.AngularFirestore), i0__namespace.ɵɵinject(i1__namespace.Store), i0__namespace.ɵɵinject(NGXS_FIRESTORE_MODULE_OPTIONS, 8)); }, token: NgxsFirestoreAdapter, providedIn: "root" });
    NgxsFirestoreAdapter.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgxsFirestoreAdapter.ctorParameters = function () { return [
        { type: i1$1.AngularFirestore, decorators: [{ type: i0.Inject, args: [i1$1.AngularFirestore,] }] },
        { type: i1.Store, decorators: [{ type: i0.Inject, args: [i1.Store,] }] },
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [NGXS_FIRESTORE_MODULE_OPTIONS,] }] }
    ]; };

    var NgxsFirestore = /** @class */ (function () {
        function NgxsFirestore(adapter) {
            this.adapter = adapter;
            this.idField = 'id';
            this.converter = {
                toFirestore: function (value) {
                    return value;
                },
                fromFirestore: function (snapshot, options) {
                    return Object.assign({}, snapshot.data(options));
                }
            };
        }
        NgxsFirestore.prototype.createId = function () {
            return this.adapter.firestore.createId();
        };
        NgxsFirestore.prototype.doc$ = function (id) {
            var _this = this;
            return this.adapter.firestore
                .doc(this.docRef(id))
                .snapshotChanges()
                .pipe(operators$1.map(function (docSnapshot) {
                if (docSnapshot.payload.exists) {
                    return _this.getDataWithId(docSnapshot.payload);
                }
                else {
                    return undefined;
                }
            }));
        };
        NgxsFirestore.prototype.docOnce$ = function (id) {
            return this.doc$(id).pipe(operators$1.take(1));
        };
        NgxsFirestore.prototype.collection$ = function (queryFn) {
            var _this = this;
            if (queryFn === void 0) { queryFn = function (ref) { return ref; }; }
            return this.adapter.firestore
                .collection(this.path, function (ref) {
                return queryFn(ref.withConverter(_this.converter));
            })
                .snapshotChanges()
                .pipe(operators$1.map(function (docSnapshots) { return docSnapshots.map(function (docSnapshot) {
                return _this.getDataWithId(docSnapshot.payload.doc);
            }); }));
        };
        NgxsFirestore.prototype.collectionOnce$ = function (queryFn) {
            return this.collection$(queryFn).pipe(operators$1.take(1));
        };
        NgxsFirestore.prototype.update$ = function (id, value, setOptions) {
            return this.docSet(id, value, setOptions);
        };
        NgxsFirestore.prototype.delete$ = function (id) {
            return rxjs.from(this.doc(id).delete()).pipe();
        };
        NgxsFirestore.prototype.create$ = function (value) {
            return this.upsert$(value);
        };
        NgxsFirestore.prototype.upsert$ = function (value, setOptions) {
            var _a;
            var id;
            var newValue;
            if (Object.keys(value).includes(this.idField) && !!value[this.idField]) {
                id = value[this.idField];
                newValue = Object.assign({}, value);
            }
            else {
                id = this.createId();
                newValue = Object.assign({}, value, (_a = {}, _a[this.idField] = id, _a));
            }
            return this.docSet(id, newValue, setOptions);
        };
        NgxsFirestore.prototype.getDataWithId = function (doc) {
            var _a;
            var data = doc.data();
            var id = (data && data[this.idField]) || doc.id;
            return Object.assign(Object.assign({}, data), (_a = {}, _a[this.idField] = id, _a));
        };
        NgxsFirestore.prototype.doc = function (id) {
            return this.adapter.firestore.doc(this.docRef(id));
        };
        NgxsFirestore.prototype.docSet = function (id, value, setOptions) {
            setOptions = setOptions || { merge: true };
            if (this.isOffline()) {
                this.doc(id).set(value, setOptions);
                return rxjs.of(id);
            }
            if (this.adapter.options && this.adapter.options.timeoutWriteOperations) {
                return rxjs.from(this.doc(id).set(value, setOptions)).pipe(operators$1.timeoutWith(this.adapter.options.timeoutWriteOperations, rxjs.of(id)), operators$1.mapTo(id));
            }
            else {
                return rxjs.from(this.doc(id).set(value, setOptions)).pipe(operators$1.mapTo(id));
            }
        };
        NgxsFirestore.prototype.docRef = function (id) {
            return this.adapter.firestore.doc(this.path + "/" + id).ref.withConverter(this.converter);
        };
        NgxsFirestore.prototype.isOffline = function () {
            return navigator.onLine !== undefined && !navigator.onLine;
        };
        return NgxsFirestore;
    }());
    NgxsFirestore.decorators = [
        { type: i0.Injectable }
    ];
    NgxsFirestore.ctorParameters = function () { return [
        { type: NgxsFirestoreAdapter, decorators: [{ type: i0.Inject, args: [NgxsFirestoreAdapter,] }] }
    ]; };

    function StreamConnected(actionType) {
        var _a;
        return _a = /** @class */ (function () {
            function _a(action) {
                this.action = action;
            }
            return _a;
        }()),
            _a.type = actionType.type + " Connected",
            _a;
    }
    function StreamEmitted(actionType) {
        var _a;
        return _a = /** @class */ (function () {
            function _a(action, payload) {
                this.action = action;
                this.payload = payload;
            }
            return _a;
        }()),
            _a.type = actionType.type + " Emitted",
            _a;
    }
    function StreamDisconnected(actionType) {
        var _a;
        return _a = /** @class */ (function () {
            function _a(action) {
                this.action = action;
            }
            return _a;
        }()),
            _a.type = actionType.type + " Disconnected",
            _a;
    }
    function StreamErrored(actionType) {
        var _a;
        return _a = /** @class */ (function () {
            function _a(action, error) {
                this.action = action;
                this.error = error;
            }
            return _a;
        }()),
            _a.type = actionType.type + " Errored",
            _a;
    }

    /**
     * This key is used to retrieve static metadatas on state classes.
     * This constant is taken from the core codebase
     */
    var META_OPTIONS_KEY = 'NGXS_OPTIONS_META';
    function attachAction(storeClass, action, fn, options) {
        if (!storeClass[META_OPTIONS_KEY]) {
            throw new Error('storeClass is not a valid NGXS Store');
        }
        var methodName = getActionMethodName(action);
        storeClass.prototype[methodName] = function (_state, _action) {
            return fn(_state, _action);
        };
        i1.Action(action, options)({ constructor: storeClass }, methodName, null);
    }
    var getActionMethodName = function (action) {
        var actionName = action.type.replace(/[^a-zA-Z0-9]+/g, '');
        return "" + actionName;
    };
    var ɵ0$1 = getActionMethodName;

    function defaultTrackBy(action) {
        return '';
    }
    function streamId(opts) {
        var id = "" + opts.actionType.type;
        if (opts.trackBy(opts.action)) {
            id = id.concat(" (" + opts.trackBy(opts.action) + ")");
        }
        return id;
    }
    function tapOnce(fn) {
        return function (source) { return rxjs.defer(function () {
            var first = true;
            return source.pipe(operators$1.tap(function (payload) {
                if (first) {
                    fn(payload);
                }
                first = false;
            }));
        }).pipe(operators$1.share()); };
    }
    var NgxsFirestoreConnect = /** @class */ (function () {
        function NgxsFirestoreConnect(store, actions) {
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
        NgxsFirestoreConnect.prototype.connect = function (actionType, opts) {
            var _this = this;
            var connectedActionFinishesOn = opts.connectedActionFinishesOn || 'FirstEmit';
            var trackBy = opts.trackBy || defaultTrackBy;
            var cancelPrevious = opts.cancelPrevious;
            var subjects = {};
            function getSubjects(id) {
                if (!subjects[id]) {
                    var actionCompletedHandlerSubject = new rxjs.Subject();
                    subjects[id] = {
                        actionCompletedHandlerSubject: actionCompletedHandlerSubject
                    };
                }
                return subjects[id];
            }
            attachAction(exports["ɵa"], actionType, function (_stateContext, action) {
                var actionCompletedHandlerSubject = getSubjects(streamId({ actionType: actionType, action: action, trackBy: trackBy })).actionCompletedHandlerSubject;
                var completed$ = actionCompletedHandlerSubject.asObservable().pipe(operators$1.take(1));
                if (cancelPrevious) {
                    return completed$;
                }
                if (_this.activeFirestoreConnections.includes(streamId({ actionType: actionType, action: action, trackBy: trackBy }))) {
                    return;
                }
                if (_this.actionsPending.includes(streamId({ actionType: actionType, action: action, trackBy: trackBy }))) {
                    return completed$;
                }
                return completed$;
            });
            var actionDispatched$ = this.actions.pipe(i1.ofActionDispatched(actionType), 
            // filter actions not connected already
            // or cancelPrevious
            operators$1.filter(function (action) {
                return cancelPrevious || !_this.activeFirestoreConnections.includes(streamId({ actionType: actionType, action: action, trackBy: trackBy }));
            }), 
            // filter actions dispatched on same tick
            operators$1.filter(function (action) {
                return !_this.actionsPending.includes(streamId({ actionType: actionType, action: action, trackBy: trackBy }));
            }), operators$1.tap(function (action) {
                _this.actionsPending.push(streamId({ actionType: actionType, action: action, trackBy: trackBy }));
            }));
            var firestoreStreamHandler$ = function (action) {
                var streamFn = opts.to;
                return streamFn(action).pipe(
                // connected
                tapOnce(function (_) {
                    var StreamConnectedClass = StreamConnected(actionType);
                    _this.store.dispatch(new StreamConnectedClass(action));
                    _this.activeFirestoreConnections.push(streamId({ actionType: actionType, action: action, trackBy: trackBy }));
                    // remove from actionsPending once connected
                    _this.actionsPending.splice(_this.actionsPending.indexOf(streamId({ actionType: actionType, action: action, trackBy: trackBy })), 1);
                    _this.store.dispatch(new exports["ɵb"].StreamConnected(streamId({ actionType: actionType, action: action, trackBy: trackBy })));
                }), 
                // emmited
                operators$1.tap(function (payload) {
                    var StreamEmittedClass = StreamEmitted(actionType);
                    _this.store.dispatch(new StreamEmittedClass(action, payload));
                    _this.store.dispatch(new exports["ɵb"].StreamEmitted({
                        id: streamId({ actionType: actionType, action: action, trackBy: trackBy }),
                        items: payload
                    }));
                }), 
                // completed if FirstEmit
                tapOnce(function () {
                    if (connectedActionFinishesOn === 'FirstEmit') {
                        var actionCompletedHandlerSubject = getSubjects(streamId({ actionType: actionType, action: action, trackBy: trackBy })).actionCompletedHandlerSubject;
                        actionCompletedHandlerSubject.next(action);
                    }
                }), 
                // disconnect on Disconnect
                operators$1.takeUntil(rxjs.race(_this.actions.pipe(i1.ofActionDispatched(DisconnectAll)), _this.actions.pipe(i1.ofActionDispatched(Disconnect)).pipe(operators$1.filter(function (disconnectAction) {
                    var payload = disconnectAction.payload;
                    if (!payload) {
                        return false;
                    }
                    var disconnectedStreamId = streamId({
                        actionType: payload.constructor || payload,
                        action: disconnectAction.payload,
                        trackBy: trackBy
                    });
                    if (disconnectedStreamId === streamId({ actionType: actionType, action: action, trackBy: trackBy })) {
                        return true;
                    }
                    return false;
                })))), 
                // disconnect on action re-dispatched
                operators$1.takeUntil(_this.actions.pipe(i1.ofActionDispatched(actionType), operators$1.filter(function (dispatchedAction) {
                    if (!cancelPrevious) {
                        return false;
                    }
                    //SELF
                    if (dispatchedAction === action) {
                        return false;
                    }
                    var dispatchedActionStreamId = streamId({
                        actionType: actionType,
                        action: dispatchedAction,
                        trackBy: trackBy
                    });
                    return dispatchedActionStreamId === streamId({ actionType: actionType, action: action, trackBy: trackBy });
                }))), operators$1.finalize(function () {
                    var StreamDisconnectedClass = StreamDisconnected(actionType);
                    _this.store.dispatch(new StreamDisconnectedClass(action));
                    _this.store.dispatch(new exports["ɵb"].StreamDisconnected(streamId({ actionType: actionType, action: action, trackBy: trackBy })));
                    _this.activeFirestoreConnections.splice(_this.activeFirestoreConnections.indexOf(streamId({ actionType: actionType, action: action, trackBy: trackBy })), 1);
                    // completed if StreamCompleted
                    if (connectedActionFinishesOn === 'StreamCompleted') {
                        var actionCompletedHandlerSubject = getSubjects(streamId({ actionType: actionType, action: action, trackBy: trackBy })).actionCompletedHandlerSubject;
                        actionCompletedHandlerSubject.next(action);
                    }
                }), operators$1.catchError(function (err) {
                    var actionCompletedHandlerSubject = getSubjects(streamId({ actionType: actionType, action: action, trackBy: trackBy })).actionCompletedHandlerSubject;
                    actionCompletedHandlerSubject.error(err);
                    var StreamErroredClass = StreamErrored(actionType);
                    _this.store.dispatch(new StreamErroredClass(action, err));
                    return rxjs.of({});
                }));
            };
            this.firestoreConnectionsSub.push(actionDispatched$.pipe(operators$1.mergeMap(firestoreStreamHandler$)).subscribe());
        };
        NgxsFirestoreConnect.prototype.ngOnDestroy = function () {
            if (this.firestoreConnectionsSub) {
                this.firestoreConnectionsSub.forEach(function (sub) { return sub.unsubscribe(); });
            }
        };
        return NgxsFirestoreConnect;
    }());
    NgxsFirestoreConnect.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function NgxsFirestoreConnect_Factory() { return new NgxsFirestoreConnect(i0__namespace.ɵɵinject(i1__namespace.Store), i0__namespace.ɵɵinject(i1__namespace.Actions)); }, token: NgxsFirestoreConnect, providedIn: "root" });
    NgxsFirestoreConnect.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgxsFirestoreConnect.ctorParameters = function () { return [
        { type: i1.Store },
        { type: i1.Actions }
    ]; };

    var ɵ0 = function (state) {
        return state.connections;
    };
    var ngxsFirectoreConnections = i1.createSelector([exports["ɵa"]], ɵ0);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Disconnect = Disconnect;
    exports.DisconnectAll = DisconnectAll;
    exports.GetLastPage = GetLastPage;
    exports.GetNextPage = GetNextPage;
    exports.NgxsFirestore = NgxsFirestore;
    exports.NgxsFirestoreAdapter = NgxsFirestoreAdapter;
    exports.NgxsFirestoreConnect = NgxsFirestoreConnect;
    exports.NgxsFirestoreModule = NgxsFirestoreModule;
    exports.NgxsFirestorePageIdService = NgxsFirestorePageIdService;
    exports.NgxsFirestorePageService = NgxsFirestorePageService;
    exports.StreamConnected = StreamConnected;
    exports.StreamDisconnected = StreamDisconnected;
    exports.StreamEmitted = StreamEmitted;
    exports.StreamErrored = StreamErrored;
    exports.ngxsFirectoreConnections = ngxsFirectoreConnections;
    exports["ɵ0"] = ɵ0;
    exports["ɵd"] = NGXS_FIRESTORE_MODULE_OPTIONS;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngxs-labs-firestore-plugin.umd.js.map
