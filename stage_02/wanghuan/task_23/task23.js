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
				tree.nodes.splice(i+1,len-i-1);
				flag = 0;
				break;
			}
		}
		tree.animation();
		if(flag == 0) {
			alert("find the content which you input,look the process please");
		}else {
			alert("there are not the content which you input,look the process please")
		}
	});

	postSearchButton.addEventListener("click",function(){
		tree.postOrder(root);
		var postValue = document.getElementById('text2').value,
				len = tree.nodes.length,
				flag = 1;
		for(var i = 0;i < len;i++) {
			if(postValue == parseInt(tree.nodes[i].innerHTML)) {
				tree.nodes.splice(i+1,len-i-1);
				flag = 0;
				break;
			}
		}
		tree.animation();
		if(flag == 0) {
			alert("find the content which you input,look the process please");
		}else {
			alert("there are not the content which you input,look the process please")
		}
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

// Tree.prototype.preSearch = function(node,value) {
//
// }

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
