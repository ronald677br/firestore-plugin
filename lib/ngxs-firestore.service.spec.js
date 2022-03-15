var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed } from '@angular/core/testing';
import { NgxsFirestore } from './ngxs-firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
describe('NgxsFirestore', () => {
    const createIdMock = jest.fn();
    const angularFirestoreMock = jest.fn().mockImplementation(() => ({
        createId: createIdMock,
        doc: jest.fn(() => ({
            set: jest.fn(() => of({})),
            ref: {
                withConverter: jest.fn()
            }
        }))
    }));
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFirestore, useValue: angularFirestoreMock() },
                {
                    provide: AngularFirestore,
                    useValue: angularFirestoreMock()
                },
                { provide: Store, useValue: jest.fn() }
            ]
        });
    });
    it('cant be directly instantiated', () => {
        expect(() => {
            TestBed.get(NgxsFirestore);
        }).toThrowError('No provider for NgxsFirestore!');
    });
    it('can be implemented and instantiated', () => {
        let TestFirestore = class TestFirestore extends NgxsFirestore {
            constructor() {
                super(...arguments);
                this.path = 'test';
            }
        };
        TestFirestore = __decorate([
            Injectable({ providedIn: 'root' })
        ], TestFirestore);
        expect(TestBed.get(TestFirestore)).toBeTruthy();
    });
    describe('', () => {
        let ImplFirestore = class ImplFirestore extends NgxsFirestore {
            constructor() {
                super(...arguments);
                this.path = 'impl';
            }
        };
        ImplFirestore = __decorate([
            Injectable({ providedIn: 'root' })
        ], ImplFirestore);
        describe('create$', () => {
            it('should create id if not provided', () => {
                createIdMock.mockReturnValue('newId');
                const service = TestBed.get(ImplFirestore);
                service.create$({}).subscribe((id) => {
                    expect(id).toEqual('newId');
                });
            });
            it('should return id when provided', () => {
                const service = TestBed.get(ImplFirestore);
                service.create$({ id: 'someid' }).subscribe((id) => {
                    expect(id).toEqual('someid');
                });
            });
        });
        describe('upsert$', () => {
            it('should create id if not provided', () => {
                createIdMock.mockReturnValue('newId');
                const service = TestBed.get(ImplFirestore);
                service.upsert$({}).subscribe((id) => {
                    expect(id).toEqual('newId');
                });
            });
            it('should return id when provided', () => {
                const service = TestBed.get(ImplFirestore);
                service.upsert$({ id: 'someid' }).subscribe((id) => {
                    expect(id).toEqual('someid');
                });
            });
        });
    });
});
//# sourceMappingURL=ngxs-firestore.service.spec.js.map