var array = [], delelement;
var input = document.getElementById("inputnum");
//左侧入
function leftin() {
  var value = input.value;
  array.unshift(value);
  render();
}

//左侧出
function leftout() {
  if (array.length != 0) {
    delelement = array.shift();
    alert("左侧删除的元素是：" + delelement);
  }
  render();
}

//右侧入
function rightin() {
  var value = input.value;
  array.push(value);
  render();
}

//右侧出
function rightout() {
  if (array.length != 0) {
    delelement = array.pop();
    alert("右侧删除的元素是：" + delelement);
  }
  render();
}

//删除选中
function del(id){
  for (var i = 0; i < array.length; i++) {
    if (i == id) {
      array.splice(id,1);
    }
  }
  render();
}

//渲染
function render() {
  document.getElementById("showqueue").innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    document.getElementById("showqueue").innerHTML += '<li id=\"' + i + '\" onclick = \"del(this.id)\">' + array[i] + '</li>';
    document.getElementById(i).style.backgroundColor = "Red";
    document.getElementById(i).style.color = "White";
    document.getElementById(i).style.display = "inline-block";
    document.getElementById(i).style.margin = "5px";
    document.getElementById(i).style.padding = "5px";
  }
}
function init() {
  document.getElementById("lfti").onclick = leftin;
  document.getElementById("lfto").onclick = leftout;
  document.getElementById("rgti").onclick = rightin;
  document.getElementById("rgto").onclick = rightout;
  //document.getElementsByTagName("li").onclick = del;
}
init();
