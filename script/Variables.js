export default class Variables {
    data = new Map()
    pm = null
    
    constructor(pm) {
        this.pm = pm
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

    toObject() {
        const global = this.pm.global.toObject()
        const environment = this.pm.environment.toObject()
        const variables = Object.fromEntries(this.data)
        return { ...global, ...environment, ...variables }
    }
}

