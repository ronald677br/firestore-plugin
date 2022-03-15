import { Action } from '@ngxs/store';
/**
 * This key is used to retrieve static metadatas on state classes.
 * This constant is taken from the core codebase
 */
const META_OPTIONS_KEY = 'NGXS_OPTIONS_META';
export function attachAction(storeClass, action, fn, options) {
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
//# sourceMappingURL=attach-action.js.map