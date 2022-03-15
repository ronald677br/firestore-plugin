var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Action, NgxsModule, Selector, State, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { BehaviorSubject } from 'rxjs';
import { StreamEmitted } from './action-decorator-helpers';
import { GetLastPage, GetNextPage } from './actions';
import { NgxsFirestoreModule } from './ngxs-firestore.module';
describe('NgxsFirestorePage', () => {
    let store;
    const mockFirestoreStream = jest.fn();
    const mockCreateId = jest.fn();
    const mockAngularFirestore = jest.fn(() => ({
        createId: mockCreateId
    }));
    class TestActionGetPages {
    }
    TestActionGetPages.type = 'TEST ACTION GET PAGES';
    class AnotherTestActionGetPages {
    }
    AnotherTestActionGetPages.type = 'ANOTHER TEST ACTION GET PAGES';
    let TestState = class TestState {
        constructor(ngxsFirestoreConnect, ngxsFirestorePage) {
            this.ngxsFirestoreConnect = ngxsFirestoreConnect;
            this.ngxsFirestorePage = ngxsFirestorePage;
        }
        static pageId(state) {
            return state.pageId;
        }
        static pageSize(state) {
            return state.pageSize;
        }
        static results(state) {
            return state.results;
        }
        ngxsOnInit() {
            this.ngxsFirestoreConnect.connect(TestActionGetPages, {
                to: () => this.ngxsFirestorePage.create((pageFn) => mockFirestoreStream((ref) => pageFn(ref)), 5, [
                    { fieldPath: 'title' }
                ])
            });
        }
        getPageEmitted(ctx, { action, payload }) {
            ctx.setState(patch({ results: payload.results || [], pageId: payload.pageId, pageSize: payload.pageSize }));
        }
    };
    __decorate([
        Action(StreamEmitted(TestActionGetPages))
    ], TestState.prototype, "getPageEmitted", null);
    __decorate([
        Selector()
    ], TestState, "pageId", null);
    __decorate([
        Selector()
    ], TestState, "pageSize", null);
    __decorate([
        Selector()
    ], TestState, "results", null);
    TestState = __decorate([
        State({
            name: 'test'
        }),
        Injectable()
    ], TestState);
    let AnotherTestState = class AnotherTestState {
        constructor(ngxsFirestoreConnect, ngxsFirestorePage) {
            this.ngxsFirestoreConnect = ngxsFirestoreConnect;
            this.ngxsFirestorePage = ngxsFirestorePage;
        }
        static pageId(state) {
            return state.pageId;
        }
        static pageSize(state) {
            return state.pageSize;
        }
        static results(state) {
            return state.results;
        }
        ngxsOnInit() {
            this.ngxsFirestoreConnect.connect(AnotherTestActionGetPages, {
                to: () => this.ngxsFirestorePage.create((pageFn) => mockFirestoreStream((ref) => pageFn(ref)), 5, [
                    { fieldPath: 'title' }
                ])
            });
        }
        getPageEmitted(ctx, { action, payload }) {
            ctx.setState(patch({ results: payload.results || [], pageId: payload.pageId, pageSize: payload.pageSize }));
        }
    };
    __decorate([
        Action(StreamEmitted(AnotherTestActionGetPages))
    ], AnotherTestState.prototype, "getPageEmitted", null);
    __decorate([
        Selector()
    ], AnotherTestState, "pageId", null);
    __decorate([
        Selector()
    ], AnotherTestState, "pageSize", null);
    __decorate([
        Selector()
    ], AnotherTestState, "results", null);
    AnotherTestState = __decorate([
        State({
            name: 'another_test'
        }),
        Injectable()
    ], AnotherTestState);
    const page1 = ['1', '2', '3'];
    // const page2 = ['1', '2', '3', '4', '5', '6'];
    // const page3 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TestState, AnotherTestState]), NgxsFirestoreModule.forRoot()],
            providers: [
                {
                    provide: AngularFirestore,
                    useValue: mockAngularFirestore()
                }
            ]
        });
        store = TestBed.inject(Store);
        // actions = TestBed.inject(Actions);
        mockFirestoreStream.mockClear();
    });
    test('should increase pageSize on each getnextpage', fakeAsync(() => {
        mockCreateId.mockReturnValue('pageId');
        const stream = new BehaviorSubject(page1);
        mockFirestoreStream.mockReturnValue(stream.asObservable());
        store.dispatch(new TestActionGetPages()).subscribe((_) => { });
        tick(1);
        expect(store.selectSnapshot(TestState.results)).toEqual(page1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(1);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
        store.dispatch(new GetNextPage('pageId')).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(2);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(10);
        store.dispatch(new GetNextPage('pageId')).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(3);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(15);
    }));
    test('should not allow lastpage until at least two pages have been fetched', fakeAsync(() => {
        mockCreateId.mockReturnValue('pageId');
        const stream = new BehaviorSubject(page1);
        mockFirestoreStream.mockReturnValue(stream.asObservable());
        store.dispatch(new TestActionGetPages()).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(1);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
        store.dispatch(new GetLastPage('pageId')).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(1);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
        store.dispatch(new GetNextPage('pageId')).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(2);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(10);
        store.dispatch(new GetLastPage('pageId')).subscribe((_) => { });
        tick(1);
        expect(mockFirestoreStream).toHaveBeenCalledTimes(3);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('pageId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
    }));
    test('should support multiple page connections', fakeAsync(() => {
        mockCreateId.mockReturnValueOnce('firstId').mockReturnValueOnce('secondId');
        const stream = new BehaviorSubject(page1);
        mockFirestoreStream.mockReturnValue(stream.asObservable());
        store.dispatch(new TestActionGetPages()).subscribe((_) => { });
        tick(1);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('firstId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
        expect(store.selectSnapshot(AnotherTestState.pageId)).toEqual(undefined);
        expect(store.selectSnapshot(AnotherTestState.pageSize)).toEqual(undefined);
        store.dispatch(new AnotherTestActionGetPages()).subscribe((_) => { });
        tick(1);
        expect(store.selectSnapshot(TestState.pageId)).toEqual('firstId');
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(5);
        expect(store.selectSnapshot(AnotherTestState.pageId)).toEqual('secondId');
        expect(store.selectSnapshot(AnotherTestState.pageSize)).toEqual(5);
        store.dispatch(new GetNextPage('firstId')).subscribe((_) => { });
        tick(1);
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(10);
        expect(store.selectSnapshot(AnotherTestState.pageSize)).toEqual(5);
        store.dispatch(new GetNextPage('secondId')).subscribe((_) => { });
        tick(1);
        expect(store.selectSnapshot(TestState.pageSize)).toEqual(10);
        expect(store.selectSnapshot(AnotherTestState.pageSize)).toEqual(10);
    }));
});
//# sourceMappingURL=ngxs-firestore-page.service.spec.js.map