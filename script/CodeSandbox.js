class CodeSandbox {
    // iframe 实例
    iframe = null;
    // iframe 的 Window 实例
    iframeWindow = null;
    constructor() {
        this.iframe = this.createIframe();
        this.iframeWindow = this.iframe.contentWindow;
        this.proxyIframe();
    }

    createIframe() {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'about:blank');
        iframe.setAttribute('style', 'display: block;width:0; height:0;border:none;');
        document.body.appendChild(iframe);
        return iframe;
    }

    proxyIframe() {
        this.iframeWindow.proxy = new Proxy(this.iframeWindow, {
            get: (target, prop) => {

                // 支持postman外置库
                // https://postman.xiniushu.com/docs/writing-scripts/script-references/postman-sandbox-api-reference
                if (prop === "pm" || prop === "CryptoJS") {
                    return window[prop]
                }

                if (prop === "window" || prop === "self") {
                    return this.iframeWindow.proxy;
                }
                // TODO
                return target[prop];
            },

            set: (target, prop, value) => {
                target[prop] = value;
                return true;
            },

            has: (target, prop) => true,
        })
    }

    removeScript() {
        const headDom = this.iframeWindow.document.head
        while (headDom.firstChild) {
            headDom.removeChild(headDom.lastChild);
        }

    }

    execScript(scriptText) {
        this.removeScript()
        const scriptElement =
            this.iframeWindow.document.createElement("script");
        scriptElement.textContent = `
            (function(window) {
              with(window) {
                ${scriptText}
              }
            }).bind(window.proxy)(window.proxy);
            `;
        this.iframeWindow.document.head.appendChild(scriptElement);
    }

    destroy() {
        if (this.iframe) {
            this.iframe.parentNode?.removeChild(this.iframe);
        }
        this.iframe = null;
        this.iframeWindow = null
    }
}

export default CodeSandbox;