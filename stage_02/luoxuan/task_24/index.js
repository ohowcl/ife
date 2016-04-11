// The root node width
const ROOT_WIDTH = 150;
const ROOT_HEIGHT = 150;
// This is the example tree struct
const TEST = {
    "name": "name",
    "children": [
    {
        "name": "anoter",
        "children": [
        {
            "name": "name",
            "children": [
            {
                "name": "anoter",
                "children": [ 
                { "name": "abc", "children": [] },
                { "name": "eft", "children": [] },
                { "name": "eft", "children": [] },
                { "name": "eft", "children": [] },
                { "name": "abc", "children": [] }
                ]
            },
            {
                "name": "anoter",
                "children": [
                { "name": "abc", "children": [] },
                { "name": "eft", "children": [] },
                { "name": "abc", "children": [] }
                ]
            }
            ]
        }
        ]
    },
    {
        "name": "anoter", "children": [
        { "name": "abc", "children": [] },
        { "name": "eft", "children": [] },
        { "name": "abc", "children": [] }
        ]
    }
    ]
};

/**
 * resizeTree() resize the tree when the nodes of the tree resized
 *
 * @param {Object} root
 * @param {Number} width
 * @param {Number} height
 */
function resizeTree(root, width, height) {
    if (typeof root == 'undefined') {
        return;
    }
    const subWidth = width - 20;
    const subHeight = height - 20;
    let tmpWidth = 0;

    for (var i = 0; i < root.children.length; i++) {
        resizeTree(root.children[i], subWidth, subHeight);
        tmpWidth += Number(root.children[i].style.width.slice(0, -2));
    }

    root.style.height = height + "px";
    // calculate the width according to the subtree
    if (root.children.length == 0) {
        root.style.width = width + "px";
    } else {
        root.style.width = tmpWidth + width + (root.children.length + 1) * 10 
            + "px";
    }
}

/**
 * selectedNode() the tree node selected callback
 */
function selectedNode(e) {
    e.stopPropagation();
    const selected = document.getElementsByClassName("selected-node");
    if (selected.length != 0) {
        selected[0].className = selected[0].className
            .replace(/(?:^|\s)selected-node(?!\S)/g , '');
    }
    this.className += " selected-node";
}
/**
 * constructTree() construct a binary tree with given number of nodes
 *
 * @param {Object} obj
 * @param {Number} width
 * @param {Number} height
 */
function constructTree(obj, width, height) {
    if (typeof obj == 'undefined') {
        return;
    }
    // calculate the directly subnode width and height
    let subWidth = width - 20;
    let subHeight = height - 20;

    let tmp = document.createElement("div");
    tmp.className = "node";
    tmp.textContent = obj.name;
    tmp.onclick = selectedNode;
    let tmpWidth = 0;

    // construct the subtrees
    for (var i = 0; i < obj.children.length; i++) {
        let child = constructTree(obj.children[i], subWidth, subHeight);
        tmp.appendChild(child);
        tmpWidth += Number(child.style.width.slice(0, -2));
    }

    tmp.style.height = height + "px";
    
    // calculate the width according to the subtree
    if (obj.children.length == 0) {
        tmp.style.width = width + "px";
    } else {
        tmp.style.width = tmpWidth + width + (obj.children.length + 1) * 10 
            + "px";
    }

    return tmp;
}

/**
 * deepFirstScan() deep-first scan the tree
 *
 * @param {Array} arr
 */
function deepFirstScan(arr) {
    if (arr.length == 0) {
        return;
    }

    let root = arr[arr.length - 1];
    for (var i = 0; i < root.children.length; i++) {
        arr.push(root.children[i]);
        deepFirstScan(arr);
    }
}

/**
 * breadthFirstScan() breadth-first scan the tree
 *
 * @param {Array} arr
 */
function breadthFirstScan(arr) {
    let idx = 0; 
    while (idx < arr.length) {
        for (var i = 0; i < arr[idx].children.length; i++) {
            arr.push(arr[idx].children[i]);
        }
        idx++;
    }
}

/**
 * scanRender() render the tree according the scan result
 *
 * @param {Array} arr
 * @param {Number} idx
 */
function scanRender(arr, idx) {
    if (idx >= arr.length) {
        return;
    }
    const preColor = arr[idx].style["background-color"];
    arr[idx].style["background-color"] = "green";
    window.setTimeout(function() {
        arr[idx].style["background-color"] = preColor;
        scanRender(arr, idx + 1);
    }, 1000);
}

/**
 * renderTree() render a tree according the input
 */
function renderTree() {
    let content = document.getElementById("content").value;
    let obj;
    try {
        obj = JSON.parse(content);
    } catch (e) {
        alert("not json");
        return false;
    }
    if (typeof obj != "object") {
        alert("not a object");
        return false;
    }
    let root = document.getElementById("tree");
    root.innerHTML = "";
    root.appendChild(constructTree(obj, ROOT_WIDTH, ROOT_HEIGHT));
}

/**
 * searchValue() search the node which content equals the given content
 * 
 * @param {Array} arr
 * @param {String} value
 * @return {Boolean}
 */
function searchValue(arr, value) {
    let idx = 0; 
    while (idx < arr.length) {
        if (arr[idx].innerHTML.split("<")[0] == value) {
            arr[idx].style["background-color"] = "yellow";
            return true;
        }
        for (var i = 0; i < arr[idx].children.length; i++) {
            arr.push(arr[idx].children[i]);
        }
        idx++;
    }
    return false;
}
/**
 * beginDeepFirstScan() deep first button click callback function
 */
function beginDeepFirstScan() {
    let root = document.getElementById("tree");
    if (root.children.length == 0) {
        return;
    }
    let arr = [root.children[0]];
    deepFirstScan(arr);
    scanRender(arr, 0);
}

/**
 * beginBreadthFirstScan() breadth first button click callback function
 */
function beginBreadthFirstScan() {
    const root = document.getElementById("tree");
    if (root.children.length == 0) {
        return;
    }
    const arr = [root.children[0]];
    breadthFirstScan(arr);
    scanRender(arr, 0);
}

/**
 * beginSearch() search the given value
 */
function beginSearch() {
    const value = document.getElementById("search-text").value;
    const root = document.getElementById("tree");
    if (root.children.length == 0) {
        alert("not found");
        return;
    }
    const arr = [root.children[0]];
    if (searchValue(arr, value) == false) {
        alert("not found");
    }
}

/**
 * deleteSelected() delete button click call back
 */
function deleteSelected() {
    const selected = document.getElementsByClassName("selected-node");
    if (selected.length != 0) {
        selected[0].remove();

        // resize the tree
        resizeTree(document.getElementById("tree").firstChild, 
                ROOT_WIDTH, ROOT_HEIGHT);
    }
}

/**
 * addSelected() add new node click callback
 */
function addNewNode() {
    const selected = document.getElementsByClassName("selected-node");
    if (selected.length != 0) {
        const newContentNode = document.getElementById("new-node");
        const value = newContentNode.value;
        if (value == "") {
            return;
        }
        newContentNode.value = "";
        
        // create a new node and add to the selected node
        const newNode = document.createElement("div");
        newNode.className = "node";
        newNode.textContent = value;
        newNode.onclick = selectedNode;
        selected[0].appendChild(newNode);

        // resize the tree
        resizeTree(document.getElementById("tree").firstChild, 
                ROOT_WIDTH, ROOT_HEIGHT);
    }
}

/**
 * init()
 */
function init() {
    let generate = document.getElementById("generate");
    let textarea = document.getElementById("content");
    let deepButton = document.getElementById("deep-first");
    let breadthButton = document.getElementById("breadth-first");
    let searchButton = document.getElementById("search");
    let deleteButton = document.getElementById("delete");
    let addButton = document.getElementById("add");
    textarea.value = JSON.stringify(TEST, null, '  ');
    generate.onclick = renderTree;
    deepButton.onclick = beginDeepFirstScan;
    breadthButton.onclick = beginBreadthFirstScan;
    searchButton.onclick = beginSearch;
    deleteButton.onclick = deleteSelected;
    addButton.onclick = addNewNode;
}

init();
