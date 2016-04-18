
    var queue = [], head, timer, nowc=document.getElementById("hiden");

    /*先序遍历*/
    function preOrder(node) {
      if (node) {
        queue.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.nextElementSibling);
      }
    }

    /*中序遍历*/
    function inOrder(node) {
      if (node) {
        inOrder(node.firstElementChild);
        queue.push(node);
        inOrder(node.nextElementSibling);
      }
    }

    /*后序遍历*/
    function postOrder(node) {
      if (node) {
        postOrder(node.firstElementChild);
        postOrder(node.nextElementSibling);
        queue.push(node);
      }
    }

    /*删除节点*/
    function delnode(node){
      if (node.getAttribute("class")!="hiden") {
        node.parentNode.removeChild(node);//隐藏节点不允许删除
        nowc=document.getElementById("hiden");
      }
      else {
        alert("请选择一个节点");
      }
    }

    /*添加节点*/
    function ins(node){
      var ivalue=document.getElementById("append").value.trim();
      var insnode=document.createElement("div");
      insnode.innerHTML=ivalue;
      if(node.getAttribute("class")!="hiden"){
        if (ivalue!="") {
          nowc.appendChild(insnode);
          nowc.setAttribute("class","");
          nowc=document.getElementById("hiden");
        }
        else {
          alert("节点内容不能为空");
        }
      }
      else {
        alert("请先选择节点");
      }
    }

    document.getElementById("root").addEventListener("click",function(e){
          console.log(e.target.nodeName);
          if(e.target.nodeName=="DIV"){      //div被选中
            nowc.setAttribute("class","");
            nowc=e.target;
            nowc.setAttribute("class","del");
          }
        })

    /*点击及遍历事件*/
    btn.onclick = function (e){
    				if (queue.length > 0) {
    					head.style.backgroundColor = "#fff";//初始化
    					showQueue = [];
    					clearTimeout(timer);
    				}
            //按钮事件绑定
            switch (e.target.id) {
            					case "pre" :
            					preOrder(document.getElementById("root"));
            					break;
            					case "in" :
            					inOrder(document.getElementById("root"));
            					break;
            					case "post" :
            					postOrder(document.getElementById("root"));
            					break;
                      case "submit" :
                      if (document.getElementById("search").value == "") {
                				alert("请输入搜索内容！");
                				return;
                			}
                			var value = document.getElementById("search").value;
                			preOrder(document.getElementById("root"));
                      break
                      case "delete" :
                      delnode(nowc);
                      break
                      case "add" :
                      ins(nowc);
                      break
            				}

    				show();//展示动画效果
    				function show() {
    					head = queue.shift();
    					if (head) {
    						head.style.backgroundColor = "Blue";
    						timer = setTimeout(function(){
    							head.style.backgroundColor = "White";
    							show();
    						}, 500);
                if (value) {
        					if (head.firstChild.nodeValue.trim() == value) {
        						queue = [];//遍历节点若节点值=搜索，则停止遍历
        						clearTimeout(timer);
        						return ;
        					}
        					if (queue.length == 0) {
        						alert("未搜索到内容！");
        					}
        				}
    					}
    				}

    			};
