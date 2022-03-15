declare namespace NgxsFirestoreDebugPayloads {
    interface StreamEmitted {
        id: string;
        items: any;
    }
}
export declare namespace NgxsFirestoreConnectActions {
    class StreamConnected {
        payload: string;
        static readonly type = "[NgxsFirestore] Connected";
        constructor(payload: string);
    }
    class StreamEmitted {
        payload: NgxsFirestoreDebugPayloads.StreamEmitted;
        static readonly type = "[NgxsFirestore] Emitted";
        constructor(payload: NgxsFirestoreDebugPayloads.StreamEmitted);
    }
    class StreamDisconnected {
        payload: string;
        static readonly type = "[NgxsFirestore] Disconnected";
        constructor(payload: string);
    }
}
export {};
