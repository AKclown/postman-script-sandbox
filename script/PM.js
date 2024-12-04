import Variables from './Variables.js'
import Global from './Global.js'
import Environment from './Environment.js'
import CodeSandbox from './CodeSandbox.js'
import Request from './Request.js'
import Response from './Response.js'

export default class PM {
    // 全局变量
    global = null
    environment = null
    // 局部变量
    variablesMap = null
    // 当前聚焦局部变量
    variableId = null
    // 沙箱缓存
    codeSandboxMap = null
    // request缓存
    requestMap = null
    // Response 缓存
    responseMap = null

    constructor() {
        this.global = new Global()
        this.environment = new Environment()
        this.variablesMap = new Map()
        this.codeSandboxMap = new Map()
        this.requestMap = new Map()
        this.responseMap = new Map()
    }

    sleep(time = 100) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }

    async execScriptInSandbox(id, scriptText) {
        // 获取沙箱实例且执行
        const codeSandbox = this.codeSandboxMap.get(id)
        codeSandbox.execScript(scriptText)
        // !!目前只支持同步任务
        // TODO: 目前没有去判断沙箱内部代码是否完成，所以这里暂时先sleep一下，等待沙箱执行完毕 
        // 后续追加代码分析，判断沙箱是否执行完毕
        await this.sleep(100)
    }

    setRequest(id, req) {
        if (!this.requestMap.has(id)) {
            const request = new Request(req)
            this.requestMap.set(id, request)
        }
    }

    setResponse(id, res) {
        if (!this.responseMap.has(id)) {
            const response = new Response(res)
            this.responseMap.set(id, response)
        }
    }

    getResponseBody(id) {
        return this.responseMap.get(id).json()
    }

    getVariables(id) {
        return this.variablesMap.get(id).toObject()
    }

    setVariableId(id) {
        // 每个组件都有自己的环境，这样子也不存在并发问题

        //  $ 套件无需特殊处理
        if (!this.variablesMap.has(id)) {
            // console.log('当前组件变量作用域已存在，无需重新创建');
            const variables = new Variables(this)
            this.variablesMap.set(id, variables)
        }

        if (!this.codeSandboxMap.has(id)) {
            // 创建干净的沙箱实例(每一个组件都有独立的沙箱环境) 
            const codeSandbox = new CodeSandbox(id)
            this.codeSandboxMap.set(id, codeSandbox)
        }

    }

    // 解锁
    unSetVariableId(id) {
        // 销毁沙箱实例
        const codeSandbox = this.codeSandboxMap.get(id)
        codeSandbox?.destroy()
        this.codeSandboxMap.delete(id)
        this.variablesMap.delete(id)
        this.requestMap.delete(id)
        this.responseMap.delete(id)
    }

}
