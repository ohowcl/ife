var alphaReg = /^[\u4e00-\u9fa5]+$/i,
    text = document.getElementById("input"),
    tip = document.getElementById("tip");

function check() {
  var contents = text.value.trim();//获取input输入
  var len = 0;
  for (var i = 0; i < contents.length; i++) {
    if(alphaReg.test(contents[i]))//如果是中文字符长度+2
      len += 2;
    else
      len ++
  }
  if (len<4||len>16) {
    if (len==0) {
      tip.innerHTML="姓名不能为空";
      tip.style.color="#D80000";
      text.style.borderColor="#D80000";
    }
    else {
      tip.innerHTML="必填，长度为4~16个字符";
      tip.style.color="#D80000";
      text.style.borderColor="#D80000";
    }
  }
  else {
    tip.innerHTML="名称格式正确";
    tip.style.color="#00CC00";
    text.style.borderColor="#00CC00";
  }
}
