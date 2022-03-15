export function StreamConnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Connected`,
        _a;
}
export function StreamEmitted(actionType) {
    var _a;
    return _a = class {
            constructor(action, payload) {
                this.action = action;
                this.payload = payload;
            }
        },
        _a.type = `${actionType.type} Emitted`,
        _a;
}
export function StreamDisconnected(actionType) {
    var _a;
    return _a = class {
            constructor(action) {
                this.action = action;
            }
        },
        _a.type = `${actionType.type} Disconnected`,
        _a;
}
export function StreamErrored(actionType) {
    var _a;
    return _a = class {
            constructor(action, error) {
                this.action = action;
                this.error = error;
            }
        },
        _a.type = `${actionType.type} Errored`,
        _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWRlY29yYXRvci1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hY3Rpb24tZGVjb3JhdG9yLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxVQUFVLGVBQWUsQ0FBQyxVQUFzQjs7SUFDcEQsWUFBTztZQUVMLFlBQW1CLE1BQVc7Z0JBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFHLENBQUM7U0FDbkM7UUFGaUIsT0FBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksWUFBYTtXQUV0RDtBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLFVBQXNCOztJQUNsRCxZQUFPO1lBRUwsWUFBbUIsTUFBVyxFQUFTLE9BQVk7Z0JBQWhDLFdBQU0sR0FBTixNQUFNLENBQUs7Z0JBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUFHLENBQUM7U0FDeEQ7UUFGaUIsT0FBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksVUFBVztXQUVwRDtBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsVUFBc0I7O0lBQ3ZELFlBQU87WUFFTCxZQUFtQixNQUFXO2dCQUFYLFdBQU0sR0FBTixNQUFNLENBQUs7WUFBRyxDQUFDO1NBQ25DO1FBRmlCLE9BQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLGVBQWdCO1dBRXpEO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsVUFBc0I7O0lBQ2xELFlBQU87WUFFTCxZQUFtQixNQUFXLEVBQVMsS0FBVTtnQkFBOUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztnQkFBUyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQUcsQ0FBQztTQUN0RDtRQUZpQixPQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxVQUFXO1dBRXBEO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblR5cGUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHJlYW1Db25uZWN0ZWQoYWN0aW9uVHlwZTogQWN0aW9uVHlwZSkge1xuICByZXR1cm4gY2xhc3Mge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gYCR7YWN0aW9uVHlwZS50eXBlfSBDb25uZWN0ZWRgO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb246IGFueSkge31cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0cmVhbUVtaXR0ZWQoYWN0aW9uVHlwZTogQWN0aW9uVHlwZSkge1xuICByZXR1cm4gY2xhc3Mge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gYCR7YWN0aW9uVHlwZS50eXBlfSBFbWl0dGVkYDtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uOiBhbnksIHB1YmxpYyBwYXlsb2FkOiBhbnkpIHt9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHJlYW1EaXNjb25uZWN0ZWQoYWN0aW9uVHlwZTogQWN0aW9uVHlwZSkge1xuICByZXR1cm4gY2xhc3Mge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gYCR7YWN0aW9uVHlwZS50eXBlfSBEaXNjb25uZWN0ZWRgO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb246IGFueSkge31cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0cmVhbUVycm9yZWQoYWN0aW9uVHlwZTogQWN0aW9uVHlwZSkge1xuICByZXR1cm4gY2xhc3Mge1xuICAgIHN0YXRpYyByZWFkb25seSB0eXBlID0gYCR7YWN0aW9uVHlwZS50eXBlfSBFcnJvcmVkYDtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uOiBhbnksIHB1YmxpYyBlcnJvcjogYW55KSB7fVxuICB9O1xufVxuIl19