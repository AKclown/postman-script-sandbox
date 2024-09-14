export default class Headers {

    constructor() {

    }

    add({ key, value }) {
        this[key] = value
    }

    get(key) {
        return this[key]
    }

    remove() {

    }



    upsert() {

    }


}