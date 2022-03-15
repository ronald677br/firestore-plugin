var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { NgxsFirestore } from '@ngxs-labs/firestore-plugin';
import 'firebase/firestore';
let RacesFirestore = class RacesFirestore extends NgxsFirestore {
    constructor() {
        super(...arguments);
        this.path = 'races';
        this.idField = 'raceId';
        this.converter = {
            toFirestore: (value) => {
                const db = Object.assign({}, value);
                delete db.testProp;
                return db;
            },
            fromFirestore: (snapshot, options) => {
                const data = snapshot.data(options);
                return Object.assign(Object.assign({}, data), { testProp: data.id + data.title });
            }
        };
    }
    updateIfExists(id, data) {
        return this.adapter.firestore
            .doc(this.adapter.firestore.doc(`${this.path}/${id}`).ref.withConverter(this.converter))
            .update(data);
    }
};
RacesFirestore = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RacesFirestore);
export { RacesFirestore };
//# sourceMappingURL=races.firestore.js.map