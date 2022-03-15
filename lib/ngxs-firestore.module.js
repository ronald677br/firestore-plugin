var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NgxsFirestoreModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsFirestoreState } from './ngxs-firestore.state';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NGXS_FIRESTORE_MODULE_OPTIONS } from './tokens';
import { NgxsFirestorePageIdService } from './ngxs-firestore-page.service';
let NgxsFirestoreModule = NgxsFirestoreModule_1 = class NgxsFirestoreModule {
    static forRoot(options) {
        return {
            ngModule: NgxsFirestoreModule_1,
            providers: [
                {
                    provide: NGXS_FIRESTORE_MODULE_OPTIONS,
                    useValue: options || { timeoutWriteOperations: false }
                },
                {
                    provide: NgxsFirestorePageIdService,
                    useClass: NgxsFirestorePageIdService
                }
            ]
        };
    }
};
NgxsFirestoreModule = NgxsFirestoreModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, NgxsModule.forFeature([NgxsFirestoreState]), AngularFirestoreModule]
    })
], NgxsFirestoreModule);
export { NgxsFirestoreModule };
//# sourceMappingURL=ngxs-firestore.module.js.map