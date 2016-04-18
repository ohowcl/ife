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
var form = document.getElementById('form-gra-time');
var radios = form.elements["gra-time"];
var citys = document.getElementById('city-select');
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
  var str="";
  for(var i in chartData){
    str+="<div class='box "+pageState.nowGraTime+"'>";
    str+="<div class='histogram' style='height:"+chartData[i]+"px;background-color:"+getRandomColor()+"' title='"+i+":"+chartData[i]+"'></div>";
    str+="</div>";
  };
  document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML=str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var radionow = getChecked();

  function getChecked() {
    for(var i = 0;i < radios.length;i++) {
      if(radios[i].checked) {
        return radios[i].value;
      }
    }
  }

  if(radionow == pageState.nowGraTime) {
    return;
  }else {
    //改变表单中的时间粒度
    pageState.nowGraTime = radionow;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var citynow = citys.value;
  if(citynow == pageState.nowSelectCity) {
    return;
  }else {
    //改变表单中被选择的城市
    pageState.nowSelectCity = citynow;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  for(var i = 0;i < radios.length;i++) {
    radios[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // reason？？？？
  var str="";
  for(var i in aqiSourceData) {
    // str="<option value=i>"+i+"</option>";
    str+="<option value='"+i+"'>"+i+"</option>";
  }
  citys.innerHTML = str;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citys.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city = citys.value;
  switch(pageState.nowGraTime) {
    case "day":
      chartData = aqiSourceData[city];
      break;
    case "week":
      var daycount = 0,
          total = 0,
          week = 1,
          date,
          weekDay;
      for(var i in aqiSourceData[city]) {
        date = new Date(i);
        weekDay = date.getDay();
        if(weekDay === 6) {
          daycount++;
          total+=aqiSourceData[city][i];
          chartData["week" + week] = Math.round(total/daycount);
          daycount = 0;
          total = 0;
          week++;
        }else{
          daycount++;
          total+=aqiSourceData[city][i];
        }
      }
      chartData["week"+week] = Math.round(total/daycount);
      break;
    case "month":
      var daycount = 0,
          total = 0,
          month = -1,
          date;
      for(var i in aqiSourceData[city]) {
        date = new Date(i);
        if(month == -1) {
          month = date.getMonth() + 1;
        }else if(date.getMonth()+1!=month) {
          chartData[month+"月"] = Math.round(total/daycount);
          month = date.getMonth() + 1;
          daycount = 0;
          total = 0;
        }
        daycount++;
        total+=aqiSourceData[city][i];
      }
      chartData[month+"月"] = Math.round(total/daycount);
      break;
  }

  console.log(JSON.stringify(chartData));
  renderChart();
}
function getRandomColor(){
  return '#' + (function(h){
    return new Array(7 - h.length).join("0") + h
  } )((Math.random() * 0x1000000 << 0).toString(16)) 
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
