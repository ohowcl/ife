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
	// addHandler(preButton,"click", function() {
	// 	tree.preOrder(root);
	// 	tree.animation();
	// });
	// addHandler(inButton,"click",function() {
	// 	tree.inOrder(root);
	// 	tree.animation();
	// });
	// addHandler(postButton,"click",function() {
	// 	tree.postOrder(root);
	// 	tree.animation();
	// });
};

function Tree() {
	this.nodes = [];
	this.move = false;
}

Tree.prototype.preOrder = function(node){
	this.nodes.push(node);
	if(node.firstElementChild) {
		this.preOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.preOrder(node.lastElementChild);
	}
};

Tree.prototype.inOrder = function(node){
	if(node.firstElementChild) {
		this.inOrder(node.firstElementChild);
	}
	this.nodes.push(node);
	if(node.lastElementChild){
		this.inOrder(node.lastElementChild);
	}
};

Tree.prototype.postOrder = function(node){
	if(node.firstElementChild) {
		this.postOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.postOrder(node.lastElementChild);
	}
	this.nodes.push(node);
};

Tree.prototype.animation = function() {
	var nodes = this.nodes,
			i = 0,
			len = this.nodes.length,
			self = this,
			second = 200;
	
	self.nodes = [];

	if(!self.move) {
		self.move = true;
		nodes[i].style.background = "red";

		var timer = setInterval(function(){
			if(i == len-1) {
				nodes[i].style.background = "white";
				self.move = false;
				clearInterval(timer);
			} else {
				++i;
				nodes[i-1].style.background = "white";
				nodes[i].style.background = "red";
			}
		},second);
	}

};
