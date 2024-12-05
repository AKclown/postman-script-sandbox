
// !!! 为什么不能使用yid作为执行脚本的唯一标识呢？
// !!! 原因: 因为请求是异步的，在轮训中可能同一个组件这次的请求还未完成，就会去执行下一次组件的请求。这次请求完成之后我会清空相关请求以及沙箱数据
// !!! 导致下一次请求时去获取 “相关请求以及沙箱数据” 会出现找不到的情况。（因为同一个组件yid是一致的）
// 也可以通过优化轮训方法来避免上一次请求没有完成，就进入到下一次请求的情况

import PM from './script/PM.js'
const pm = new PM();
window.pm = pm

const oneDom = document.getElementById('component_one_btn')
const oneInput = document.getElementById('component_one_input')
const oneOutput = document.getElementById('component_one_output')
oneDom.addEventListener('click', async () => {
    const inputText = oneInput.value
    const random = Math.random().toString(16).slice(2);
    const yid = 'one';
    const id = `${random}-${yid}`
    pm.setVariableId(id)
    await pm.execScriptInSandbox(id, inputText)
    const data = pm.getVariables(id)
    oneOutput.value = JSON.stringify(data)
    pm.unSetVariableId(id)
})

const twoDom = document.getElementById('component_two_btn')
const twoInput = document.getElementById('component_two_input')
const twoOutput = document.getElementById('component_two_output')
twoDom.addEventListener('click', async () => {
    const inputText = twoInput.value
    const random = Math.random().toString(16).slice(2);
    const yid = 'two';
    const id = `${random}-${yid}`
    pm.setVariableId(id)
    await pm.execScriptInSandbox(id, inputText)
    const data = pm.getVariables(id)
    twoOutput.value = JSON.stringify(data)
    pm.unSetVariableId(id)
})

const threeDom = document.getElementById('component_three_btn')
const threeInput = document.getElementById('component_three_input')
const threeOutput = document.getElementById('component_three_output')
threeDom.addEventListener('click', async () => {
    const inputText = threeInput.value
    const random = Math.random().toString(16).slice(2);
    const yid = 'three';
    const id = `${random}-${yid}`
    pm.setVariableId(id)
    await pm.execScriptInSandbox(id, inputText)
    const data = pm.getVariables(id)
    threeOutput.value = JSON.stringify(data)
    pm.unSetVariableId(id)
})


// pm.global.set('global1', 'global_1')
// pm.environment.set('env1', 'env_1')
// pm.variables.set('var1', 'var_1')
// console.log('pm.global: ', JSON.stringify(pm.variables.toObject()));
// throw new Error('我是一个错误哦')
// pm.global.set('err1', 'err_1')
// console.log('pm.global: ', JSON.stringify(pm.variables.toObject()));

// pm.global.set('global2', 'global_2')
// pm.environment.set('env2', 'env_2')
// pm.variables.set('var2', 'var_2')
// pm.variables.set("Date", new Date().toString())
// console.log('pm.global: ', JSON.stringify(pm.variables.toObject()));

// var signatureHeaders = 'abc'
// const appSecret = '123'
// var hash = CryptoJS.HmacSHA256(signatureHeaders, appSecret);
// var signature = hash.toString(CryptoJS.enc.Base64);
// pm.global.set('global3', 'global_3')
// pm.environment.set('env3', 'env_3')
// pm.variables.set('var3', 'var_3')
// pm.variables.set('signature', signature)
// console.log('pm.global: ', JSON.stringify(pm.variables.toObject()));




// // $ 1
// const test1 = `
// window.pm = 'pm'
// throw new Error('AK')
// pm.global.set('age', 28)
// console.log('pm.global: ', pm.global);
// `;

// pm.codeSandbox.execScript(test1)

// // $ 2
// pm.createVariable('2')
// pm.setVariableId('2')
// const test2 = `
// pm.variables.set('name', 'ak')
// const variables2 = Object.fromEntries(pm.variables.data);
// console.log('variables2: ', variables2);
// console.log('window: ', window);
// `;
// pm.codeSandbox.execScript(test2)

// // $ 3
// pm.createVariable('3')
// pm.setVariableId('3')
// const test3 = `
// pm.variables.set('age', '18')
// const variables3 = Object.fromEntries(pm.variables.data);
// console.log('variables3: ', variables3);
// `;
// pm.codeSandbox.execScript(test3)

// // $ 4
// pm.createVariable('4')
// pm.setVariableId('4')
// const test4 = `
// var appKey = "26072923";//需要根据现场情况修改
// var date = new Date().toString();
// var timestamp = new Date().getTime();

// pm.variables.set('AppKey', appKey);
// pm.variables.set('Md5', 'md5');
// pm.variables.set("Date", date);
// pm.variables.set("Signature", 'signature');
// pm.variables.set("SignatureHeaders", 'signatureHeaders');
// pm.variables.set("Nonce", 'nonce');
// pm.variables.set("Timestamp", timestamp);
// console.log('Timestamp',pm.variables.get("Timestamp"))
// `;
// pm.codeSandbox.execScript(test4)

// console.log('window: ', window);





