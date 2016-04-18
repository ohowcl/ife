var alphaReg = /^[\u4e00-\u9fa5]+$/i,
    reg = /^[\w]{6,16}$/,
    telnum = /^[\d]{11}$/;
    name=pw=pwconfirm=email=tel=0;

var forms = document.getElementById("right");
var lab0=lab1=lab2=lab3=0;

//生成表单
function generate() {
  var checklabels = document.getElementsByName("label");
  var tips = document.getElementsByClassName("tip");
  if (checklabels[0].checked) {//显示姓名输入框
    document.getElementsByClassName("name")[0].setAttribute("class","left name show");
    document.getElementsByClassName("name")[1].setAttribute("class","input name show");
    tips[0].setAttribute("class","tip");
    lab0 = 1;
  }
  else {
    document.getElementsByClassName("name")[0].setAttribute("class","left name hide");
    document.getElementsByClassName("name")[1].setAttribute("class","input name hide");
    tips[0].setAttribute("class","tip hide");
    lab0 = 0;
  }
  if (checklabels[1].checked) {//显示密码输入框
    document.getElementsByClassName("pw")[0].setAttribute("class","left pw show");
    document.getElementsByClassName("pw")[1].setAttribute("class","input pw show");
    document.getElementsByClassName("pwconfirm")[0].setAttribute("class","left pwconfirm show");
    document.getElementsByClassName("pwconfirm")[1].setAttribute("class","input pwconfirm show");
    tips[1].setAttribute("class","tip");
    tips[2].setAttribute("class","tip");
    lab1 = 1;
  }
  else {
    document.getElementsByClassName("pw")[0].setAttribute("class","left pw hide");
    document.getElementsByClassName("pw")[1].setAttribute("class","input pw hide");
    document.getElementsByClassName("pwconfirm")[0].setAttribute("class","left pwconfirm hide");
    document.getElementsByClassName("pwconfirm")[1].setAttribute("class","input pwconfirm hide");
    tips[1].setAttribute("class","tip hide");
    tips[2].setAttribute("class","tip hide");
    lab1 = 0
  }
  if (checklabels[2].checked) {//显示email输入框
    document.getElementsByClassName("email")[0].setAttribute("class","left email show");
    document.getElementsByClassName("email")[1].setAttribute("class","input email show");
    tips[3].setAttribute("class","tip");
    lab2 = 1;
  }
  else {
    document.getElementsByClassName("email")[0].setAttribute("class","left email hide");
    document.getElementsByClassName("email")[1].setAttribute("class","input email hide");
    tips[3].setAttribute("class","tip hide");
    lab2 = 0;
  }
  if (checklabels[3].checked) {//显示电话输入框
    document.getElementsByClassName("tel")[0].setAttribute("class","left tel show");
    document.getElementsByClassName("tel")[1].setAttribute("class","input tel show");
    tips[4].setAttribute("class","tip");
    lab3 = 1;
  }
  else {
    document.getElementsByClassName("tel")[0].setAttribute("class","left tel hide");
    document.getElementsByClassName("tel")[1].setAttribute("class","input tel hide");
    tips[4].setAttribute("class","tip hide");
    lab3 = 0;
  }
  if (lab0||lab1||lab2||lab3) {//如果都没选中，隐藏按钮
    document.getElementById("submit").setAttribute("class","show");
  }
  else {
    document.getElementById("submit").setAttribute("class","hide");
  }
}

//改变样式
function changestyle() {
  var chk = document.getElementsByName("radiobutton");
  var leftlable = document.getElementsByClassName("left");
  if (chk[1].checked) {
    document.getElementById("name").style.width="350px";
    document.getElementById("name").style.height="40px";
    document.getElementById("pw").style.width="350px";
    document.getElementById("pw").style.height="40px";
    document.getElementById("pwconfirm").style.width="350px";
    document.getElementById("pwconfirm").style.height="40px";
    document.getElementById("email").style.width="350px";
    document.getElementById("email").style.height="40px";
    document.getElementById("tel").style.width="350px";
    document.getElementById("tel").style.height="40px";
    for (var i = 0; i < leftlable.length; i++) {
      leftlable[i].style.marginBottom="33px";
    }
  }
  else {
    document.getElementById("name").style.width="400px";
    document.getElementById("name").style.height="30px";
    document.getElementById("pw").style.width="400px";
    document.getElementById("pw").style.height="30px";
    document.getElementById("pwconfirm").style.width="400px";
    document.getElementById("pwconfirm").style.height="30px";
    document.getElementById("email").style.width="400px";
    document.getElementById("email").style.height="30px";
    document.getElementById("tel").style.width="400px";
    document.getElementById("tel").style.height="30px";
    for (var i = 0; i < leftlable.length; i++) {
      leftlable[i].style.marginBottom="23px";
    }
  }
}

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
