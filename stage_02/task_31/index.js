var school=[
       ["北京大学","清华大学","中国人民大学"],
       ["武汉大学","华中科技大学"],
       ["上海交通大学","复旦大学","同济大学"]
     ];

function showandhide(){
  var chk = 0;
  var choice = document.getElementsByName("radiobutton");
  var form1 = document.getElementsByClassName("student")[0];
  var form2 = document.getElementsByClassName("graduate")[0];
  for (var i = 0; i < choice.length; i++) {
        if(choice[i].checked){
          chk = i;
          break;
        }
      }
  if (chk == 0) {//根据单选框的值选择显示表单
    form1.setAttribute("class","student show");
    form2.setAttribute("class","graduate hide");
  }
  else {
    form1.setAttribute("class","student hide");
    form2.setAttribute("class","graduate show");
  }
}

function getschool(){
   //获得城市下拉框的对象
   var sltProvince=document.getElementById("province").firstElementChild;
   //获得学校下拉框的对象
   var sltSchool=document.getElementById("school").firstElementChild;
   //得到对应城市的学校数组
   var provinceCity=school[sltProvince.selectedIndex - 1];

   //清空城市下拉框，仅留提示选项
   sltSchool.length=1;

   //将学校数组中的值填充到城市下拉框中
   if (sltProvince.selectedIndex!=0) {
     for (var i=0;i<provinceCity.length;i++) {
       sltSchool[i+1]=new Option(provinceCity[i],provinceCity[i]);
     }
   }
}
