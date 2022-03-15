var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Inject, Injectable, Optional } from '@angular/core';
import { NGXS_FIRESTORE_MODULE_OPTIONS } from './tokens';
import { Store } from '@ngxs/store';
import 'firebase/firestore';
let NgxsFirestoreAdapter = class NgxsFirestoreAdapter {
    constructor(firestore, store, options) {
        this.firestore = firestore;
        this.store = store;
        this.options = options;
    }
};
NgxsFirestoreAdapter = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(AngularFirestore)),
    __param(1, Inject(Store)),
    __param(2, Optional()),
    __param(2, Inject(NGXS_FIRESTORE_MODULE_OPTIONS))
], NgxsFirestoreAdapter);
export { NgxsFirestoreAdapter };
//# sourceMappingURL=ngxs-firestore.adapter.js.map