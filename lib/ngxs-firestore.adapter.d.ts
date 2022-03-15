import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgxsFirestoreModuleOptions } from './tokens';
import { Store } from '@ngxs/store';
import 'firebase/firestore';
import * as ɵngcc0 from '@angular/core';
export declare class NgxsFirestoreAdapter {
    firestore: AngularFirestore;
    store: Store;
    options: NgxsFirestoreModuleOptions;
    constructor(firestore: AngularFirestore, store: Store, options: NgxsFirestoreModuleOptions);
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestoreAdapter, [null, null, { optional: true; }]>;
}

//# sourceMappingURL=ngxs-firestore.adapter.d.ts.map