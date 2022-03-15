import { ActionType } from '@ngxs/store';
export declare function StreamConnected(actionType: ActionType): {
    new (action: any): {
        action: any;
    };
    readonly type: string;
};
export declare function StreamEmitted(actionType: ActionType): {
    new (action: any, payload: any): {
        action: any;
        payload: any;
    };
    readonly type: string;
};
export declare function StreamDisconnected(actionType: ActionType): {
    new (action: any): {
        action: any;
    };
    readonly type: string;
};
export declare function StreamErrored(actionType: ActionType): {
    new (action: any, error: any): {
        action: any;
        error: any;
    };
    readonly type: string;
};
