var root=document.getElementById("root");
var queue=[];
//遍历函数
function travel(ro){
    if(ro!=null){
        queue.push(ro);
    }
    else return;
    var rof=ro.firstElementChild;
    rof=rof.nextElementSibling;
    var roc=ro.childElementCount;
    if(rof!=null){travel(rof);}
    for(i=1;i<=roc-2;i++){
        if(rof.nextElementSibling){travel(rof.nextElementSibling);rof=rof.nextElementSibling}
    }
}
//隐藏函数
function startcolor(){
    for(i=0;i<=queue.length-1;i++){
        queue[i].setAttribute("class","hide")
    }
    queue=[];
}
function startcolor2(){
    for(i=0;i<=queue.length-1;i++){
        queue[i].setAttribute("class","show")
    }
    queue=[];
}
//显示与隐藏函数
function showorhide(node){
    var nodechildnum=node.childElementCount;
    var nodechild=node.firstElementChild.nextElementSibling;
    if(nodechild){
      if(nodechild.getAttribute("class")=="hide"){
          for(j=1;j<=nodechildnum-1;j++){
              travel(nodechild);
              startcolor2();
              console.log(j);
              if(nodechild.nextElementSibling==null)break;
              if(nodechild.nextElementSibling.nodeName=="DIV")nodechild=nodechild.nextElementSibling;
          }
      }
      else{
          for(j=1;j<=nodechildnum-1;j++){
              travel(nodechild);
              startcolor();
              console.log(j);
              if(nodechild.nextElementSibling==null)break;
              if(nodechild.nextElementSibling.nodeName=="DIV")nodechild=nodechild.nextElementSibling;
          }
      }
    }

}
//点击事件
nowc=document.getElementById("hide");
root.addEventListener("click",function(e){
    if(e.target.nodeName!="SPAN"){
        nowc.firstElementChild.setAttribute("class","rec");
        nowc=e.target;
        showorhide(nowc);
        nowc.firstElementChild.setAttribute("class","del")
    }
    if(e.target.nodeName=="SPAN"){
        nowc.firstElementChild.setAttribute("class","rec");
        nowc=e.target.parentNode;
        showorhide(nowc);
        nowc.firstElementChild.setAttribute("class","del")
    }
})
//删除节点
function delnode(node){
    if(node.getAttribute("class")!="hide"){node.parentNode.removeChild(node);}
}
//展开函数
function unfold(node){
    if(node.parentNode.nodeName=="DIV"){
        node.parentNode.setAttribute("class","show");
        unfold(node.parentNode);
    }
}
//查找函数
var foundnode=document.getElementById("hide");//保存现在已经发现的节点
function find(){
    foundnode.setAttribute("class","rec");
    var fvalue=document.getElementById("search").value.trim();
    var spancollect=document.getElementsByTagName("span");
    for(i=0;i<=spancollect.length-1;i++){
        if(spancollect[i].innerText==fvalue){spancollect[i].setAttribute("class","found");foundnode=spancollect[i]}
    }
    unfold(foundnode);
}
//插入函数
function ins(){
    var ivalue=document.getElementById("append").value.trim();
    var insnode=document.createElement("div");
    insnode.innerHTML="<span>"+ivalue+"</span>";
    if(nowc.getAttribute("class")!="hide"){nowc.appendChild(insnode)}
}
