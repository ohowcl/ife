/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    let city = document.getElementById("aqi-city-input").value.trim();
    let value = document.getElementById("aqi-value-input").value.trim();
    let regex = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    if (regex.test(city)) {
        if (Number.isInteger(Number(value))) {
            aqiData[city] = value;
            renderAqiList();
        } else {
            alert("空气质量只能为整数!");
        }
    } else {
        alert("城市名只能为中文或英文!");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let table = document.getElementById("aqi-table");
    table.innerHTML = "";
    
    // add title
    let title = document.createElement("tr");
    title.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    table.appendChild(title);

    for (var city in aqiData) {
        // add a row
        let element = document.createElement("tr");
        let html = "<td>" + city + "</td>";
        html += "<td>" + aqiData[city] + "</td>";
        element.innerHTML = html;

        // add a button and bind event
        let buttonWrap = document.createElement("td");
        let button = document.createElement("button");
        button.textContent = "删除";
        button.onclick = delBtnHandle;
        buttonWrap.appendChild(button);
        element.appendChild(buttonWrap);

        table.appendChild(element);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  let row = this.parentNode.parentNode;
  delete aqiData[row.firstChild.textContent];
  renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    let addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
}

init();

