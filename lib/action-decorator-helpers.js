export function StreamConnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Connected`,
        _a;
}
export function StreamEmitted(actionType) {
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
export function StreamDisconnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Disconnected`,
        _a;
}
export function StreamErrored(actionType) {
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
//# sourceMappingURL=action-decorator-helpers.js.map