var alphaReg = /^[\u4e00-\u9fa5]+$/i,
    reg = /^[\w]{6,16}$/,
    telnum = /^[\d]{11}$/;
    name=pw=pwconfirm=email=tel=0;

function ifocus(x) {
  var parent = x.parentNode;
  var temp = parent.nextElementSibling;
  temp.firstElementChild.setAttribute("class","show");
  document.getElementsByClassName(x.id)[0].style.marginBottom="40px";
}

function disfocus(x) {
  switch (x.id) {
    case "name":
      if (x.value.trim()=="") {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="名称不能为空！";
        temp.firstElementChild.style.color="#D80000";
        x.style.borderColor="#D80000";
        name = 0;
      }
      else {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="名称可用";
        temp.firstElementChild.style.color="#00CC00";
        x.style.borderColor="#00CC00";
        name = 1;
      }
      break;
    case "pw":
      if (!x.value.match(reg)||x.value=="") {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="密码必须为6-16位字符或数字！";
        temp.firstElementChild.style.color="#D80000";
        x.style.borderColor="#D80000";
        pw = 0;
      }
      else {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="密码可用";
        temp.firstElementChild.style.color="#00CC00";
        x.style.borderColor="#00CC00";
        pw = 1;
      }
      break;
    case "pwconfirm":
      if (x.value!=document.getElementById("pw").value||x.value=="") {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="请再次输入密码！";
        temp.firstElementChild.style.color="#D80000";
        x.style.borderColor="#D80000";
        pwconfirm = 0;
      }
      else {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="密码已确认";
        temp.firstElementChild.style.color="#00CC00";
        x.style.borderColor="#00CC00";
        pwconfirm = 1;
      }
      break;
    case "email":
      if (x.value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="邮箱格式正确";
        temp.firstElementChild.style.color="#00CC00";
        x.style.borderColor="#00CC00";
        email = 1;
      }
      else {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="邮箱格式错误";
        temp.firstElementChild.style.color="#D80000";
        x.style.borderColor="#D80000";
        email = 0;
      }
      break;
    case "tel":
      if (telnum.test(x.value)) {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="手机号码格式正确";
        temp.firstElementChild.style.color="#00CC00";
        x.style.borderColor="#00CC00";
        tel = 1;
      }
      else {
        var parent = x.parentNode;
        var temp = parent.nextElementSibling;
        temp.firstElementChild.setAttribute("class","show");
        temp.firstElementChild.innerHTML="手机号码格式错误";
        temp.firstElementChild.style.color="#D80000";
        x.style.borderColor="#D80000";
        tel = 0;
      }
      break;
    default:

  }
}

function check() {
  if (name&&pw&&pwconfirm&&email&&tel) {
    alert("输入正确");
  }
  else {
    disfocus(document.getElementById("name"));
    document.getElementsByClassName("name")[0].style.marginBottom="40px";
    disfocus(document.getElementById("pw"));
    document.getElementsByClassName("pw")[0].style.marginBottom="40px";
    disfocus(document.getElementById("pwconfirm"));
    document.getElementsByClassName("pwconfirm")[0].style.marginBottom="40px";
    disfocus(document.getElementById("email"));
    document.getElementsByClassName("email")[0].style.marginBottom="40px";
    disfocus(document.getElementById("tel"));
    document.getElementsByClassName("tel")[0].style.marginBottom="40px";
    alert("输入有误");
  }
}
