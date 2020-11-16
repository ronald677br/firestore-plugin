import { AngularFirestore, QueryFn, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, from, throwError, of } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import { map, take, tap, finalize, mapTo, timeoutWith } from 'rxjs/operators';
import { NgxsFirestoreModuleOptions, NGXS_FIRESTORE_MODULE_OPTIONS } from './utils';
import { Store } from '@ngxs/store';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable()
export abstract class NgxsFirestore<T> {
  constructor(
    @Inject(AngularFirestore) protected firestore: AngularFirestore,
    @Inject(Store) protected store: Store,
    @Optional() @Inject(NGXS_FIRESTORE_MODULE_OPTIONS) protected options: NgxsFirestoreModuleOptions
  ) {}

  protected abstract path: string;
  protected idField: string = 'id';
  protected converter: firebase.firestore.FirestoreDataConverter<T> = {
    toFirestore: (value) => {
      return value;
    },
    fromFirestore: (snapshot, options) => {
      return { ...(<T>snapshot.data(options)) };
    }
  };

  private activePagedQuery: { lastDoc?: QueryDocumentSnapshot<T>; page?: string; queryFn?: string } = null;

  public page$(queryFn?: QueryFn): Observable<T[]> {
    if (!!this.activePagedQuery && this.activePagedQuery.queryFn !== queryFn + '') {
      return throwError('NgxsFirestore page$ error. Yon can have only one paging query per service instance.');
    }

    if (!this.activePagedQuery) {
      this.activePagedQuery = {
        queryFn: queryFn + ''
      };
    }

    return this.firestore
      .collection<T>(this.path, (ref) =>
        queryFn(ref).startAfter((this.activePagedQuery && this.activePagedQuery.lastDoc) || null)
      )
      .snapshotChanges()
      .pipe(
        tap((items) => {
          const start = items.length;
          this.activePagedQuery = {
            ...this.activePagedQuery,
            lastDoc: items.length > 0 && items[items.length - 1].payload.doc,
            page: `${start} - ${start + 10}`
          };
        }),
        map((items) => items.map((item) => item.payload.doc.data())),
        finalize(() => (this.activePagedQuery = null))
      );
  }
  public pageOnce$(queryFn?: QueryFn): Observable<T[]> {
    return this.page$(queryFn).pipe(take(1));
  }

  public createId() {
    return this.firestore.createId();
  }

  public doc$(id: string): Observable<T> {
    return this.firestore
      .doc<T>(this.docRef(id))
      .snapshotChanges()
      .pipe(
        map((docSnapshot) => {
          if (docSnapshot.payload.exists) {
            return { [this.idField]: docSnapshot.payload.id, ...docSnapshot.payload.data() };
          } else {
            return undefined;
          }
        })
      );
  }

  public docOnce$(id: string): Observable<T> {
    return this.doc$(id).pipe(take(1));
  }

  public collection$(queryFn: QueryFn = (ref) => ref): Observable<T[]> {
    return this.firestore
      .collection<T>(this.path, (ref) => {
        return queryFn(ref.withConverter(this.converter));
      })
      .snapshotChanges()
      .pipe(
        map((docSnapshots) =>
          docSnapshots.map((docSnapshot) => ({
            [this.idField]: docSnapshot.payload.doc.id,
            ...docSnapshot.payload.doc.data()
          }))
        )
      );
  }

  public collectionOnce$(queryFn?: QueryFn): Observable<T[]> {
    return this.collection$(queryFn).pipe(take(1));
  }

  public update$(id: string, value: Partial<T>) {
    return this.docSet(id, value);
  }

  public delete$(id: string) {
    return from(this.doc(id).delete()).pipe();
  }

  public create$(value: Partial<T>): Observable<string> {
    let id;
    let newValue;

    if (Object.keys(value).includes('id') && !!value['id']) {
      id = value['id'];
      newValue = Object.assign({}, value);
    } else {
      id = this.createId();
      newValue = Object.assign({}, value, { id });
    }

    return this.docSet(id, newValue);
  }

  public upsert$(value: Partial<T>): Observable<string> {
    let id;
    let newValue;

    if (Object.keys(value).includes('id') && !!value['id']) {
      id = value['id'];
      newValue = Object.assign({}, value);
    } else {
      id = this.createId();
      newValue = Object.assign({}, value, { id });
    }

    return this.docSet(id, newValue);
  }

  private doc(id: string) {
    return this.firestore.doc(this.docRef(id));
  }

  private docSet(id: string, value: any) {
    if (this.isOffline()) {
      this.doc(id).set(value, { merge: true });
      return of(id);
    }

    if (this.options && this.options.timeoutWriteOperations) {
      return from(this.doc(id).set(value, { merge: true })).pipe(
        timeoutWith(this.options.timeoutWriteOperations, of(id)),
        mapTo(id)
      );
    } else {
      return from(this.doc(id).set(value, { merge: true })).pipe(mapTo(id));
    }
  }

  private docRef(id: string) {
    return this.firestore.doc(`${this.path}/${id}`).ref.withConverter(this.converter);
  }

  private isOffline() {
    return navigator.onLine !== undefined && !navigator.onLine;
  }
}
