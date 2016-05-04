$(function(){
    // 构造函数的实例
    var calender = new Calender();
    $("table thead tr td select").change(function(){
        // 选择新的日期时，将构造函数的date也做出相应的干煸
        calender.clear = 1;
        calender.date.setFullYear(parseInt($("table thead tr td .year").val()));
        calender.date.setMonth(parseInt($("table thead tr td .month").val())-1);
        calender.current(calender.date);
    });
    calender.current();
    $("input").click(function() {
      var state = $("#calander").attr("class");
      if (state == "hide") {
        $("#calander").removeClass().addClass("show");
      }
      else {
        $("#calander").removeClass().addClass("hide");
      }
    });
});

/**
 * createCalender()创建日历
 * @param date{year,month,day}
 */
Calender.prototype.createCalender = function(date) {
    // 只有第一次加载日历的时候添加两个select
    if(this.clear === 0) {
        this.createYear(date);
        this.createMonth(date);
    }
    // 更新table中tbody的内容
    this.createTable(date);
};

/**
 * createYear()创建日历年份
 * 年份下拉框的展示
 * @param date{year,month,day}
 */
Calender.prototype.createYear = function(date){
    var i;
    for(i = 1980;i < 2020;i++) {
        if(date.year === i) {
            var $options = $("<option>"+i+"年</option>");
            $options.attr("selected",true);
            $("table thead tr td .year").append($options);
        } else{
            var $optionsElse = $("<option>"+i+"年</option>");
            $("table thead tr td .year").append($optionsElse);
        }
    }
};

/**
 * createMonth()创建日历年份
 * 月份下拉框的展示
 * @param date{year,month,day}
 */
Calender.prototype.createMonth = function(date){
    var i;
    for(i = 1;i < 13;i++) {
        if(date.month === i) {
            var $options = $("<option>"+i+"月</option>");
            $options.attr("selected",true);
            $("table thead tr td .month").append($options);
        } else{
            var $optionsElse = $("<option>"+i+"月</option>");
            $("table thead tr td .month").append($optionsElse);
        }
    }
};
/**
 * createTable()创建日历内容部分
 * 当月日期tbody的展示
 * @param date{year,month,day}
 */
Calender.prototype.createTable = function(date){
    /**
     * weekDay：date第一天对应星期几
     * monthDays：date当月份的天数
     * weeks：当月需要几行来显示
     * day：用来遍历显示monthDays
     */
    var weekDay = this.getFirstDay(date),
        monthDays = this.calMonthDay(date),
        weeks = Math.ceil((weekDay + monthDays - 1)/7),
        tbody = document.getElementsByTagName('tbody')[0],
        day = 1,
        i,
        j;

    // 选择其他日期时删除以前table
     if(this.clear === 1){
         this.deleteTable(tbody);
     }
     /**
      * 用weeks遍历显示tbody，从row[1]--row[weeks](row[0]用来显示一--日)
      * row[1]:较特殊，需要控制1在第一格
      * row[2]-row[weeks]:最后一行注意显示到monthDays即可
      */
    for(i = 1;i <= weeks;i++) {
        if(i === 1){
            tbody.insertRow(i);
            tbody.rows[1].setAttribute("class","tr");
            for(j = 0;j < weekDay-1;j++){
                tbody.rows[1].insertCell(j);
                tbody.rows[1].cells[j].setAttribute("class","td");
            }
            for(;j < 7;j++){
                tbody.rows[1].insertCell(j);
                tbody.rows[1].cells[j].innerHTML = day++;
                tbody.rows[1].cells[j].setAttribute("class","td");
            }
        } else {
            tbody.insertRow(i);
            tbody.rows[i].setAttribute("class","tr");
            for(j = 0;j < 7;j++){
                tbody.rows[i].insertCell(j);
                if(day <= monthDays){
                    tbody.rows[i].cells[j].innerHTML = day++;
                }
                tbody.rows[i].cells[j].setAttribute("class","td");
            }
        }
    }

    var that = this;

    //日期选择 并显示到input框内
    $("tbody > tr > td").click(function(){
      var num = /^\d+$/g;
      var choosedate = $(this).text();
      if (!(num.test(choosedate) && choosedate != "")) {
          return;
      }
      that.select = 1 - that.select;
      if (that.select == 1) {
          this.classList.add("select-range");
      } else {
          var state = 0;
          var tds = $("tr > td");
          var chooseyear = $("select option:selected").text();
          var re = "";
          for (var i = 0; i < tds.length; i++) {
              if (tds[i].classList.contains("select-range") || 
                  tds[i] == this) {
                  var reg = /^\d+$/g;
                  choosedate = $(tds[i]).text();
                  if (reg.test(choosedate) && choosedate != "") {
                      state++;
                      if (re != "") {
                          re += " ";
                      }
                      re += chooseyear + choosedate;
                  }
              }
          }
          if (state == 2) {
              $("input").val(re.replace(/[\u4e00-\u9fa5]/gi,"-"));
              $("#calander").removeClass().addClass("hide");
              $(".select-range").removeClass("select-range");
              $(".select-range-hover").removeClass("select-range-hover");
          } else {
              that.select = 1;
          }
      }
    });

    //hover事件
    $("tbody > tr > td").hover(function(){
      if (that.select == 1) {
          var trs = $("tr");
          var state = 0;
          for (var i = 2; i < trs.length; i++) {
              var children = $(trs[i]).find(">td");
              for (var j = 0; j < children.length; j++) {
                  // 搜寻起始点
                  if (children[j].classList.contains("select-range") || 
                      children[j] == this) {
                      state = 1 - state;
                      if (children[j] == this) {
                          children[j].classList.add("select-range-hover");
                      }
                  }
                  if (state == 1) {
                      // 添加被选样式
                      children[j].classList.add("select-range-hover");
                  } else {
                      // 移除非被选区的样式
                      if (children[j] != this) {
                          children[j].classList.remove("select-range-hover");
                      }
                  }
              }
          }
      } else { 
          var num = /^\d+$/g;
          var choosedate = $(this).text();
          if (num.test(choosedate) && choosedate != "") {
              $(this).css("box-sizing", "border-box");
              $(this).css("border", "1px solid green");
          }
      }
    },function(){
      $(this).css("border", "0px");
    });
};

/**
 * 删除表格中显示日期的部分
 * @param tbody
*/
Calender.prototype.deleteTable = function(tbody){
    console.log("delete");
    var len = tbody.children.length,
        i;
    for(i = 1;i < len;i++){
        console.log(len);
        console.log(i);
        tbody.removeChild(tbody.children[1]);
    }
};

/**
 * 得到所选月第一天对应星期几
 * @param date{year,month,day}
*/
Calender.prototype.getFirstDay = function(date){
    var dateThisMonth = new Date(date.year,date.month - 1,1),
        weekDay = dateThisMonth.getDay();
    return weekDay;
};

/**
 * 得到所选月第一天对应星期几
 * 参数-date：所选日期
*/
Calender.prototype.calMonthDay = function(date){
    var monthDays;
    switch (date.month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            monthDays = 31;
            break;
        // 考虑闰年
        case 2:
            if((date.year % 4 === 0 && date.year % 100 !== 0) || (date.year % 400 === 0)) {
                monthDays = 29;
            } else {
                monthDays = 28;
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            monthDays = 30;
            break;
        default:
    }
    return monthDays;
};

/**
 * 构造函数Calender
 * date为当前日期
 * clear用于控制是否为初次加载和选择
 * select用于控制选取
*/
function Calender(){
    this.date = new Date();
    this.clear = 0;
    this.select = 0;
}

/**
 * 得到所选月第一天对应星期几
 * 参数-date：所选日期
*/
Calender.prototype.current = function(){
    console.log("执行原型current");
    var today = {};
    today.year = this.date.getFullYear();
    today.month = this.date.getMonth() + 1;
    today.day = this.date.getDate();
    this.createCalender(today);
};
