export declare class DisconnectAll {
    static readonly type = "[NgxsFirestore] DisconnectAll";
}
export declare class Disconnect {
    payload: any;
    static readonly type = "[NgxsFirestore] Disconnect";
    constructor(payload: any);
}
export declare class GetNextPage {
    payload: string;
    static readonly type = "GetNextPage";
    constructor(payload: string);
}
export declare class GetLastPage {
    payload: string;
    static readonly type = "GetLastPage";
    constructor(payload: string);
}
