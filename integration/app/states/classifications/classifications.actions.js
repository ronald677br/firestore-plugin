export var ClassificationsActions;
(function (ClassificationsActions) {
    class Get {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Get.type = '[Classifications] Get';
    ClassificationsActions.Get = Get;
    class GetAll {
        constructor(raceId) {
            this.raceId = raceId;
        }
    }
    GetAll.type = '[Classifications] GetAll';
    ClassificationsActions.GetAll = GetAll;
})(ClassificationsActions || (ClassificationsActions = {}));
//# sourceMappingURL=classifications.actions.js.map