var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { getActionTypeFromInstance, ofActionDispatched } from '@ngxs/store';
import { GetNextPage, GetLastPage } from './actions';
let NgxsFirestorePageIdService = class NgxsFirestorePageIdService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    createId() {
        return this.firestore.createId();
    }
};
NgxsFirestorePageIdService = __decorate([
    Injectable()
], NgxsFirestorePageIdService);
export { NgxsFirestorePageIdService };
let NgxsFirestorePageService = class NgxsFirestorePageService {
    constructor(actions$, pageId) {
        this.actions$ = actions$;
        this.pageId = pageId;
    }
    create(queryFn, size, orderBy) {
        return defer(() => {
            const pages = [];
            return this.actions$.pipe(ofActionDispatched(GetNextPage, GetLastPage), startWith('INIT'), map((action) => {
                const actionType = getActionTypeFromInstance(action);
                const payload = action === 'INIT' ? this.pageId.createId() : action.payload;
                return { payload, actionType: actionType || 'GetNextPage' };
            }), filter(({ payload, actionType }) => {
                return pages.length === 0 || !!pages.find((page) => page.id === payload);
            }), map(({ payload, actionType }) => {
                const thePage = pages.find((page) => page.id === payload);
                let limit = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) || 0;
                if (actionType === 'GetNextPage') {
                    limit += size;
                }
                else if (limit - size > 0) {
                    limit -= size;
                }
                const skip = (thePage === null || thePage === void 0 ? void 0 : thePage.limit) === limit;
                if (thePage) {
                    thePage.limit = limit;
                }
                else {
                    pages.push({ id: payload, limit });
                }
                return { pageId: payload, limit, skip };
            }), filter(({ skip }) => {
                return !skip;
            }), switchMap(({ pageId, limit }) => {
                return queryFn((ref) => {
                    return orderBy
                        .reduce((prev, curr) => prev.orderBy(curr.fieldPath, curr.directionStr || 'asc'), ref)
                        .limit(limit);
                }).pipe(map((results) => {
                    return { results, pageId, pageSize: limit };
                }));
            }));
        });
    }
};
NgxsFirestorePageService = __decorate([
    Injectable({ providedIn: 'root' })
], NgxsFirestorePageService);
export { NgxsFirestorePageService };
//# sourceMappingURL=ngxs-firestore-page.service.js.map