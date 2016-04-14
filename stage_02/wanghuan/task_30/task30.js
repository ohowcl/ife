
var text = document.getElementsByTagName('input'),
    p = document.getElementsByTagName('p'),
    flag = true;

validate();

function validate() {

  validateName();
  validatePsd();
  validatePsdAgain();
  validateEmail();
  validateTel();

  validateAll();
}

function validateName() {
  text[0].addEventListener("focus",function() {
    text[0].parentNode.children[1].style.color = "#a8a8a8";
    text[0].parentNode.children[1].innerHTML = "必填，长度为4~16个字符";

    text[0].addEventListener("focusout",function() {
      var content = text[0].value.trim();

      if(calLen(content) == 0) {
        text[0].parentNode.children[1].innerHTML = "姓名不能为空";
        text[0].parentNode.children[1].style.color = "red";
        text[0].style.border = "1px solid red";
        flag = false;
      } else if(calLen(content) >= 4 && calLen(content) <= 16) {
        text[0].parentNode.children[1].innerHTML = "名称格式正确";
        text[0].parentNode.children[1].style.color = "green";
        text[0].style.border = "1px solid green";
        flag = true;
      } else {
        text[0].parentNode.children[1].innerHTML = "请输入长度为4~16的字符";
        text[0].parentNode.children[1].style.color = "red";
        text[0].style.border = "1px solid red";
        flag = false;
      }
    })

  })
}

function validatePsd() {
  text[1].addEventListener("focus",function() {
    text[1].parentNode.children[1].style.color = "#a8a8a8";
    text[1].parentNode.children[1].innerHTML = "必填，输入6~16位密码";

    text[1].addEventListener("focusout",function() {
      var content = text[1].value.trim();

      if(calLen(content) == 0) {
        text[1].parentNode.children[1].innerHTML = "密码不能为空";
        text[1].parentNode.children[1].style.color = "red";
        text[1].style.border = "1px solid red";
        flag = false;
      } else if(calLen(content) >= 6 && calLen(content) <= 16) {
        text[1].parentNode.children[1].innerHTML = "密码格式正确";
        text[1].parentNode.children[1].style.color = "green";
        text[1].style.border = "1px solid green";
        flag = true;
      } else {
        text[1].parentNode.children[1].innerHTML = "请输入长度为6~16的字符";
        text[1].parentNode.children[1].style.color = "red";
        text[1].style.border = "1px solid red";
        flag = false;
      }
    })

  })
}

function validatePsdAgain() {
  text[2].addEventListener("focus",function() {
    text[2].parentNode.children[1].style.color = "#a8a8a8";
    text[2].parentNode.children[1].innerHTML = "输入相同密码";

    text[2].addEventListener("focusout",function() {
      var content = text[1].value.trim();

      if(text[2].value =="") {
        text[2].parentNode.children[1].innerHTML = "不能为空";
        text[2].parentNode.children[1].style.color = "red";
        text[2].style.border = "1px solid red";
        flag = false;
      }else if(content == text[2].value.trim()) {
        text[2].parentNode.children[1].innerHTML = "再次输入正确";
        text[2].parentNode.children[1].style.color = "green";
        text[2].style.border = "1px solid green";
        flag = true;
      }else{
        text[2].parentNode.children[1].innerHTML = "再次输入错误";
        text[2].parentNode.children[1].style.color = "red";
        text[2].style.border = "1px solid red";
        flag = false;
      }
    })

  })
}

function validateEmail() {
  var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  text[3].addEventListener("focus",function() {
    text[3].parentNode.children[1].style.color = "#a8a8a8";
    text[3].parentNode.children[1].innerHTML = "请输入邮箱地址";

    text[3].addEventListener("focusout",function() {
      var content = text[3].value.trim();

      if(filter.test(content)) {
        text[3].parentNode.children[1].innerHTML = "格式正确";
        text[3].parentNode.children[1].style.color = "green";
        text[3].style.border = "1px solid green";
        flag = true;
      }else {
        text[3].parentNode.children[1].innerHTML = "格式错误";
        text[3].parentNode.children[1].style.color = "red";
        text[3].style.border = "1px solid red";
        flag = false;
      }
    })

  })

}

function validateTel() {
  var filter  = /^1(3|4|5|7|8)\d{9}$/;

  text[4].addEventListener("focus",function() {
    text[4].parentNode.children[1].style.color = "#a8a8a8";
    text[4].parentNode.children[1].innerHTML = "请输入11位手机号";

    text[4].addEventListener("focusout",function() {
      var content = text[4].value.trim();

      if(filter.test(content)) {
        text[4].parentNode.children[1].innerHTML = "格式正确";
        text[4].parentNode.children[1].style.color = "green";
        text[4].style.border = "1px solid green";
        flag = true;
      }else {
        text[4].parentNode.children[1].innerHTML = "格式错误";
        text[4].parentNode.children[1].style.color = "red";
        text[4].style.border = "1px solid red";
        flag = false;
      }
    })

  })
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

function validateAll() {
  text[5].addEventListener("click",function() {
    if(flag == true) {
      alert("success!");
    }else {
      alert("input error,please check again!");
    }
  })
}
