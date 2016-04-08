var btn1 = document.getElementById('addbutton1');
var btn2 = document.getElementById('addbutton2');
var btn3 = document.getElementById('delbutton1');
var btn4 = document.getElementById('delbutton2');
var btn5 = document.getElementById('sortbutton');
var btn6 = document.getElementById('randombutton');
var array = [];
var pattern1 = /[0-9]{1,}/;

function changeDiv() {
  var len = document.getElementById('divShow').children.length;
  for(var j = 0;j < len;j++) {
    document.getElementById('divShow').removeChild(document.getElementById('divShow').children[0]);
  }
  var str = "";
  for(var i = 0;i < array.length;i++) {
    var divEvery = document.createElement("div");
    divEvery.className = "div";
    divEvery.style.width = "20px";
    divEvery.style.height = array[i] + 'px';
    var leftValue = i*22;
    divEvery.style.left = leftValue + 'px';
    document.getElementById('divShow').appendChild(divEvery);
  }
}

function addLeft() {
  var textValue = document.getElementById('textvalue').value.trim();

  //clear the input value
  document.getElementById('textvalue').value = "";
  if(pattern1.test(textValue) === false || parseInt(textValue) > 100) {
    alert("input should be a number between 10-100");
    return;
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

function sortChart(){
  var i = array.length,
      temp,
      j;
  while(i > 0) {
    for(j = 0;j < i-1;j++) {
      if(array[j] > array[j+1]) {
        temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
        changeDiv();
      }
    }
    i--;
  }
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

function randomList() {

  //generate a random num between 10-100
  for(var i = 0;i < 60;i++){
    array[i] = Math.floor(Math.random() * 91 + 10);
  }
  changeDiv();
}

function init() {
  btn1.onclick = addLeft;
  btn2.onclick = addRight;
  btn3.onclick = delLeft;
  btn4.onclick = delRight;
  btn5.onclick = sortChart;
  btn6.onclick = randomList;

  var div1 = document.getElementById('divShow');
  div1.addEventListener("click", function(event) {
		if (event.target && event.target.nodeName === "DIV") {
 			delDivHandle(event.target);
 		}
 	})
}
init();
