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
  const max = chartData[pageState.nowSelectCity][pageState.nowGraTime + "Max"];
  const data = chartData[pageState.nowSelectCity][pageState.nowGraTime];
  const chart = document.getElementById("aqi-chart-wrap");
  chart.innerHTML = "";
  for (var item in data) {
      let element = document.createElement("div");
      let height = 400 * data[item] / max;
      element.style.height = height + "px";
      let colorIndex = Math.floor(400 * data[item] / (max * 20));
      let className = pageState.nowGraTime + "-item ";
      className += "color" + colorIndex;
      element.className = className;
      element.title = item + ": " + data[item];
      chart.appendChild(element);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (this.value == pageState.nowGraTime) {
      return;
  }
  // 设置对应数据
  pageState.nowGraTime = this.value;
  if (pageState.nowSelectCity == -1) {
      pageState.nowSelectCity = 0;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (this.selectedIndex == pageState.nowSelectCity) {
      return;
  } 
  // 设置对应数据
  pageState.nowSelectCity = this.selectedIndex;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    let radios = document.getElementsByName("gra-time");
    for (var i = 0; i < radios.length; i++) {
        radios[i].onchange = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  let select = document.getElementById("city-select");
  select.innerHTML = "";
  for (var city in aqiSourceData) {
      let option = document.createElement("option");
      option.textContent = city;
      select.appendChild(option);
  }
  select.onchange = citySelectChange;
}

/**
 * Procedure day for aqi chart
 */
function getAqiGraDay(aqiData, data) {
    data["day"] = {};
    let max = 0;
    for (var day in aqiData) {
        data["day"][day] = aqiData[day];
        max = aqiData[day] > max? aqiData[day] : max;
    }
    data["dayMax"] = max;
}

/**
 * Process week for aqi chart
 */
function getAqiGraWeek(aqiData, data) {
    data["week"] = {};
    let max = 0;
    let count = 0;
    let sum = 0;
    let number = 1;
    for (var day in aqiData) {
        let date = new Date(day);
        if (date.getDay() == 6) {
            count++;
            sum += aqiData[day];
            data["week"]["第" + number + "周"] = (sum / count).toFixed(1);
            max = sum / count > max? sum / count : max;
            count = 0;
            sum = 0;
            number++;
        } else {
            count++;
            sum += aqiData[day];
        }
    }
    if (count != 0) {
        sum += aqiData[day];
        data["第" + number + "周"] = (sum / count).toFixed(1);
        max = sum / count > max? sum / count : max;
    }
    data["weekMax"] = max;
}

/**
 * Process aqi month data
 */
function getAqiGraMonth(aqiData, data) {
    data["month"] = {};
    let dataCount = {};
    let sum = 0;
    max = 0;
    for (var day in aqiData) {
        const date = new Date(day);
        const key = date.getFullYear() + " " + date.getMonth() + "月";
        if (data["month"].hasOwnProperty(key)) {
            data["month"][key] = data["month"][key] * dataCount[key] + aqiData[day];
            dataCount[key]++;
            data["month"][key] = (data["month"][key] / dataCount[key]).toFixed(2);
        } else {
            data["month"][key] = aqiData[day];
            dataCount[key] = 1;
        }
    }
    for (var month in data["month"]) {
        max = data["month"][month] > max? data["month"][month] : max;
    }
    data["monthMax"] = max;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  let idx = 0;
  for (var city in aqiSourceData) {
      chartData[idx] = {};
      getAqiGraDay(aqiSourceData[city], chartData[idx]);
      getAqiGraWeek(aqiSourceData[city], chartData[idx]);
      getAqiGraMonth(aqiSourceData[city], chartData[idx]);
      idx++;
  }
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
