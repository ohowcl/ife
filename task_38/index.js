var datas = [
  {
  	name: '小明',
  	chinese: 80,
  	math: 90,
  	english: 70,
  	total: 240
  },
  {
  	name: '小红',
  	chinese: 90,
  	math: 60,
  	english: 90,
  	total: 240
  },
  {
  	name: '小亮',
  	chinese: 60,
  	math: 100,
  	english: 70,
  	total: 230
  }
];
function creatTable() {
  table = document.getElementsByTagName("table")[0];

  if (table.childNodes.length > 2) {
    for (var i = 0; i < table.childNodes.length; i++) {
      table.removeChild(table.childNodes[2]);
    }
  }

  for (var i = 0; i < datas.length; i++) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML=datas[i].name;
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    td2.innerHTML=datas[i].chinese;
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    td3.innerHTML=datas[i].math;
    tr.appendChild(td3);
    var td4 = document.createElement("td");
    td4.innerHTML=datas[i].english;
    tr.appendChild(td4);
    var td5 = document.createElement("td");
    td5.innerHTML=datas[i].total;
    tr.appendChild(td5);
    table.appendChild(tr);
  }
}
function asc(id) {
  if (id == "Chinese") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].chinese > datas[j].chinese) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "Math") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].math > datas[j].math) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "English") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].english > datas[j].english) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "Total") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].total > datas[j].total) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  creatTable();
}
function des(id) {
  if (id == "Chinese") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].chinese < datas[j].chinese) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "Math") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].math < datas[j].math) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "English") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].english < datas[j].english) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  else if (id == "Total") {
    for (var i = 0; i < datas.length; i++) {
      for (var j = i+1; j < datas.length; j++) {
        if(datas[i].total < datas[j].total) {
          var temp = datas[i];
          datas[i] = datas[j];
          datas[j] = temp;
        }
      }
    }
  }
  creatTable();
}
function init() {
  // for (var i = 0; i < 4; i++) {
  //   var parent = document.getElementsByClassName("asc")[i].parentNode
  //   console.log(parent.id);
  //   document.getElementsByClassName("asc")[i].onclick=function(){asc(parent.id)};
  //   document.getElementsByClassName("des")[i].onclick=function(){des(parent.id)};
  // }
  document.getElementsByClassName("asc")[0].onclick=function(){asc("Chinese")};
  document.getElementsByClassName("des")[0].onclick=function(){des("Chinese")};
  document.getElementsByClassName("asc")[1].onclick=function(){asc("Math")};
  document.getElementsByClassName("des")[1].onclick=function(){des("Math")};
  document.getElementsByClassName("asc")[2].onclick=function(){asc("English")};
  document.getElementsByClassName("des")[2].onclick=function(){des("English")};
  document.getElementsByClassName("asc")[3].onclick=function(){asc("Total")};
  document.getElementsByClassName("des")[3].onclick=function(){des("Total")};
  creatTable();
}

init();
