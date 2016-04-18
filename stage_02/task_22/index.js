defButton();
function defButton() {
	var tree = new Tree(),
			root = document.getElementsByClassName("root")[0],
			preButton = document.getElementById('before'),
			inButton = document.getElementById('middle'),
			postButton = document.getElementById('behind');

	preButton.addEventListener("click",function(){
		tree.preOrder(root);
		tree.animation();
	});

	inButton.addEventListener("click",function(){
		tree.inOrder(root);
		tree.animation();
	});

	postButton.addEventListener("click",function(){
		tree.postOrder(root);
		tree.animation();
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
Tree.prototype.preOrder = function(node){

	/*
	 *	当前node放入nodes数组中
	 *	顺序：当前节点，左孩子节点，右孩子节点
	 */
	this.nodes.push(node);
	if(node.firstElementChild) {
		this.preOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.preOrder(node.lastElementChild);
	}
};

/*
 *	中序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.inOrder = function(node){

	/*
	 *	当前node放入nodes数组中
	 *	顺序：左孩子节点，当前节点，右孩子节点
	 */
	if(node.firstElementChild) {
		this.inOrder(node.firstElementChild);
	}
	this.nodes.push(node);
	if(node.lastElementChild){
		this.inOrder(node.lastElementChild);
	}
};

/*
 *	后序遍历Tree
 *	node；遍历的节点
 */
Tree.prototype.postOrder = function(node){

	/*
	 *	当前node放入nodes数组中
	 *	顺序：左孩子节点，右孩子节点，当前节点
	 */
	if(node.firstElementChild) {
		this.postOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.postOrder(node.lastElementChild);
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
			second = 200;

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
