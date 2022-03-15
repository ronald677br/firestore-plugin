export var RacesActions;
(function (RacesActions) {
    class GetAllOnce {
    }
    GetAllOnce.type = '[Races] GetAllOnce';
    RacesActions.GetAllOnce = GetAllOnce;
    class GetOnce {
        constructor(payload) {
            this.payload = payload;
        }
    }
    GetOnce.type = '[Races] GetOnce';
    RacesActions.GetOnce = GetOnce;
    class Get {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Get.type = '[Races] Get';
    RacesActions.Get = Get;
    class GetAll {
    }
    GetAll.type = '[Races] GetAll';
    RacesActions.GetAll = GetAll;
    class GetPages {
    }
    GetPages.type = '[Races] GetPages';
    RacesActions.GetPages = GetPages;
    class Create {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Create.type = '[Races] Create';
    RacesActions.Create = Create;
    class Upsert {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Upsert.type = '[Races] Upsert';
    RacesActions.Upsert = Upsert;
    class Update {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Update.type = '[Races] Update';
    RacesActions.Update = Update;
    class UpdateIfExists {
        constructor(payload) {
            this.payload = payload;
        }
    }
    UpdateIfExists.type = '[Races] UpdateIfExists';
    RacesActions.UpdateIfExists = UpdateIfExists;
    class Delete {
        constructor(payload) {
            this.payload = payload;
        }
    }
    Delete.type = '[Races] Delete';
    RacesActions.Delete = Delete;
    class Error {
    }
    Error.type = '[Races] Error';
    RacesActions.Error = Error;
})(RacesActions || (RacesActions = {}));
//# sourceMappingURL=races.actions.js.map