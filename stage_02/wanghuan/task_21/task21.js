var btn1 = document.getElementById('addbutton1');
var div1 = document.getElementById('divShow');
var array = [];
var arrayTag = [];
var pattern = /\s+/;

function changeDiv(divshow) {
  //删除之前在页面上显示的div
  var len = divshow.children.length;
  for(var j = 0;j < len;j++) {
    divshow.removeChild(divshow.children[0]);
  }
  var len2 = array.length;
  if(array.length > 10){
    array = array.slice(len2-10);
  }
  //添加数组对应的所有div于页面上
  for(var i = 0;i < array.length;i++) {
    var divEvery = document.createElement("div");
    divEvery.innerHTML = array[i];
    divEvery.setAttribute("class","div");
    document.getElementById('divShow').appendChild(divEvery);
  }
}

function changeDiv2(divshow) {
  //删除之前在页面上显示的div
  var len = divshow.children.length;
  for(var j = 0;j < len;j++) {
    divshow.removeChild(divshow.children[0]);
  }
  var len2 = arrayTag.length;
  if(arrayTag.length > 10){
    arrayTag = arrayTag.slice(len2-10);
  }
  //添加数组对应的所有div于页面上
  for(var i = 0;i < arrayTag.length;i++) {
    var divEvery = document.createElement("div");
    divEvery.innerHTML = arrayTag[i];
    divEvery.setAttribute("class","div");
    document.getElementById('divShow1').appendChild(divEvery);
  }
}

function updateTag(e) {
  var str = this.value;
  var flag = true,
      k = 0;
  if(/(,| |\，)$/.test(str)||e.keyCode===13) {
    var newTag = str.match(/(^[^,\， ]*)/)[0];
    if(arrayTag.length === 0) {
      arrayTag.push(newTag);
    }else {
      for(var k = 0;k < arrayTag.length;k++) {
        //验证是否有重复值
        if(arrayTag[k] === newTag) {
          alert(arrayTag[k] + "exists");
          flag = false;
          break;
        }
        else {
          flag = true;
        }
      }
      if(flag === true) {
        arrayTag.splice(k++,0,newTag);
      }
    }
  }
  changeDiv2(document.getElementById('divShow1'));
}

function addLeft(text) {
  var textValue = text.value.trim();
  if((text.value) == "") {
      alert("input can not be null");
      return;
  }
  //clear the input value
  text.value = "";
  var array1 = textValue.split(",");
  var k = 0;
  var flag = true;
  //,分隔划分
  for(var i = 0;i < array1.length;i++) {
    //空格换行等字符串划分
    var array2 = array1[i].split(/\s+/);
    for(var j = 0;j < array2.length;j++) {
      for(var k = 0;k < array.length;k++) {
        //验证是否有重复值
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

  changeDiv(document.getElementById('divShow'));
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
  // add interests btn event
  btn1.addEventListener("click",function(event) {

    if(event.target && event.target.previousSibling.nodeName === "#text") {
      addLeft(document.getElementById('textvalue'));
    }
  })

  div1.addEventListener("click", function(event) {
		if (event.target && event.target.nodeName === "DIV") {
 			delDivHandle(event.target);
 		}
 	})

  var tagT = document.getElementById('tagText');
  tagT.onkeyup = updateTag;
}
init();
