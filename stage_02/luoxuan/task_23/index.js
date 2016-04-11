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
    arr[idx].style["background-color"] = "green";
    window.setTimeout(function() {
        arr[idx].style["background-color"] = "white";
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
    root.appendChild(constructTree(obj, 150, 100));
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
    let root = document.getElementById("tree");
    if (root.children.length == 0) {
        return;
    }
    let arr = [root.children[0]];
    breadthFirstScan(arr);
    scanRender(arr, 0);
}

/**
 * init()
 */
function init() {
    let generate = document.getElementById("generate");
    let textarea = document.getElementById("content");
    let deepButton = document.getElementById("deep-first");
    let breadthButton = document.getElementById("breadth-first");
    textarea.value = JSON.stringify(TEST, null, '  ');
    generate.onclick = renderTree;
    deepButton.onclick = beginDeepFirstScan;
    breadthButton.onclick = beginBreadthFirstScan;
}

init();
