
import Headers from './Headers.js'

export default class Request {
    body = null;
    headers = null;
    method = null;
    url = null;

    // TODO 暂未使用
    data = null

    constructor(request) {
        this.init(request)
    }


    paramsToQuery(params = {}) {
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    }

    setHeaders(h = {}) {
        for (let name in h) {
            this.headers[name] = h[name]
        }
    }

    init(request) {
        const { requestHttpType, requestGlobalConfig, requestUrl, requestParams = {} } = request
        this.data = ''
        this.headers = new Headers()
        this.method = requestHttpType
        const query = this.paramsToQuery(requestParams.Params)
        this.url = `${requestGlobalConfig?.requestOriginUrl}${requestUrl}${query ? '?' + query : ''}`
        this.setHeaders(requestParams.Header)
    }

}