validate();

function validate() {
  var text = document.getElementById('inputText'),
      valButton = document.getElementById('validity'),
      p = document.getElementsByTagName('p')[0];

  valButton.addEventListener("click",function() {
    var content = text.value.trim();

    if(calLen(content) == 0) {
      p.innerHTML = "姓名不能为空";
      p.style.color = "red";
      text.style.border = "1px solid red";
    } else if(calLen(content) >= 4 && calLen(content) <= 16) {
      p.innerHTML = "名称格式正确";
      p.style.color = "green";
      text.style.border = "1px solid green";
    } else {
      p.innerHTML = "请输入长度为4~16的字符";
      p.style.color = "red";
      text.style.border = "1px solid red";
    }
  });
}

function calLen(content) {
  var length = 0;

  for(var i = 0,len = content.length;i < len;i++) {
    var code = content.charCodeAt(i);

    if(code >= 0 && code <=128) {
      length += 1;
    } else{
      length += 2;
    }
  }
  return length;
}
