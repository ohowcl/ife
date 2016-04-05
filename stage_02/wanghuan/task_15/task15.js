

/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
  var len = document.getElementById('source').childNodes.length,
      arr = document.getElementById('source').childNodes,
      i,
      j = 0,
      data = [];

  for(i = 0;i < len;i++) {
    if(arr[i].nodeType == 1) {
      data[j] = [];
      data[j][0] = arr[i].firstChild.substringData(0,2);
      data[j][1] = arr[i].lastChild.innerHTML;
      // alert(data[j][0]);
      // alert(data[j][1]);
      j++;
    }
  }

  return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {

  function compare(a,b) {
    return b[1] - a[1];
  }

  data.sort(compare);
  return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var ulNode = document.getElementById('resort'),
      j = 0;
  for(var i = 0;i < data.length;i++) {
    var liNode = document.createElement("li");
    var bNode = document.createElement("b");
    liNode.innerHTML = "第" + (++j) +"名:" + data[i][0] + "空气质量:";
    bNode.innerHTML =  data[i][1];
    liNode.appendChild(bNode);
    ulNode.appendChild(liNode);
  }
}


function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  document.getElementById('sort-btn').onclick = btnHandle;
}

init();
