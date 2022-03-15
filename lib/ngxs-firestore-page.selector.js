import { createSelector } from '@ngxs/store';
import { NgxsFirestorePageState } from './ngxs-firestore-page.state';
export function ngxsFirestorePage(id) {
    return createSelector([NgxsFirestorePageState], (state) => {
        return state.pages.find((page) => page.id === id);
    });
}
//# sourceMappingURL=ngxs-firestore-page.selector.js.map