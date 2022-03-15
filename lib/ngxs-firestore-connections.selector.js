import { createSelector } from '@ngxs/store';
import { NgxsFirestoreState } from './ngxs-firestore.state';
export const ngxsFirectoreConnections = createSelector([NgxsFirestoreState], (state) => {
    return state.connections;
});
//# sourceMappingURL=ngxs-firestore-connections.selector.js.map