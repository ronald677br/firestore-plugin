import { Observable } from 'rxjs';
import { Actions } from '@ngxs/store';
import { AngularFirestore, FieldPath, QueryFn } from '@angular/fire/compat/firestore';
import * as ɵngcc0 from '@angular/core';
export interface FirestorePage {
    limit: number;
    id: string;
}
export declare class NgxsFirestorePageIdService {
    private firestore;
    constructor(firestore: AngularFirestore);
    createId(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestorePageIdService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<NgxsFirestorePageIdService>;
}
export declare class NgxsFirestorePageService {
    private actions$;
    private pageId;
    constructor(actions$: Actions, pageId: NgxsFirestorePageIdService);
    create<T>(queryFn: (pageFn: QueryFn) => Observable<T>, size: number, orderBy: {
        fieldPath: string | FieldPath;
        directionStr?: 'desc' | 'asc';
    }[]): Observable<{
        results: T;
        pageId: string;
    }>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestorePageService, never>;
}

//# sourceMappingURL=ngxs-firestore-page.service.d.ts.map