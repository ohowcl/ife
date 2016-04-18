defButton();
function defButton() {
	var tree = new Tree(),
			root = document.getElementsByClassName("root")[0],
			preButton = document.getElementById('before'),
			postButton = document.getElementById('behind'),
			preSearchButton = document.getElementById('befSearch'),
			postSearchButton = document.getElementById('behSearch');

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
			if(preValue == parseInt(tree.nodes[i].innerHTML)) {
				// 查询到内容后，将数组分割，只存储找到之前的内容，以便后续遍历时在输入值处停止
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
			if(postValue == parseInt(tree.nodes[i].innerHTML)) {
				// 查询到内容后，将数组分割，只存储找到之前的内容，以便后续遍历时在输入值处停止
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

}

/*
 *	构造函数Tree
 *	nodes:存储所有的节点
 *	move:控制遍历，以免在遍历时点击其他按钮混乱
 */
function Tree() {
	this.nodes = [];
	this.move = false;
}

/*
 *	先序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.preOrder = function(node) {
	this.nodes.push(node);
	for(var i = 0;i< node.children.length;i++) {
		this.preOrder(node.children[i]);
	}
};

/*
 *	后序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.postOrder = function(node) {
	for(var i = 0;i< node.children.length;i++) {
		this.postOrder(node.children[i]);
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
