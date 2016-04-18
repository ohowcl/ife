
    var queue = [], head, timer;

//先序遍历
    function preOrder(node) {
      if (node) {
        queue.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.nextElementSibling);
      }
    }

//中序遍历
    function inOrder(node) {
      if (node) {
        inOrder(node.firstElementChild);
        queue.push(node);
        inOrder(node.nextElementSibling);
      }
    }

//后序遍历
    function postOrder(node) {
      if (node) {
        postOrder(node.firstElementChild);
        postOrder(node.nextElementSibling);
        queue.push(node);
      }
    }

//绑定点击事件
    btn.onclick = function (e){
    				if (queue.length > 0) {
    					head.style.backgroundColor = "#fff";
    					showQueue = [];
    					clearTimeout(timer);//重置动画
    				}

            //按钮绑定
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
            				}

    				show();
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
        						queue = [];//如果遍历到节点值=搜索值停止遍历
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
