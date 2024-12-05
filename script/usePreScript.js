// HOOKS请求预处理
export default () => {
    // *********************
    // Pre Request
    // *********************

    /** 请求前-处理 */
    const execPreRequest = async (id, script, request) => {
        if (script) {
            // $执行脚本
            window.pm.setVariableId(id)
            window.pm.setRequest(id, request)
            await window.pm.execScriptInSandbox(id, script)
            const data = window.pm.getVariables(id)
            return data
        } else {
            return {}
        }

    }

    // *********************
    // Pre Response
    // *********************

    /** 请求后-处理 */
    const execPostResponse = async (id, script, response) => {
        if (script) {
            // $执行脚本
            window.pm.setVariableId(id)
            window.pm.setResponse(id, response)
            await window.pm.execScriptInSandbox(id, script)
            const body = window.pm.getResponseBody(id)
            if (!body) {
                console.error(id, response);
            }
            return body
        } else {
            return JSON.parse(response.body)
        }

    }

    /** 销毁脚本执行环境 */
    const destroyScript = (id) => {
        window.pm.unSetVariableId(id)

    }

    return { execPreRequest, execPostResponse, destroyScript }
}
