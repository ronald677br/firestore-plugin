var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { NgxsFirestore, NgxsFirestoreAdapter } from '@ngxs-labs/firestore-plugin';
let CustomDependency = class CustomDependency {
    works() {
        return true;
    }
};
CustomDependency = __decorate([
    Injectable()
], CustomDependency);
export { CustomDependency };
let InjectCustomDependenciesService = class InjectCustomDependenciesService extends NgxsFirestore {
    constructor(adapter, customeDependency) {
        super(adapter);
        this.customeDependency = customeDependency;
        this.path = 'races';
    }
};
InjectCustomDependenciesService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(NgxsFirestoreAdapter))
], InjectCustomDependenciesService);
export { InjectCustomDependenciesService };
//# sourceMappingURL=inject-custom-dependecies.service.js.map