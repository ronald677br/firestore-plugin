export var NgxsFirestoreConnectActions;
(function (NgxsFirestoreConnectActions) {
    class StreamConnected {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamConnected.type = '[NgxsFirestore] Connected';
    NgxsFirestoreConnectActions.StreamConnected = StreamConnected;
    class StreamEmitted {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamEmitted.type = '[NgxsFirestore] Emitted';
    NgxsFirestoreConnectActions.StreamEmitted = StreamEmitted;
    class StreamDisconnected {
        constructor(payload) {
            this.payload = payload;
        }
    }
    StreamDisconnected.type = '[NgxsFirestore] Disconnected';
    NgxsFirestoreConnectActions.StreamDisconnected = StreamDisconnected;
})(NgxsFirestoreConnectActions || (NgxsFirestoreConnectActions = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1maXJlc3RvcmUtY29ubmVjdC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9uZ3hzLWZpcmVzdG9yZS1jb25uZWN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxLQUFXLDJCQUEyQixDQWEzQztBQWJELFdBQWlCLDJCQUEyQjtJQUMxQyxNQUFhLGVBQWU7UUFFMUIsWUFBbUIsT0FBZTtZQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBRyxDQUFDOztJQUR0QixvQkFBSSxHQUFHLDJCQUEyQixDQUFDO0lBRHhDLDJDQUFlLGtCQUczQixDQUFBO0lBQ0QsTUFBYSxhQUFhO1FBRXhCLFlBQW1CLE9BQWlEO1lBQWpELFlBQU8sR0FBUCxPQUFPLENBQTBDO1FBQUcsQ0FBQzs7SUFEeEQsa0JBQUksR0FBRyx5QkFBeUIsQ0FBQztJQUR0Qyx5Q0FBYSxnQkFHekIsQ0FBQTtJQUNELE1BQWEsa0JBQWtCO1FBRTdCLFlBQW1CLE9BQWU7WUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQUcsQ0FBQzs7SUFEdEIsdUJBQUksR0FBRyw4QkFBOEIsQ0FBQztJQUQzQyw4Q0FBa0IscUJBRzlCLENBQUE7QUFDSCxDQUFDLEVBYmdCLDJCQUEyQixLQUEzQiwyQkFBMkIsUUFhM0MiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgTmd4c0ZpcmVzdG9yZURlYnVnUGF5bG9hZHMge1xuICBleHBvcnQgaW50ZXJmYWNlIFN0cmVhbUVtaXR0ZWQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXRlbXM6IGFueTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIE5neHNGaXJlc3RvcmVDb25uZWN0QWN0aW9ucyB7XG4gIGV4cG9ydCBjbGFzcyBTdHJlYW1Db25uZWN0ZWQge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ1tOZ3hzRmlyZXN0b3JlXSBDb25uZWN0ZWQnO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBzdHJpbmcpIHt9XG4gIH1cbiAgZXhwb3J0IGNsYXNzIFN0cmVhbUVtaXR0ZWQge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ1tOZ3hzRmlyZXN0b3JlXSBFbWl0dGVkJztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogTmd4c0ZpcmVzdG9yZURlYnVnUGF5bG9hZHMuU3RyZWFtRW1pdHRlZCkge31cbiAgfVxuICBleHBvcnQgY2xhc3MgU3RyZWFtRGlzY29ubmVjdGVkIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdbTmd4c0ZpcmVzdG9yZV0gRGlzY29ubmVjdGVkJztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogc3RyaW5nKSB7fVxuICB9XG59XG4iXX0=