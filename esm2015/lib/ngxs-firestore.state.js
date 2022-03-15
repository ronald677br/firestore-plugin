var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { State, Action } from '@ngxs/store';
import { NgxsFirestoreConnectActions } from './ngxs-firestore-connect.actions';
import { patch, insertItem, removeItem, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
let NgxsFirestoreState = class NgxsFirestoreState {
    ngxsOnInit(_ctx) { }
    streamConnected({ setState }, { payload }) {
        const conn = {
            connectedAt: new Date(),
            id: payload
        };
        setState(patch({ connections: insertItem(conn) }));
    }
    streamEmitted({ setState }, { payload }) {
        const { id } = payload;
        setState(patch({
            connections: updateItem((x) => x.id === id, patch({ emmitedAt: insertItem(new Date()) }))
        }));
    }
    streamDisconnected({ setState, getState }, { payload }) {
        setState(patch({ connections: removeItem((x) => x.id === payload) }));
    }
};
NgxsFirestoreState.decorators = [
    { type: Injectable }
];
__decorate([
    Action([NgxsFirestoreConnectActions.StreamConnected])
], NgxsFirestoreState.prototype, "streamConnected", null);
__decorate([
    Action([NgxsFirestoreConnectActions.StreamEmitted])
], NgxsFirestoreState.prototype, "streamEmitted", null);
__decorate([
    Action([NgxsFirestoreConnectActions.StreamDisconnected])
], NgxsFirestoreState.prototype, "streamDisconnected", null);
NgxsFirestoreState = __decorate([
    State({
        name: 'ngxs_firestore',
        defaults: {
            connections: []
        }
    })
], NgxsFirestoreState);
export { NgxsFirestoreState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1maXJlc3RvcmUuc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL25neHMtZmlyZXN0b3JlLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztJQW1COUIsa0JBQWtCLFNBQWxCLGtCQUFrQjtJQUM3QixVQUFVLENBQUMsSUFBMkMsSUFBRyxDQUFDO0lBRzFELGVBQWUsQ0FDYixFQUFFLFFBQVEsRUFBeUMsRUFDbkQsRUFBRSxPQUFPLEVBQStDO1FBRXhELE1BQU0sSUFBSSxHQUFHO1lBQ1gsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3ZCLEVBQUUsRUFBRSxPQUFPO1NBQ1csQ0FBQztRQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR0QsYUFBYSxDQUNYLEVBQUUsUUFBUSxFQUF5QyxFQUNuRCxFQUFFLE9BQU8sRUFBNkM7UUFFdEQsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN2QixRQUFRLENBQ04sS0FBSyxDQUEwQjtZQUM3QixXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUYsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBR0Qsa0JBQWtCLENBQ2hCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBeUMsRUFDN0QsRUFBRSxPQUFPLEVBQWtEO1FBRTNELFFBQVEsQ0FDTixLQUFLLENBQTBCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQ3JGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUF0Q0EsVUFBVTs7QUFLVDtJQURDLE1BQU0sQ0FBQyxDQUFDLDJCQUEyQixDQUFDLGVBQWUsQ0FBQyxDQUFDO3lEQVVyRDtBQUdEO0lBREMsTUFBTSxDQUFDLENBQUMsMkJBQTJCLENBQUMsYUFBYSxDQUFDLENBQUM7dURBV25EO0FBR0Q7SUFEQyxNQUFNLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzREQVF4RDtBQXBDVSxrQkFBa0I7SUFQOUIsS0FBSyxDQUEwQjtRQUM5QixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFFBQVEsRUFBRTtZQUNSLFdBQVcsRUFBRSxFQUFFO1NBQ2hCO0tBQ0YsQ0FBQztHQUVXLGtCQUFrQixDQXFDOUI7U0FyQ1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGUsIFN0YXRlQ29udGV4dCwgTmd4c09uSW5pdCwgQWN0aW9uIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xuaW1wb3J0IHsgTmd4c0ZpcmVzdG9yZUNvbm5lY3RBY3Rpb25zIH0gZnJvbSAnLi9uZ3hzLWZpcmVzdG9yZS1jb25uZWN0LmFjdGlvbnMnO1xuaW1wb3J0IHsgcGF0Y2gsIGluc2VydEl0ZW0sIHJlbW92ZUl0ZW0sIHVwZGF0ZUl0ZW0gfSBmcm9tICdAbmd4cy9zdG9yZS9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpcmVzdG9yZUNvbm5lY3Rpb24ge1xuICBpZDogc3RyaW5nO1xuICBjb25uZWN0ZWRBdDogRGF0ZTtcbiAgZW1taXRlZEF0OiBEYXRlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmd4c0ZpcmVzdG9yZVN0YXRlTW9kZWwge1xuICBjb25uZWN0aW9uczogRmlyZXN0b3JlQ29ubmVjdGlvbltdO1xufVxuXG5AU3RhdGU8Tmd4c0ZpcmVzdG9yZVN0YXRlTW9kZWw+KHtcbiAgbmFtZTogJ25neHNfZmlyZXN0b3JlJyxcbiAgZGVmYXVsdHM6IHtcbiAgICBjb25uZWN0aW9uczogW11cbiAgfVxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hzRmlyZXN0b3JlU3RhdGUgaW1wbGVtZW50cyBOZ3hzT25Jbml0IHtcbiAgbmd4c09uSW5pdChfY3R4OiBTdGF0ZUNvbnRleHQ8Tmd4c0ZpcmVzdG9yZVN0YXRlTW9kZWw+KSB7fVxuXG4gIEBBY3Rpb24oW05neHNGaXJlc3RvcmVDb25uZWN0QWN0aW9ucy5TdHJlYW1Db25uZWN0ZWRdKVxuICBzdHJlYW1Db25uZWN0ZWQoXG4gICAgeyBzZXRTdGF0ZSB9OiBTdGF0ZUNvbnRleHQ8Tmd4c0ZpcmVzdG9yZVN0YXRlTW9kZWw+LFxuICAgIHsgcGF5bG9hZCB9OiBOZ3hzRmlyZXN0b3JlQ29ubmVjdEFjdGlvbnMuU3RyZWFtQ29ubmVjdGVkXG4gICkge1xuICAgIGNvbnN0IGNvbm4gPSB7XG4gICAgICBjb25uZWN0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIGlkOiBwYXlsb2FkXG4gICAgfSBhcyBGaXJlc3RvcmVDb25uZWN0aW9uO1xuICAgIHNldFN0YXRlKHBhdGNoKHsgY29ubmVjdGlvbnM6IGluc2VydEl0ZW0oY29ubikgfSkpO1xuICB9XG5cbiAgQEFjdGlvbihbTmd4c0ZpcmVzdG9yZUNvbm5lY3RBY3Rpb25zLlN0cmVhbUVtaXR0ZWRdKVxuICBzdHJlYW1FbWl0dGVkKFxuICAgIHsgc2V0U3RhdGUgfTogU3RhdGVDb250ZXh0PE5neHNGaXJlc3RvcmVTdGF0ZU1vZGVsPixcbiAgICB7IHBheWxvYWQgfTogTmd4c0ZpcmVzdG9yZUNvbm5lY3RBY3Rpb25zLlN0cmVhbUVtaXR0ZWRcbiAgKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcGF5bG9hZDtcbiAgICBzZXRTdGF0ZShcbiAgICAgIHBhdGNoPE5neHNGaXJlc3RvcmVTdGF0ZU1vZGVsPih7XG4gICAgICAgIGNvbm5lY3Rpb25zOiB1cGRhdGVJdGVtKCh4KSA9PiB4LmlkID09PSBpZCwgcGF0Y2goeyBlbW1pdGVkQXQ6IGluc2VydEl0ZW0obmV3IERhdGUoKSkgfSkpXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBAQWN0aW9uKFtOZ3hzRmlyZXN0b3JlQ29ubmVjdEFjdGlvbnMuU3RyZWFtRGlzY29ubmVjdGVkXSlcbiAgc3RyZWFtRGlzY29ubmVjdGVkKFxuICAgIHsgc2V0U3RhdGUsIGdldFN0YXRlIH06IFN0YXRlQ29udGV4dDxOZ3hzRmlyZXN0b3JlU3RhdGVNb2RlbD4sXG4gICAgeyBwYXlsb2FkIH06IE5neHNGaXJlc3RvcmVDb25uZWN0QWN0aW9ucy5TdHJlYW1EaXNjb25uZWN0ZWRcbiAgKSB7XG4gICAgc2V0U3RhdGUoXG4gICAgICBwYXRjaDxOZ3hzRmlyZXN0b3JlU3RhdGVNb2RlbD4oeyBjb25uZWN0aW9uczogcmVtb3ZlSXRlbSgoeCkgPT4geC5pZCA9PT0gcGF5bG9hZCkgfSlcbiAgICApO1xuICB9XG59XG4iXX0=