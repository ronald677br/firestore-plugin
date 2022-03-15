import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Inject, Injectable, Optional } from '@angular/core';
import { NGXS_FIRESTORE_MODULE_OPTIONS } from './tokens';
import { Store } from '@ngxs/store';
import 'firebase/firestore';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "@ngxs/store";
import * as i3 from "./tokens";
export class NgxsFirestoreAdapter {
    constructor(firestore, store, options) {
        this.firestore = firestore;
        this.store = store;
        this.options = options;
    }
}
NgxsFirestoreAdapter.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxsFirestoreAdapter_Factory() { return new NgxsFirestoreAdapter(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.Store), i0.ɵɵinject(i3.NGXS_FIRESTORE_MODULE_OPTIONS, 8)); }, token: NgxsFirestoreAdapter, providedIn: "root" });
NgxsFirestoreAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
NgxsFirestoreAdapter.ctorParameters = () => [
    { type: AngularFirestore, decorators: [{ type: Inject, args: [AngularFirestore,] }] },
    { type: Store, decorators: [{ type: Inject, args: [Store,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGXS_FIRESTORE_MODULE_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1maXJlc3RvcmUuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbmd4cy1maXJlc3RvcmUuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUE4Qiw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sb0JBQW9CLENBQUM7Ozs7O0FBRzVCLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDbUMsU0FBMkIsRUFDdEMsS0FBWSxFQUN3QixPQUFtQztRQUY1RCxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN0QyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ3dCLFlBQU8sR0FBUCxPQUFPLENBQTRCO0lBQzVGLENBQUM7Ozs7WUFOTCxVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFOekIsZ0JBQWdCLHVCQVNwQixNQUFNLFNBQUMsZ0JBQWdCO1lBTm5CLEtBQUssdUJBT1QsTUFBTSxTQUFDLEtBQUs7NENBQ1osUUFBUSxZQUFJLE1BQU0sU0FBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4c0ZpcmVzdG9yZU1vZHVsZU9wdGlvbnMsIE5HWFNfRklSRVNUT1JFX01PRFVMRV9PUFRJT05TIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmd4c0ZpcmVzdG9yZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEFuZ3VsYXJGaXJlc3RvcmUpIHB1YmxpYyBmaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsXG4gICAgQEluamVjdChTdG9yZSkgcHVibGljIHN0b3JlOiBTdG9yZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5HWFNfRklSRVNUT1JFX01PRFVMRV9PUFRJT05TKSBwdWJsaWMgb3B0aW9uczogTmd4c0ZpcmVzdG9yZU1vZHVsZU9wdGlvbnNcbiAgKSB7fVxufVxuIl19