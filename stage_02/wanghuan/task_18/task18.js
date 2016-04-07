var btn1 = document.getElementById('addbutton1');
var btn2 = document.getElementById('addbutton2');
var btn3 = document.getElementById('delbutton1');
var btn4 = document.getElementById('delbutton2');
var array = [];
var pattern1 = /[0-9]{1,}/;

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

  //clear the input value
  document.getElementById('textvalue').value = "";
  if(pattern1.test(textValue) === false) {
    alert("input should be a number");
  }else{
    array.unshift(textValue);
  }
  changeDiv();
}

function addRight() {
  var textValue = document.getElementById('textvalue').value.trim();

  //clear the input value
  document.getElementById('textvalue').value = "";
  if(pattern1.test(textValue) === false) {
    alert("input should be a number");
  }else{
    array.push(textValue);
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

function init() {
  btn1.onclick = addLeft;
  btn2.onclick = addRight;
  btn3.onclick = delLeft;
  btn4.onclick = delRight;

  var div1 = document.getElementById('divShow');
  div1.addEventListener("click", function(event) {
		if (event.target && event.target.nodeName === "DIV") {
 			delDivHandle(event.target);
 		}
 	})
}
init();
