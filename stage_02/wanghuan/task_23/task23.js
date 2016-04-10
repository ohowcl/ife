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
		tree.preSearch(root,document.getElementById('text1').value);

		tree.animation();
	});

	postSearchButton.addEventListener("click",function(){
		tree.postSearch(root,document.getElementById('text2').value);
		tree.animation();
	});

};

function Tree() {
	this.nodes = [];
	this.move = false;
}

Tree.prototype.preOrder = function(node) {

	this.nodes.push(node);
	for(var i = 0;i< node.children.length;i++) {
		this.preOrder(node.children[i]);
	}

};


Tree.prototype.postOrder = function(node) {
	for(var i = 0;i< node.children.length;i++) {
		this.postOrder(node.children[i]);
	}
	this.nodes.push(node);
};

Tree.prototype.preSearch = function(node,value) {
	// alert(value);
	// alert(node.innerText[0]);
	this.nodes.push(node);
	if(node.innerText[0] == value) {
		return;
	}
	for(var i = 0;i< node.children.length;i++) {
		this.preOrder(node.children[i]);
	}
}

Tree.prototype.postSearch = function(node,value) {

}

Tree.prototype.animation = function() {
	var nodes = this.nodes,
			i = 0,
			len = this.nodes.length,
			self = this,
			second = 500;

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
