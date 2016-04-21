var btn = document.getElementsByName("execute")[0];
btn.onclick = execute;
var direc = 0;//定义小方块当前朝向哪个方向，0向上，1向左，2向下，3向右
var curleft = "228px";//定义当前位置
var curtop = "228px";
var curdeg = "0deg";
function execute() {
  var block = document.getElementById("block");
  var order = document.getElementsByName("command")[0].value;
  // console.log(order);
  // console.log(direc);
  // console.log(block);
  // console.log(block.style.cssText);
  switch (order) {
    case "GO"://向蓝色边所面向的方向前进一格
      if (direc == 0 && parseInt(curtop)>28) {
        curtop = parseInt(curtop) - parseInt("40px") + "px";
        block.style.top = curtop;
      }
      else if (direc == 2 && parseInt(curtop)<368) {
        curtop = parseInt(curtop) + parseInt("40px") + "px";
        block.style.top = curtop;
      }
      else if (direc == 3 && parseInt(curleft)<368) {
        curleft = parseInt(curleft) + parseInt("40px") + "px";
        block.style.left = curleft;
      }
      else if (direc == 1 && parseInt(curleft)>28) {
        curleft = parseInt(curleft) - parseInt("40px") + "px";
        block.style.left = curleft;
      }
      break;
    case "TUN LEF"://向左转
      curdeg = (parseInt(curdeg) - parseInt("90deg")) + "deg";
      block.style.transform="rotate("+curdeg+")";
      direc++;
      direc=direc%4;
      break;
    case "TUN RIG"://向右转
      curdeg = (parseInt(curdeg) + parseInt("90deg")) + "deg";
      block.style.transform="rotate("+curdeg+")";
      direc--;
      direc=direc%4;
      break;
    case "TUN BAC"://向后转
      curdeg = (parseInt(curdeg) + parseInt("180deg")) + "deg";
      block.style.transform="rotate("+curdeg+")";
      direc=direc+2;
      direc=direc%4;
      break;
    default:
  }
}
