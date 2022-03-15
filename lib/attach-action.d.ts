import { ActionOptions, ActionType, StateContext } from '@ngxs/store';
export declare function attachAction<S, A>(storeClass: any, action: ActionType, fn: (ctx: StateContext<S>, action: A) => any, options?: ActionOptions): void;
