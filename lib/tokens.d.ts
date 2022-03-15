import { InjectionToken } from '@angular/core';
export interface NgxsFirestoreModuleOptions {
    timeoutWriteOperations: number | false;
}
export declare const NGXS_FIRESTORE_MODULE_OPTIONS: InjectionToken<NgxsFirestoreModuleOptions>;
