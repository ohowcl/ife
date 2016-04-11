/**
 * constructTree() construct a binary tree with given number of nodes
 *
 * @param {Number} len
 * @param {Number} idx
 * @param {Number} width
 * @param {Number} height
 * @param {DomObject} root
 */
function constructTree(len, idx, width, height, root) {
    if (idx >= len) {
        return null;
    }
    let tmp = document.createElement("div");
    tmp.className = "node";
    tmp.style.width = width + 'px';
    tmp.style.height =  height + 'px';

    // calculate the directly subnode width and height
    let subWidth = (width - 30) / 2;
    let subHeight = height - 40;

    // construct the subtrees
    let leftChild = constructTree(len, idx * 2 + 1, subWidth, subHeight);
    let rightChild = constructTree(len, idx * 2 + 2, subWidth, subHeight);

    // append subtree to the dom tree
    if (leftChild == null && rightChild == null) {
        return tmp;
    } else if (leftChild == null || rightChild == null) {
        if (leftChild == null) {
            let child = document.createElement("div");
            child.className = "fake-node";
            child.style.width = subWidth + 'px';
            child.style.height = subHeight + 'px';
            tmp.appendChild(child);
            tmp.appendChild(rightChild);
        } else {
            tmp.appendChild(leftChild);
            let child = document.createElement("div");
            child.className = "fake-node";
            child.style.width = subWidth + 'px';
            child.style.height = subHeight + 'px';
            tmp.appendChild(child);
        }
    } else {
        tmp.appendChild(leftChild);
        tmp.appendChild(rightChild);
    }
    return tmp;
}

/**
 * preOrderScan() pre-order scan the tree and generate a sequence
 *
 * @param {Array} backTrack
 */
function preOrderScan(backTrack) {
    if (backTrack.length == 0) {
        return;
    }
    let root = backTrack.pop();
    if (root.children.length >= 1) {
        if (root.childNodes.length == 2 && 
                root.children[1].className != "fake-node") {
            backTrack.push(root.children[1]);
            preOrderScan(backTrack);
        }
        backTrack.push(root.children[0]);
        preOrderScan(backTrack);
    }
    backTrack.push(root);
}

/**
 * inOrderScan() in-order scan the tree and generate a sequence
 *
 * @param {Array} backTrack
 */
function inOrderScan(backTrack) {
    if (backTrack.length == 0) {
        return;
    }
    let root = backTrack.pop();
    if (root.children.length == 2 
            && root.children[1].className != "fake-node") {
        backTrack.push(root.children[1]);
        inOrderScan(backTrack);
    }
    backTrack.push(root);
    if (root.children.length != 0) {
        backTrack.push(root.children[0]);
        inOrderScan(backTrack);
    }
}

/**
 * afterOrderScan() after-order scan the tree and generate a sequence
 *
 * @param {Array} backTrack
 */
function afterOrderScan(backTrack) {
    if (backTrack.length == 0) {
        return;
    }
    let root = backTrack[backTrack.length - 1];
    if (root.children.length == 2 
            && root.children[1].className != "fake-node") {
        backTrack.push(root.children[1]);
        afterOrderScan(backTrack);
    }
    if (root.children.length != 0) {
        backTrack.push(root.children[0]);
        afterOrderScan(backTrack);
    }
}

/**
 * render() render the tree with given sequence
 *
 * @param {Array} backTrack
 */
function render(backTrack) {
    if (backTrack.length == 0) {
        return;
    }
    let root = backTrack.pop();
    root.style["background-color"] = "green";
    window.setTimeout(function() {
        root.style["background-color"] = "white";
        render(backTrack);
    }, 1000);
}

/**
 * init()
 */
function init() {
    let preOrder = document.getElementById("pre-order");
    let inOrder = document.getElementById("in-order");
    let afterOrder= document.getElementById("after-order");
    let generate = document.getElementById("generate");
    generate.onclick = function() {
        let number = Number(document.getElementById("number").value);
        let root = document.getElementById("tree");
        root.innerHTML = "";
        if (!Number.isNaN(number) && number > 0) {
            let layer = Math.floor(Math.log(number) / Math.log(2));
            root.appendChild(constructTree(number, 0, 200 * layer, 50 * layer));
        }
    }
    preOrder.onclick = function() { 
        let root = document.getElementById("tree");
        let backTrack = [];
        if (root.children.length != 0) {
            backTrack = [root.children[0]];
        }
        preOrderScan(backTrack); 
        render(backTrack);
    };
    inOrder.onclick = function() { 
        let root = document.getElementById("tree");
        let backTrack = [];
        if (root.children.length != 0) {
            backTrack = [root.children[0]];
        }
        inOrderScan(backTrack); 
        render(backTrack);
    };
    afterOrder.onclick = function() { 
        let root = document.getElementById("tree");
        let backTrack = [];
        if (root.children.length != 0) {
            backTrack = [root.children[0]];
        }
        afterOrderScan(backTrack); 
        render(backTrack);
    };
}

init();
