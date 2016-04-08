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

  if((document.getElementById('textvalue').value) == "") {
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

function delDivHandle(target) {
 var content = target.innerHTML;
 for(var i = 0;i < array.length;i++) {
   if(content === array[i]) {
     array.splice(i,1);
   }
 }
 changeDiv();
}


function init() {
  btn1.onclick = addLeft;

  var div1 = document.getElementById('divShow');
  div1.addEventListener("click", function(event) {
		if (event.target && event.target.nodeName === "DIV") {
 			delDivHandle(event.target);
 		}
 	})
}
init();
