export default class Response {

    code = null;
    status = null;
    headers = null;
    responseTime = null;
    responseSize = null;
    body = null;

    constructor(response) {
        this.headers = response.headers;
        this.status = response.status;
        this.body = JSON.parse(response.body || "");
    }

    json() {
        return this.body;
    }

    /** postman 不存在该方法，自行内置的 */
    setJson(object) {
        this.body = object;
    }
}
