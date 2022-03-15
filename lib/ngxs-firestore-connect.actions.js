export var NgxsFirestoreConnectActions;
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
//# sourceMappingURL=ngxs-firestore-connect.actions.js.map