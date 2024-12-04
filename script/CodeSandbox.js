import CryptoES from 'crypto-es'

class CodeSandbox {
    // iframe 实例
    iframe = null
    // iframe 的 Window 实例
    iframeWindow = null
    // 环境变量id
    variableId = null
    constructor(id) {
        // 当前沙箱所属的环境变量id
        this.variableId = id
        window.CryptoJS = CryptoES
        this.iframe = this.createIframe()
        this.iframeWindow = this.iframe.contentWindow
        this.proxyIframe()
    }

    createIframe() {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', 'about:blank')
        iframe.setAttribute('style', 'display: block;width:0; height:0;border:none;')
        document.body.appendChild(iframe)
        return iframe
    }

    proxyIframe() {
        this.iframeWindow.proxy = new Proxy(this.iframeWindow, {
            get: (target, prop) => {
                // 支持postman外置库
                // https://postman.xiniushu.com/docs/writing-scripts/script-references/postman-sandbox-api-reference
                if (prop === 'pm') {
                    /**
                     * 1. pm从全局变量获取
                     * 2. variables和request (不共用额外处理)
                     * 3. 其他pm属性，从pm下获取
                     */
                    return new Proxy(window[prop] || {}, {
                        get: (subTarget, subProp) => {
                            if (subProp === 'variables') {
                                return subTarget.variablesMap.get(this.variableId)
                            } else if (subProp === 'request') {
                                return subTarget.requestMap.get(this.variableId)
                            } else if (subProp === 'response') {
                                return subTarget.responseMap.get(this.variableId)
                            }
                            return subTarget[subProp]
                        },
                    })
                }

                if (prop === 'CryptoJS') {
                    return window[prop]
                }

                if (prop === 'window' || prop === 'self') {
                    return this.iframeWindow.proxy
                }
                // TODO: 留给有缘人，一些错误边界问题，遇到再处理，it is no time fix it
                return target[prop]
            },

            set: (target, prop, value) => {
                target[prop] = value
                return true
            },

            has: (target, prop) => true,
        })
    }

    removeScript() {
        const headDom = this.iframeWindow.document.head
        while (headDom.firstChild) {
            headDom.removeChild(headDom.lastChild)
        }
    }

    execScript(scriptText) {
        const scriptElement = this.iframeWindow.document.createElement('script')
        scriptElement.textContent = `
            (function(window) {
              with(window) {
                ${scriptText}
              }
            }).bind(window.proxy)(window.proxy);
            `
        this.iframeWindow.document.head.appendChild(scriptElement)
    }

    destroy() {
        if (this.iframe) {
            this.iframe.parentNode?.removeChild(this.iframe)
        }
        this.iframe = null
        this.iframeWindow = null
    }
}

export default CodeSandbox
