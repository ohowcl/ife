var arr = [], array = [], delelement;
var input = document.getElementById("inputnum");
var a = 0;
//左侧入
function leftin() {
  if (array.length <= 60) {
    var value = input.value;
    if (value >= 10 && value <= 100) {
      array.unshift(value);
      arr.unshift(value);
      render();
    }
    else {
      alert("输入的数字必须在10-100！");
    }
  }
  else {
    alert("超过60个元素！");
  }
}

//左侧出
function leftout() {
  if (array.length != 0) {
    delelement = array.shift();
    arr.shift();
    render();
    alert("左侧删除的元素是：" + delelement);
  }
}

//右侧入
function rightin() {
  if (array.length <= 60) {
    var value = input.value;
    if (value >= 10 && value <= 100) {
      array.push(value);
      arr.push(value);
      render();
    }
    else {
      alert("输入的数字必须在10-100！");
    }
  }
  else {
    alert("超过60个元素！");
  }
}

//右侧出
function rightout() {
  if (array.length != 0) {
    delelement = array.pop();
    arr.pop();
    render();
    alert("右侧删除的元素是：" + delelement);
  }
}

//删除选中
function del(id) {
  for (var i = 0; i < array.length; i++) {
    if (i == id) {
      array.splice(id,1);
      arr.splice(id,1);
    }
  }
  render();
}

//排序
function asc() {
  if (a % 3 == 0) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i; j < array.length; j++) {
        if (array[i] > array[j]) {
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
  }
  else if(a % 3 == 1) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i; j < array.length; j++) {
        if (array[i] < array[j]) {
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
  }
  else {
    for (var i = 0; i < array.length; i++)
      array[i] = arr[i];
  }
  a++;
  render();
}

//渲染
function render() {
  document.getElementById("showqueue").innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    document.getElementById("showqueue").innerHTML += '<li id=\"' + i + '\" onclick = \"del(this.id)\"></li>';
    document.getElementById(i).style.backgroundColor = "Red";
    document.getElementById(i).style.color = "White";
    document.getElementById(i).style.display = "inline-block";
    document.getElementById(i).style.margin = "2px";
    document.getElementById(i).style.padding = "5px";
    document.getElementById(i).style.height = array[i] + "px";
    document.getElementById(i).style.width = "5px";
  }
}
function init() {
  document.getElementById("lfti").onclick = leftin;
  document.getElementById("lfto").onclick = leftout;
  document.getElementById("rgti").onclick = rightin;
  document.getElementById("rgto").onclick = rightout;
  document.getElementById("asc").onclick = asc;
  //document.getElementsByTagName("li").onclick = del;
}
init();
