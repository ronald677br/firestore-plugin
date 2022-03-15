import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NgxsFirestoreAdapter } from './ngxs-firestore.adapter';
import firebase from 'firebase/app';
import 'firebase/firestore';
/**
 * Changes the behavior of a set() call to only replace the values specified
 * in its data argument. Fields omitted from the set() call remain
 * untouched.
 */
import * as ɵngcc0 from '@angular/core';
import { FirestoreDataConverter } from 'firebase/firestore';
interface SetOptions {
    merge: boolean;
}
export declare abstract class NgxsFirestore<T> {
    protected adapter: NgxsFirestoreAdapter;
    constructor(adapter: NgxsFirestoreAdapter);
    protected abstract path: string;
    protected idField: string;
    protected converter: FirestoreDataConverter<T>;
    createId(): string;
    doc$(id: string): Observable<T>;
    docOnce$(id: string): Observable<T>;
    collection$(queryFn?: QueryFn): Observable<T[]>;
    collectionOnce$(queryFn?: QueryFn): Observable<T[]>;
    update$(id: string, value: Partial<T>, setOptions?: SetOptions): Observable<string>;
    delete$(id: string): Observable<void>;
    create$(value: Partial<T>): Observable<string>;
    upsert$(value: Partial<T>, setOptions?: SetOptions): Observable<string>;
    private getDataWithId;
    private doc;
    private docSet;
    private docRef;
    private isOffline;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<NgxsFirestore<any>, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<NgxsFirestore<any>>;
}
export {};

//# sourceMappingURL=ngxs-firestore.service.d.ts.map