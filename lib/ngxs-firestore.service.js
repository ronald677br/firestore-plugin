var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { from, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { map, take, mapTo, timeoutWith } from 'rxjs/operators';
import { NgxsFirestoreAdapter } from './ngxs-firestore.adapter';
import 'firebase/firestore';
let NgxsFirestore = class NgxsFirestore {
    constructor(adapter) {
        this.adapter = adapter;
        this.idField = 'id';
        this.converter = {
            toFirestore: (value) => {
                return value;
            },
            fromFirestore: (snapshot, options) => {
                return Object.assign({}, snapshot.data(options));
            }
        };
    }
    createId() {
        return this.adapter.firestore.createId();
    }
    doc$(id) {
        return this.adapter.firestore
            .doc(this.docRef(id))
            .snapshotChanges()
            .pipe(map((docSnapshot) => {
            if (docSnapshot.payload.exists) {
                return this.getDataWithId(docSnapshot.payload);
            }
            else {
                return undefined;
            }
        }));
    }
    docOnce$(id) {
        return this.doc$(id).pipe(take(1));
    }
    collection$(queryFn = (ref) => ref) {
        return this.adapter.firestore
            .collection(this.path, (ref) => {
            return queryFn(ref.withConverter(this.converter));
        })
            .snapshotChanges()
            .pipe(map((docSnapshots) => docSnapshots.map((docSnapshot) => {
            return this.getDataWithId(docSnapshot.payload.doc);
        })));
    }
    collectionOnce$(queryFn) {
        return this.collection$(queryFn).pipe(take(1));
    }
    update$(id, value, setOptions) {
        return this.docSet(id, value, setOptions);
    }
    delete$(id) {
        return from(this.doc(id).delete()).pipe();
    }
    create$(value) {
        return this.upsert$(value);
    }
    upsert$(value, setOptions) {
        let id;
        let newValue;
        if (Object.keys(value).includes(this.idField) && !!value[this.idField]) {
            id = value[this.idField];
            newValue = Object.assign({}, value);
        }
        else {
            id = this.createId();
            newValue = Object.assign({}, value, { [this.idField]: id });
        }
        return this.docSet(id, newValue, setOptions);
    }
    getDataWithId(doc) {
        const data = doc.data();
        const id = (data && data[this.idField]) || doc.id;
        return Object.assign(Object.assign({}, data), { [this.idField]: id });
    }
    doc(id) {
        return this.adapter.firestore.doc(this.docRef(id));
    }
    docSet(id, value, setOptions) {
        setOptions = setOptions || { merge: true };
        if (this.isOffline()) {
            this.doc(id).set(value, setOptions);
            return of(id);
        }
        if (this.adapter.options && this.adapter.options.timeoutWriteOperations) {
            return from(this.doc(id).set(value, setOptions)).pipe(timeoutWith(this.adapter.options.timeoutWriteOperations, of(id)), mapTo(id));
        }
        else {
            return from(this.doc(id).set(value, setOptions)).pipe(mapTo(id));
        }
    }
    docRef(id) {
        return this.adapter.firestore.doc(`${this.path}/${id}`).ref.withConverter(this.converter);
    }
    isOffline() {
        return navigator.onLine !== undefined && !navigator.onLine;
    }
};
NgxsFirestore = __decorate([
    Injectable(),
    __param(0, Inject(NgxsFirestoreAdapter))
], NgxsFirestore);
export { NgxsFirestore };
//# sourceMappingURL=ngxs-firestore.service.js.map