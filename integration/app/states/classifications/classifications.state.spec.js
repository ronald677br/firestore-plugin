import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ClassificationsState } from './classifications.state';
import { NgxsFirestoreModule } from '@ngxs-labs/firestore-plugin';
import { BehaviorSubject } from 'rxjs';
import { ClassificationsActions } from './classifications.actions';
import { ClassificationsFirestore } from 'integration/app/services/classifications.firestore';
describe('Classifications State', () => {
    let store;
    let mockClassificationsFS;
    let mockCollection$;
    beforeEach(async(() => {
        mockClassificationsFS = jest.fn(() => ({
            collection$: mockCollection$,
            setRaceId: jest.fn()
        }));
        mockCollection$ = jest.fn();
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([ClassificationsState]), NgxsFirestoreModule.forRoot()],
            providers: [{ provide: ClassificationsFirestore, useValue: mockClassificationsFS() }]
        }).compileComponents();
        store = TestBed.get(Store);
    }));
    it('should getall classifications', () => {
        mockCollection$.mockReturnValue(new BehaviorSubject([{ id: 'a' }]));
        store.dispatch(new ClassificationsActions.GetAll('id'));
        expect(store.selectSnapshot(ClassificationsState.classifications)).toEqual([{ id: 'a' }]);
    });
});
//# sourceMappingURL=classifications.state.spec.js.map