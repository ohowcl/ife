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
 * selectedNode() the tree node selected callback
 */
function selecteNode(node) {
    const selected = document.getElementsByClassName("selected-node");
    let tmp;
    if (selected.length != 0) {
        tmp = selected[0];
        selected[0].className = selected[0].className
            .replace(/(?:^|\s)selected-node(?!\S)/g , '');
    }
    if (tmp !== node) {
        node.className += " selected-node";
    }
}

/**
 * nodeSelected() the node selected callback
 *
 * @param {Object} e
 */
function nodeSelected(e) {
    e.stopPropagation();
    selecteNode(this);
}

/**
 * createNode() create a node
 *
 * @param {String} name
 */
function createNode(name) {
    const tmp = document.createElement("div");
    tmp.className = "node";

    const content = document.createElement("div");
    content.className = "content";
    content.onclick = nodeSelected;

    const icon = document.createElement("div");
    icon.className = "expand-icon";
    content.appendChild(icon);
    icon.onclick = toggleTree;
    
    const text = document.createElement("span");
    text.textContent = name;
    content.appendChild(text);

    const nodes = document.createElement("div");

    tmp.appendChild(content);
    tmp.appendChild(nodes);
    return tmp;
}

/**
 * constructTree() construct a binary tree with given number of nodes
 *
 * @param {Object} obj
 */
function constructTree(obj) {
    if (typeof obj == 'undefined') {
        return;
    }
    const tmp = createNode(obj.name);
    // construct the subtrees
    for (var i = 0; i < obj.children.length; i++) {
        tmp.lastChild.appendChild(constructTree(obj.children[i]));
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
    for (var i = 0; i < root.lastChild.children.length; i++) {
        arr.push(root.lastChild.children[i]);
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
        for (var i = 0; i < arr[idx].lastChild.children.length; i++) {
            arr.push(arr[idx].lastChild.children[i]);
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
    const preColor = arr[idx].firstChild.style["background-color"];
    arr[idx].firstChild.style["background-color"] = "green";
    window.setTimeout(function() {
        arr[idx].firstChild.style["background-color"] = preColor;
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
    root.appendChild(constructTree(obj));
}

/**
 * expandSearchedNode() expand the seached node
 *
 * @param {Object} node
 */
function expandSearchedNode(node) {
    if (node.offsetParent !== null) {
        return;
    }
    let tmp = node.parentNode.parentNode;
    while (tmp.offsetParent === null) {
        tmp = tmp.parentNode.parentNode;
    }
    tmp.lastChild.style.display = "block";
    tmp.firstChild.firstChild.className = "expand-icon"
}

/**
 * searchValue() search the node which content equals the given content
 * 
 * @param {Array} arr
 * @param {String} value
 * @return {Boolean}
 */
function searchValue(arr, value) {
    if (arr.length == 0) {
        return false;
    }

    let root = arr[arr.length - 1];
    const content = root.firstChild.textContent;
    if (content == value) {
        selecteNode(root.firstChild);
        expandSearchedNode(root);
        return true;
    }
    for (var i = 0; i < root.lastChild.children.length; i++) {
        arr.push(root.lastChild.children[i]);
        if (searchValue(arr, value)) {
            return true;
        }
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
    const tree = document.getElementById("tree");
    if (selected.length != 0) {
        const root = selected[0].parentNode;
        if (root !== tree.firstChild) {
            root.remove();
        }
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
        const newNode = createNode(value);
        const root = selected[0].parentNode.lastChild;
        root.appendChild(newNode);
    }
}

/**
 * toggleTree() 
 */
function toggleTree(e) {
    let root = this.parentNode.parentNode;
    if (root.lastChild.style.display == "none") {
        root.lastChild.style.display = "block";
        this.className = "expand-icon"
    } else {
        root.lastChild.style.display = "none";
        this.className = "icon"
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
