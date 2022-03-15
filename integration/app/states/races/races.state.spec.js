import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RacesState } from './races.state';
import { RacesActions } from './races.actions';
import { RacesFirestore } from 'integration/app/services/races.firestore';
import { NgxsFirestoreModule, NgxsFirestorePageIdService } from '@ngxs-labs/firestore-plugin';
import { BehaviorSubject } from 'rxjs';
describe('Races State', () => {
    let store;
    let mockRacesFS;
    let mockCollection$;
    beforeEach(async(() => {
        mockRacesFS = jest.fn(() => ({
            collection$: mockCollection$
        }));
        mockCollection$ = jest.fn();
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([RacesState]), NgxsFirestoreModule.forRoot()],
            providers: [
                { provide: RacesFirestore, useValue: mockRacesFS() },
                { provide: NgxsFirestorePageIdService, useValue: { createId: jest.fn() } }
            ]
        }).compileComponents();
        store = TestBed.get(Store);
    }));
    it('should getall races', () => {
        mockCollection$.mockReturnValue(new BehaviorSubject([{ raceId: 'a' }]));
        store.dispatch(new RacesActions.GetAll());
        expect(store.selectSnapshot(RacesState.races)).toEqual([{ raceId: 'a' }]);
    });
});
//# sourceMappingURL=races.state.spec.js.map