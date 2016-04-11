defButton();
function defButton() {
	var tree = new Tree(),
			root = document.getElementsByClassName("root")[0],
			preButton = document.getElementById('before'),
			postButton = document.getElementById('behind'),
			preSearchButton = document.getElementById('befSearch'),
			postSearchButton = document.getElementById('behSearch'),
			delButton = document.getElementById('delete'),
			addButton = document.getElementById('add');
			// img[0] = 'url("1.png") 0 3px rgb(139, 202, 255) no-repeat';

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
			if(postValue == tree.nodes[i].firstChild.innerHTML) {
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
		tree.targetNode = event.target;
		if(event.target.nodeName == "SPAN") {
			tree.targetNode = tree.targetNode.parentNode;
		}
		tree.targetNode.id = "targetNode";
		for(var i = 0,len = tree.targetNode.children.length;i < len;i++) {
				if(tree.targetNode.children[i].nodeName == "DIV") {
						tree.targetNode.children[i].style.display = tree.targetNode.children[i].style.display == 'none' ? 'block' : 'none' ;
				}
		}
	});

};

function Tree() {
	this.nodes = [];
	this.move = false;
	this.root1 = document.getElementsByClassName("root")[0];
	this.targetNode = this.root1;
	this.fold = false;
}

Tree.prototype.preOrder = function(node) {
	this.nodes.push(node);
	for(var i = 0,len = node.children.length;i< len;i++) {
		if(node.children[i].nodeName == "DIV") {
			this.preOrder(node.children[i]);
		}
	}
};

Tree.prototype.postOrder = function(node) {
	for(var i = 0,len = node.children.length;i< len;i++) {
		if(node.children[i].nodeName == "DIV") {
			this.postOrder(node.children[i]);
		}
	}
	this.nodes.push(node);
};


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

Tree.prototype.deleteNode = function() {
	if(this.targetNode && this.targetNode != this.root1) {
		this.targetNode.parentNode.removeChild(this.targetNode);
	} else {
		alert("we can not remove rootNode");
	}
}

Tree.prototype.addNode = function() {
	var addText = document.getElementById('text3').value.trim();
	if(addText == "") {
		alert("please input the value");
	}else if(this.targetNode) {
		var newNode = document.createElement("div");
		newNode.innerHTML = addText;
		newNode.style.border = "1px solid black";
		this.targetNode.appendChild(newNode);
		this.targetNode.style.border = "1px solid black";
	}
}
