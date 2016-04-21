defButton();
function defButton() {
	var tree = new Tree(),
			root = document.getElementsByClassName("root")[0],
			preButton = document.getElementById('before'),
			postButton = document.getElementById('behind'),
			preSearchButton = document.getElementById('befSearch'),
			postSearchButton = document.getElementById('behSearch'),
			delButton = document.getElementById('delete'),
			addButton = document.getElementById('add'),
			targetArray = [];

	preButton.addEventListener("click",function(){
		tree.preOrder(root);
		tree.animation();
	});

	postButton.addEventListener("click",function(){
		tree.postOrder(root);
		tree.animation();
	});

	preSearchButton.addEventListener("click",function(){
		tree.preOrder(root);
		var preValue = document.getElementById('text1').value,
				len = tree.nodes.length,
				flag = 1;
		for(var i = 0;i < len;i++) {
			if(preValue == tree.nodes[i].firstChild.innerHTML) {
				tree.nodes.splice(i+1,len-i-1);
				flag = 0;
				break;
			}
		}
		tree.animation();
		if(flag === 0) {
			alert("find the content which you input,look the process please");
		}else {
			alert("there are not the content which you input,look the process please");
		}
	});

	postSearchButton.addEventListener("click",function(){
		tree.postOrder(root);
		var postValue = document.getElementById('text2').value,
				len = tree.nodes.length,
				flag = 1;
		for(var i = 0;i < len;i++) {
			if(postValue == tree.nodes[i].firstChild.innerHTML) {
				tree.nodes.splice(i+1,len-i-1);
				flag = 0;
				break;
			}
		}
		tree.animation();
		if(flag === 0) {
			alert("find the content which you input,look the process please");
		}else {
			alert("there are not the content which you input,look the process please");
		}
	});

	delButton.addEventListener("click",function(){
		if(!tree.move) {
			tree.deleteNode();
		}
	});

	addButton.addEventListener("click",function(){
		if(!tree.move) {
			tree.addNode();
		}
	});

	root.addEventListener("click",function(event) {
		var j;

		tree.targetNode = event.target;
		if(event.target.nodeName == "SPAN") {
			tree.targetNode = tree.targetNode.parentNode;
		}

		targetArray.push(tree.targetNode);

		// 当多次选择多个div时，清除之前选择的
		if(targetArray.length > 1) {
			// 清除之前选择的div，将之前选择的border恢复
			for(j = 0;j < targetArray.length - 1;j++) {
				targetArray[j].style.border = "0px";
			}
		}

		tree.targetNode.style.border = "1px solid #006FCC";
		// tree.targetNode.style.border = "0 0 3px #006FCC";
		for(var i = 0,len = tree.targetNode.children.length;i < len;i++) {
				if(tree.targetNode.children[i].nodeName == "DIV") {
						tree.targetNode.children[i].style.display = tree.targetNode.children[i].style.display == 'none' ? 'block' : 'none' ;
				}
		}
	});

}

/*
 *	构造函数Tree
 *	nodes:存储所有的节点
 *	move:控制遍历，以免在遍历时点击其他按钮混乱
 */
function Tree() {
	this.nodes = [];
	this.move = false;
	this.root1 = document.getElementsByClassName("root")[0];
	this.targetNode = this.root1;
	this.fold = false;
}

/*
 *	先序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.preOrder = function(node) {
	this.nodes.push(node);
	for(var i = 0,len = node.children.length;i< len;i++) {
		if(node.children[i].nodeName == "DIV") {
			this.preOrder(node.children[i]);
		}
	}
};

/*
 *	后序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.postOrder = function(node) {
	for(var i = 0,len = node.children.length;i< len;i++) {
		if(node.children[i].nodeName == "DIV") {
			this.postOrder(node.children[i]);
		}
	}
	this.nodes.push(node);
};

/*
 *	动画显示树的遍历过程
 */
Tree.prototype.animation = function() {
	var nodes = this.nodes,
			i = 0,
			len = this.nodes.length,
			self = this,
			second = 500;

	self.nodes = [];

	// move为false时，才执行动画，以免重复点击混乱
	if(!self.move) {
		self.move = true;
		nodes[i].style.background = "red";

		// 设置计时器
		var timer = setInterval(function(){
			// 当动画到最后一个节点时背景重新变白，move重置，清除计时器
			if(i == len-1) {
				nodes[i].style.background = "white";
				self.move = false;
				clearInterval(timer);
			} else {
				// node的逐个显示
				++i;
				nodes[i-1].style.background = "white";
				nodes[i].style.background = "red";
			}
		},second);
	}

};

/*
 *	删除选中的节点
 */
Tree.prototype.deleteNode = function() {
	if(this.targetNode && this.targetNode != this.root1) {
		this.targetNode.parentNode.removeChild(this.targetNode);
	} else {
		alert("we can not remove rootNode");
	}
};

/*
 *	增加节点
 */
Tree.prototype.addNode = function() {
	var addText = document.getElementById('text3').value.trim();
	if(addText === "") {
		alert("please input the value");
	}else if(this.targetNode) {
		var newNode = document.createElement("div");
		newNode.innerHTML = addText;
		newNode.style.border = "1px solid black";
		this.targetNode.appendChild(newNode);
		this.targetNode.style.border = "1px solid black";
	}
};
