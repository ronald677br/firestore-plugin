import { async, TestBed } from '@angular/core/testing';
import { OtherComponent } from './other.component';
describe('OtherComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OtherComponent]
        }).compileComponents();
    }));
    beforeEach(() => { });
    it('should create', () => {
        fixture = TestBed.createComponent(OtherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=other.component.spec.js.map