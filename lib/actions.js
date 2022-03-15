export class DisconnectAll {
}
DisconnectAll.type = '[NgxsFirestore] DisconnectAll';
export class Disconnect {
    constructor(payload) {
        this.payload = payload;
    }
}
Disconnect.type = '[NgxsFirestore] Disconnect';
export class GetNextPage {
    constructor(payload) {
        this.payload = payload;
    }
}
GetNextPage.type = 'GetNextPage';
export class GetLastPage {
    constructor(payload) {
        this.payload = payload;
    }
}
GetLastPage.type = 'GetLastPage';
//# sourceMappingURL=actions.js.map