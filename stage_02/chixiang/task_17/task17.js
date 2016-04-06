/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart = document.getElementById("chart");
  var count = 0;
  chart.innerHTML = "";
  for(city in chartData) {
    if(count == pageState.nowSelectCity) {
      var poldata = chartData[city];
      console.log(poldata);
    }
    count++;
  }
  if (pageState.nowSelectCity != -1 && pageState.nowGraTime == "day") {
    for(date in poldata) {
      var li = document.createElement("li");
      li.setAttribute("title", date + ":污染指数:" + poldata[date]);
      li.style.height = poldata[date];
      li.style.width = "10px";
      if (poldata[date] >= 200) {
        li.style.backgroundColor = "Black";
      }
      else if (poldata[date] >= 150) {
        li.style.backgroundColor = "BlueViolet";
      }
      else if (poldata[date] >= 100) {
        li.style.backgroundColor = "Red";
      }
      else if (poldata[date] >= 50) {
        li.style.backgroundColor = "Blue";
      }
      else {
        li.style.backgroundColor = "Green";
      }
      document.getElementById("chart").appendChild(li);
    }
  }
  else if (pageState.nowSelectCity != -1 && pageState.nowGraTime == "week") {
    for(var i = 0; i < 14; i++) {
      var average = 0;
      if (i == 0) {
        var j = 1;
        for(date in poldata) {
          if (j <= 3) average = average + poldata[date];
          j++;
        }
        average = average/3;
      }
      else if (i == 13) {
        var j = 1;
        for(date in poldata) {
          if (j >= 88) average = average + poldata[date];
          j++;
        }
        average = average/4;
      }
      else {
        var j = 1;
        for(date in poldata) {
          if (j >= i*7 + 4 && j < (i+1)*7 + 4) average = average + poldata[date];
          j++;
        }
        average = average/7;
      }
      var li = document.createElement("li");
      li.setAttribute("title", "第" + (i+1) + "周:平均污染指数:" + parseInt(average));
      li.style.height = average;
      li.style.width = "30px";
      if (average >= 200) {
        li.style.backgroundColor = "Black";
      }
      else if (average >= 150) {
        li.style.backgroundColor = "BlueViolet";
      }
      else if (average >= 100) {
        li.style.backgroundColor = "Red";
      }
      else if (average >= 50) {
        li.style.backgroundColor = "Blue";
      }
      else {
        li.style.backgroundColor = "Green";
      }
      document.getElementById("chart").appendChild(li);
    }
  }
  else if (pageState.nowSelectCity != -1 && pageState.nowGraTime == "month") {
    for(var i = 0; i < 3; i++) {
      var average = 0;
      if (i == 0) {
        var j = 1;
        for(date in poldata) {
          if (j <= 31) average = average + poldata[date];
          j++;
        }
        average = average/31;
      }
      else if (i == 1) {
        var j = 1;
        for(date in poldata) {
          if (j > 31 && j < 61) average = average + poldata[date];
          j++;
        }
        average = average/29;
      }
      else {
        var j = 1;
        for(date in poldata) {
          if (j > 60) average = average + poldata[date];
          j++;
        }
        average = average/31;
      }
      var li = document.createElement("li");
      li.setAttribute("title", "第" + (i+1) + "月:平均污染指数:" + parseInt(average));
      li.style.height = average;
      li.style.width = "60px";
      if (average >= 200) {
        li.style.backgroundColor = "Black";
      }
      else if (average >= 150) {
        li.style.backgroundColor = "BlueViolet";
      }
      else if (average >= 100) {
        li.style.backgroundColor = "Red";
      }
      else if (average >= 50) {
        li.style.backgroundColor = "Blue";
      }
      else {
        li.style.backgroundColor = "Green";
      }
      document.getElementById("chart").appendChild(li);
    }
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var radios = document.getElementsByName("gra-time");
  for(radio in radios) {
    if(radios[radio].checked) {
      pageState.nowGraTime = radios[radio].value;
      console.log(pageState);
      break;
    }
  }
  // 设置对应数据
  renderChart();
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var select = document.getElementById("city-select").selectedIndex-1;
  if(select != pageState.nowSelectCity) {
    pageState.nowSelectCity = select;
    console.log(pageState);
  }
  // 设置对应数据
  renderChart();
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var labs = document.getElementsByTagName("label");
  for(lab in labs) {
    labs[lab].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var sel = document.getElementById("city-select");
  var options = "<option>请选择一个城市</option>";
  for(city in aqiSourceData) {
    options += "<option>"+city+"</option>";
  }
  sel.innerHTML = options;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  sel.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(city in aqiSourceData) {
    chartData[city] = aqiSourceData[city];
  }
  console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
