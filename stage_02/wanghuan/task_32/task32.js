/**
* 表单的构造函数
* id:表单元素的id
* label:表单标签
* type:表单类型
* validator:表单验证规则
* rules:填写通过的正确规则
* success:验证通过之后的提示
* fail:验证失败之后的提示
*/
function FormStyle(id,label,type,validator,rules,success,fail) {
  this.id = id;
  this.label = label;
  this.type = type;
  this.validator = validator;
  this.rules = rules;
  this.success = success;
  this.fail = fail;
}

/**
* 五个构造实例
*/
var nameInput = new FormStyle("name","名称","text",validateName,"必填，长度为4~16个字符","名称格式正确","请输入长度为4~16的字符"),
    psdInput = new FormStyle("psd","密码","password",validatePsd,"必填，输入6~16位密码","密码格式正确","请输入长度为6~16的字符"),
    psdInputAgain = new FormStyle("psdAgain","确认密码","password",validatePsdAgain,"输入相同密码","再次输入正确","再次输入错误"),
    emailInput = new FormStyle("mail","邮箱","text",validateEmail,"请输入邮箱地址","格式正确","格式错误"),
    telInput = new FormStyle("tel","手机号","text",validateTel,"请输入11位手机号","格式正确","格式错误"),

    formEles = document.getElementsByTagName('input'),
    forms = document.getElementsByTagName('form'),
    formSelf = {
      0:[nameInput],
      1:[psdInput,psdInputAgain],
      2:[emailInput],
      3:[telInput]
};

window.onload = function() {
  formEles[4].addEventListener("click",btnForm);
}

function btnForm() {
  var str = "",
      selectForm = [];

  for(var i = 0,len = formEles.length;i < len;i++) {
    if(formEles[i].checked) {
      selectForm.push(formSelf[i]);
    }
  }

  for(var i = 0,len = selectForm.length;i < len;i++) {
    for(var j = 0;j < selectForm[i].length;j++)
      str += toString(selectForm[i][j]);
  }
  alert(str);
  str+="<label>" + "<input type=\"button\" value=\"提交\" id=\"submitBtn\"/>";
  forms[1].innerHTML = str;
}

function toString(obj) {
  return "<label>" + obj.label + "<input id=\"" + obj.id + "\"" + "type=\"" + obj.type + "\"/>" +"<p></p>"+"</label>" + "<br/>";
}

function validateName() {

}
function validatePsd() {

}
function validatePsdAgain() {

}
function validateEmail() {

}
function validateTel() {

}
