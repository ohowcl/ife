$(function(){
    var calender = new Calender();
    $("table thead tr td select").change(function(){
        console.log("执行change");
        calender.clear = 1;
        calender.date.setFullYear(parseInt($("table thead tr td .year").val()));
        calender.date.setMonth(parseInt($("table thead tr td .month").val())-1);
        console.log(calender.date);
        calender.current(calender.date);
    });

    calender.current();
});

/**
 * createCalender()创建日历
 * @param date{year,month,day}
 */
Calender.prototype.createCalender = function(date) {
    if(this.clear === 0) {
        this.createYear(date);
        this.createMonth(date);
    }
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
    console.log(weekDay);
    console.log(monthDays);
    console.log(weeks);
    /**
     * 用weeks遍历显示tbody，从row[1]--row[weeks](row[0]用来显示一--日)
     * row[1]:较特殊，需要控制1在第一格
     * row[2]-row[weeks]:最后一行注意显示到monthDays即可
     */
     if(this.clear === 1){
         this.deleteTable(tbody);
     }
     console.log("new");
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


};
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

function Calender(){
    console.log("执行构造函数");
    this.date = new Date();
    this.clear = 0;
}

Calender.prototype.current = function(){
    console.log("执行原型current");
    var today = {};
    today.year = this.date.getFullYear();
    today.month = this.date.getMonth() + 1;
    today.day = this.date.getDate();
    this.createCalender(today);
};
