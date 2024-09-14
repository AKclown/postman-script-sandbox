import PM from './script/PM.js'
const pm = new PM();
window.pm = pm

const oneDom = document.getElementById('component_one_btn')
const oneInput = document.getElementById('component_one_input')
const oneOutput = document.getElementById('component_one_output')
oneDom.addEventListener('click', () => {
    const inputText = oneInput.value
    pm.createVariable('one')
    pm.setVariableId('one')
    pm.codeSandbox.execScript(inputText)
    oneOutput.value = JSON.stringify(pm.variables.toObject())
})

const twoDom = document.getElementById('component_two_btn')
const twoInput = document.getElementById('component_two_input')
const twoOutput = document.getElementById('component_two_output')
twoDom.addEventListener('click', () => {
    const inputText = twoInput.value
    pm.createVariable('two')
    pm.setVariableId('two')
    pm.codeSandbox.execScript(inputText)
    twoOutput.value = JSON.stringify(pm.variables.toObject())
})

const threeDom = document.getElementById('component_three_btn')
const threeInput = document.getElementById('component_three_input')
const threeOutput = document.getElementById('component_three_output')
threeDom.addEventListener('click', () => {
    const inputText = threeInput.value
    pm.createVariable('three')
    pm.setVariableId('three')
    pm.codeSandbox.execScript(inputText)
    threeOutput.value = JSON.stringify(pm.variables.toObject())
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





