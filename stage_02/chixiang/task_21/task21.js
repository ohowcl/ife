var array1 = [], array2 = [], string = "", count1 = 0, count2 = 0;
var alphaReg = /^[\u4e00-\u9fa5a-zA-z0-9]+$/i;
var input = document.getElementById("inputnum");

function addtag() {
  string = "";
  var tag = document.getElementById("tag");
  for (var i = 0; i < tag.value.length; i++) {
    if (alphaReg.test(tag.value[i])) {
      string += tag.value[i];
    }
    else {
      if(count1 < 10) {
        if (string != "") {
          array1.unshift(string);
          count1++;
        }

      }
      else {
        if (string != "") {
          array1.unshift(string);
          array1.pop(string);
        }
      }
      string = "";
    }
  }
  if (count1 < 10) {
    if (string != "") {
      array1.unshift(string);
      count1++;
    }
  }
  else {
    if (string != "") {
      array1.unshift(string);
      array1.pop(string);
    }
  }
  console.log(array1);
  render1();
}

function addinterest() {
  string = "";
  var interest = document.getElementById("interest");
  for (var i = 0; i < interest.value.length; i++) {
    if (alphaReg.test(interest.value[i]) && interest.value[i] != "") {
      string += interest.value[i];
    }
    else {
      if (count2 < 10) {
        if (string != "") {
          array2.unshift(string);
          count2++;
        }
      }
      else {
        if (string != "") {
          array2.unshift(string);
          array2.pop(string);
        }
      }
      string = "";
    }
  }
  if (count2 < 10) {
    if (string != "") {
      array2.unshift(string);
      count2++;
    }
  }
  else {
    if (string != "") {
      array2.unshift(string);
      array2.pop(string);
    }
  }
  render2();
}

function del(id) {
  for (var i = 0; i < array1.length; i++) {
    if (i == id) {
      array1.splice(id,1);
      count1--;
    }
  }
  render1();
}

function render1() {
  var showtag = document.getElementById("showtag");
  showtag.innerHTML = "";
  for (var i = 0; i < array1.length; i++) {
    showtag.innerHTML += '<li id=\"' + i + '\" onclick = \"del(this.id)\" onmouseover = \"mouseover(this.id)\" onmouseout = \"mouseout(this.id)\">' + array1[i] + '</li>';
    document.getElementById(i).style.backgroundColor = "Blue";
    document.getElementById(i).style.color = "White";
    document.getElementById(i).style.display = "inline-block";
    document.getElementById(i).style.margin = "10px";
    document.getElementById(i).style.padding = "5px";
  }
}

function mouseover(id) {
  var sid = id.toString();
  document.getElementById(sid).style.backgroundColor = "Red";
  document.getElementById(sid).innerHTML = '<li id=\"' + id + '\" onclick = \"del(this.id)\" onmouseover = \"mouseover(this.id)\">点击删除 ' + array1[id] + '</li>';
}

function mouseout(id) {
  var sid = id.toString();
  document.getElementById(sid).style.backgroundColor = "Blue";
  document.getElementById(sid).innerHTML = '<li id=\"' + id + '\" onclick = \"del(this.id)\" onmouseover = \"mouseover(this.id)\">' + array1[id] + '</li>';
}

function render2() {
  var showinterest = document.getElementById("showinterest");
  showinterest.innerHTML = "";
  for (var i = 0; i < array2.length; i++) {
    showinterest.innerHTML += '<li id=\"interest' + i + '\">' + array2[i] + '</li>';
    var index = "interest" + i;
    document.getElementById(index).style.backgroundColor = "Green";
    document.getElementById(index).style.color = "White";
    document.getElementById(index).style.display = "inline-block";
    document.getElementById(index).style.margin = "10px";
    document.getElementById(index).style.padding = "5px";
  }
}
function init() {
  document.getElementById("tag").onchange = addtag;
  document.getElementById("submit").onclick = addinterest;
  //document.getElementsByTagName("li").onclick = del;
}
init();
