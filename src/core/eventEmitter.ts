export class EventEmitter {
    private _events: { [t: string]: any };

    constructor() {
        this._events = {};
    }
  
    on(name: string, listener: (t: any) => any) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
    
        this._events[name].push(listener);
    }
  
    removeListener(name: string, listenerToRemove: (t: any) => any) {
        if (!this._events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }
    
        const filterListeners = (listener: any) => listener !== listenerToRemove;
    
        this._events[name] = this._events[name].filter(filterListeners);
    }
  
    emit(name: string, data: any) {
        if (!this._events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }
    
        const fireCallbacks = (callback: (t: any) => any) => {
            callback(data);
        };
    
        this._events[name].forEach(fireCallbacks);
    }
}
