var queue = [], head, timer;

//先序遍历
function preOrder(node) {
  if (node) {
    queue.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}

//中序遍历
function inOrder(node) {
  if (node) {
    inOrder(node.firstElementChild);
    queue.push(node);
    inOrder(node.lastElementChild);
  }
}

//后序遍历
function postOrder(node) {
  if (node) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    queue.push(node);
  }
}

btn.onclick = function (e){
        if (queue.length > 0) {
          head.style.backgroundColor = "#fff";
          showQueue = [];
          clearTimeout(timer);
        }

        //绑定点击事件
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
                }

        show();

        //动画效果
        function show() {
          head = queue.shift();
          if (head) {
            head.style.backgroundColor = "Blue";//将背景变为栏删
            timer = setTimeout(function(){
              head.style.backgroundColor = "White";
              show();
            }, 500);//500ms后将背景变回白色
          }
        }

      };
