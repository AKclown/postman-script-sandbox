export default class Global {
    data = new Map()
    constructor() {

    }

    has(key) {
        return this.data.has(key)
    }

    get(key) {
        return this.data.get(key)
    }

    set(key, value) {
        return this.data.set(key, value)
    }

    unset(key) {
        return this.data.delete(key)
    }

    clear() {
        this.data.clear()
    }

    toObject(){
        return Object.fromEntries(this.data)
    }
    
}

