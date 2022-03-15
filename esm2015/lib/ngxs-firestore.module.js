import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsFirestoreState } from './ngxs-firestore.state';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NGXS_FIRESTORE_MODULE_OPTIONS } from './tokens';
import { NgxsFirestorePageIdService } from './ngxs-firestore-page.service';
export class NgxsFirestoreModule {
    static forRoot(options) {
        return {
            ngModule: NgxsFirestoreModule,
            providers: [
                {
                    provide: NGXS_FIRESTORE_MODULE_OPTIONS,
                    useValue: options || { timeoutWriteOperations: false }
                },
                {
                    provide: NgxsFirestorePageIdService,
                    useClass: NgxsFirestorePageIdService
                }
            ]
        };
    }
}
NgxsFirestoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NgxsModule.forFeature([NgxsFirestoreState]), AngularFirestoreModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1maXJlc3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9uZ3hzLWZpcmVzdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUE4Qiw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUszRSxNQUFNLE9BQU8sbUJBQW1CO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBb0M7UUFDeEQsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSw2QkFBNkI7b0JBQ3RDLFFBQVEsRUFBRSxPQUFPLElBQUssRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQWlDO2lCQUN2RjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsMEJBQTBCO29CQUNuQyxRQUFRLEVBQUUsMEJBQTBCO2lCQUNyQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWxCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsc0JBQXNCLENBQUM7YUFDN0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neHNNb2R1bGUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5pbXBvcnQgeyBOZ3hzRmlyZXN0b3JlU3RhdGUgfSBmcm9tICcuL25neHMtZmlyZXN0b3JlLnN0YXRlJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBOZ3hzRmlyZXN0b3JlTW9kdWxlT3B0aW9ucywgTkdYU19GSVJFU1RPUkVfTU9EVUxFX09QVElPTlMgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBOZ3hzRmlyZXN0b3JlUGFnZUlkU2VydmljZSB9IGZyb20gJy4vbmd4cy1maXJlc3RvcmUtcGFnZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmd4c01vZHVsZS5mb3JGZWF0dXJlKFtOZ3hzRmlyZXN0b3JlU3RhdGVdKSwgQW5ndWxhckZpcmVzdG9yZU1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4c0ZpcmVzdG9yZU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogTmd4c0ZpcmVzdG9yZU1vZHVsZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neHNGaXJlc3RvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neHNGaXJlc3RvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5HWFNfRklSRVNUT1JFX01PRFVMRV9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zIHx8ICh7IHRpbWVvdXRXcml0ZU9wZXJhdGlvbnM6IGZhbHNlIH0gYXMgTmd4c0ZpcmVzdG9yZU1vZHVsZU9wdGlvbnMpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOZ3hzRmlyZXN0b3JlUGFnZUlkU2VydmljZSxcbiAgICAgICAgICB1c2VDbGFzczogTmd4c0ZpcmVzdG9yZVBhZ2VJZFNlcnZpY2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==