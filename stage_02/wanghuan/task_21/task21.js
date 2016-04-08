var btn1 = document.getElementById('addbutton1');
var btn2 = document.getElementById('addbutton2');
var btn3 = document.getElementById('delbutton1');
var btn4 = document.getElementById('delbutton2');
var btn5 = document.getElementById('selbutton');
var array = [];
var pattern = /\s+/;

function changeDiv() {
  var len = document.getElementById('divShow').children.length;
  for(var j = 0;j < len;j++) {
    document.getElementById('divShow').removeChild(document.getElementById('divShow').children[0]);
  }
  for(var i = 0;i < array.length;i++) {
    var divEvery = document.createElement("div");
    divEvery.innerHTML = array[i];
    divEvery.setAttribute("class","div");
    document.getElementById('divShow').appendChild(divEvery);
  }
}

function addLeft() {
  var textValue = document.getElementById('textvalue').value.trim();

  if((pattern.test(document.getElementById('textvalue').value)) == "") {
      alert("input can not be null");
      return;
  }
  //clear the input value
  document.getElementById('textvalue').value = "";
  var array1 = textValue.split(",");
  var k = 0;
  var flag = true;
  //,分隔划分
  for(var i = 0;i < array1.length;i++) {
    //空格换行等字符串划分
    var array2 = array1[i].split(/\s+/);
    for(var j = 0;j < array2.length;j++) {
      for(var k = 0;k < array.length;k++) {
        if(array[k] === array2[j]) {
          alert(array[k] + "exists");
          flag = false;
          break;
        }
        else {
          flag = true;
        }
      }
      if(flag === true) {
        array.splice(k++,0,array2[j]);
      }
    }
  }

  changeDiv();
}

function addRight() {
  var textValue = document.getElementById('textvalue').value.trim();
  if((pattern.test(document.getElementById('textvalue').value)) == "") {
      alert("input can not be null");
      return;
  }
  //clear the input value
  document.getElementById('textvalue').value = "";
  var array1 = textValue.split(",");
  var flag = true;
  //,分隔划分
  for(var i = 0;i < array1.length;i++) {
    //空格换行等字符串划分
    var array2 = array1[i].split(/\s+/);
    for(var j = 0;j < array2.length;j++) {
      for(var k = 0;k < array.length;k++) {
        if(array[k] === array2[j]) {
          alert(array[k] + " exists");
          flag = false;
          break;
        }
        else {
          flag = true;
        }
      }
      if(flag === true) {
        array.push(array2[j]);
      }
    }
  }
  changeDiv();

}

function delLeft() {

    var delEle = array.shift();
    alert("delete num :"+delEle);
    changeDiv();
}

function delRight() {
  var delEle = array.pop();
  alert("delete num :"+delEle);
  changeDiv();
}

function delDivHandle(target) {
 var content = target.innerHTML;
 for(var i = 0;i < array.length;i++) {
   if(content === array[i]) {
     array.splice(i,1);
   }
 }
 changeDiv();
}

function selVal() {
  var v = document.getElementById('selectValue').value.trim();
  document.getElementById('selectValue').value = "";
  changeDiv();
  for(var i = 0;i < document.getElementById('divShow').children.length;i++) {
    if(v === document.getElementById('divShow').children[i].innerHTML) {
      document.getElementById('divShow').children[i].style.color = "white";
    }
  }
}

function init() {
  btn1.onclick = addLeft;
  btn2.onclick = addRight;
  btn3.onclick = delLeft;
  btn4.onclick = delRight;
  btn5.onclick = selVal;

  var div1 = document.getElementById('divShow');
  div1.addEventListener("click", function(event) {
		if (event.target && event.target.nodeName === "DIV") {
 			delDivHandle(event.target);
 		}
 	})
}
init();
