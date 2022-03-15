var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { RacesActions } from './../../states/races/races.actions';
import { RacesState } from './../../states/races/races.state';
import { ClassificationsState } from './../../states/classifications/classifications.state';
import { ClassificationsActions } from './../../states/classifications/classifications.actions';
import { Chance } from 'chance';
import { map } from 'rxjs/operators';
import { actionsExecuting } from '@ngxs-labs/actions-executing';
import { Disconnect } from '@ngxs-labs/firestore-plugin';
let ListComponent = class ListComponent {
    constructor(store) {
        this.store = store;
        this.races$ = this.store.select(RacesState.races);
        this.classifications$ = this.store.select(ClassificationsState.classifications);
        this.total$ = this.races$.pipe(map((races) => races.length));
        this.gettingAll$ = this.store.select(actionsExecuting([RacesActions.GetAll]));
        this.gettingSingle$ = this.store.select(actionsExecuting([RacesActions.Get]));
        this.creating$ = this.store.select(actionsExecuting([RacesActions.Create]));
        this.loading$ = this.store.select(actionsExecuting([RacesActions.GetAll, RacesActions.Get]));
        this.loaded$ = this.loading$.pipe(map((loading) => !loading));
        this.disconnecting$ = this.store.select(actionsExecuting([Disconnect]));
        this.throwingError$ = this.store.select(actionsExecuting([RacesActions.Error]));
        this.gettingSubCollection$ = this.store.select(actionsExecuting([ClassificationsActions.GetAll]));
    }
    ngOnInit() {
        // this.store.dispatch(new RacesActions.GetAll());
        // this.store.dispatch(new RacesActions.Get('8iI)0md[dTAFC[wo!&[N'));
        // this.store.dispatch(new RacesActions.Get('AAAAAA'));
    }
    disconnect() {
        this.store.dispatch(new Disconnect(new RacesActions.Get(']cfct5iL8(H)@Sl#xTcS')));
    }
    reconnect() {
        // this.store.dispatch(new RacesActions.GetAll());
        // this.store.dispatch(new RacesActions.Get('8iI)0md[dTAFC[wo!&[N'));
        this.store.dispatch(new RacesActions.Get(']cfct5iL8(H)@Sl#xTcS'));
    }
    getAll() {
        this.store.dispatch(new RacesActions.GetAll());
    }
    getSubCollection() {
        this.store.dispatch(new ClassificationsActions.GetAll('0NN6x6GKDGumGU5dtnk4'));
    }
    get() {
        // const ids = ['4(CPo6Fy(7Mo^YklK[Q8', 'FouQf@q4FHJcc&%cnmkT', 'LBWH5KvYp43ia)!IYpwv', ']cfct5iL8(H)@Sl#xTcS'];
        // for (let index = 0; index < ids.length; index++) {
        //   setTimeout(() => this.store.dispatch(new RacesActions.Get(ids[index])), 1000 * index);
        // }
        this.store.dispatch(new RacesActions.Get('0V!^fMrWetbs68]ob6%M'));
    }
    create() {
        const chance = new Chance();
        const race = {};
        // race.id = chance.string({ length: 20 });
        race.raceId = chance.string({ length: 20 });
        race.name = chance.word();
        race.title = chance.word();
        race.description = chance.sentence();
        this.store.dispatch(new RacesActions.Create(race));
        // this.store.dispatch(new RacesActions.Create({
        //   id: 'test-id',
        //   name: 'Test',
        //   title: 'Test Title',
        //   description: 'Test description',
        // }));
    }
    update(race) {
        const chance = new Chance();
        this.store.dispatch(new RacesActions.Update(Object.assign(Object.assign({}, race), { name: chance.string(), description: chance.word() })));
    }
    updateIfExists(race) {
        const chance = new Chance();
        this.store.dispatch(new RacesActions.UpdateIfExists(Object.assign(Object.assign({}, race), { name: chance.string(), description: chance.word() })));
    }
    delete(id) {
        this.store.dispatch(new RacesActions.Delete(id));
    }
    ngOnDestroy() {
        this.store.dispatch(new Disconnect(RacesActions.GetAll));
    }
    throwError() {
        this.store.dispatch(new RacesActions.Error());
    }
};
ListComponent = __decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss']
    })
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map