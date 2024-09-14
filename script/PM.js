import Global from './Global.js'
import Environment from './Environment.js'
import CodeSandbox from './CodeSandbox.js'
import Variables from './Variables.js'
import Request from './Request.js'

export default class PM {
    // 全局变量
    global = null
    environment = null;
    // 局部变量
    variablesMap = null
    // 当前聚焦局部变量
    variableId = null
    // 沙箱实例
    codeSandbox = null
    // request变量
    request = null

    constructor() {
        this.global = new Global()
        this.environment = new Environment()
        this.variablesMap = new Map()
        this.codeSandbox = new CodeSandbox(this)
    }

    setRequest(requests) {
        this.request = new Request(requests)
    }

    createVariable(id) {
        if (!this.variablesMap.has(id)) {
            const variables = new Variables(this)
            this.variablesMap.set(id, variables)
        }
    }

    // 解锁
    unSetVariableId() {
        this.variableId = null
    }

    setVariableId(id) {
        if (window.ydConsole) {
            console.log('切换变量作用域: ', this.variableId, id);
        }
        this.variableId = id
    }

    get variables() {
        return this.variablesMap.get(this.variableId)
    }
}