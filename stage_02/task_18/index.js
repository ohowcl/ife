/**
 * removeSelf() is a callback function
 */
function removeSelf() {
    this.parentNode.removeChild(this);
}

/**
 * creatDiv() returns a custom div
 */
function createDiv() {
    const value = document.getElementById("value").value;
    const element = document.createElement("div");
    element.className = "item";
    element.textContent = value;
    element.onclick = removeSelf;
    return element;
}

/**
 * insertLeft() insert a node in the left of the queue
 */
function insertLeft() {
    const queue = document.getElementById("queue");
    if (queue.hasChildNodes()) {
        queue.insertBefore(createDiv(), queue.firstChild);
    } else {
        queue.appendChild(createDiv());
    }
}

/** 
 * insertRight() insert a node in the right of the queue
 */
function insertRight() {
    const queue = document.getElementById("queue");
    queue.appendChild(createDiv());
}

/**
 * removeLeft() remove a node in the left of the queue
 */
function removeLeft() {
    const queue = document.getElementById("queue");
    if (queue.hasChildNodes()) {
        queue.removeChild(queue.firstChild);
    }
}

/**
 * removeRight() remove a node in the right of the queue
 */
function removeRight() {
    const queue = document.getElementById("queue");
    if (queue.hasChildNodes()) {
        queue.removeChild(queue.lastChild);
    }
}

/**
 * init() init the page
 */
function init() {
    const leftIn = document.getElementById("left-in");
    const rightIn = document.getElementById("right-in");
    const leftOut = document.getElementById("left-out");
    const rightOut = document.getElementById("right-out");
    leftIn.onclick = insertLeft;
    rightIn.onclick = insertRight;
    leftOut.onclick = removeLeft;
    rightOut.onclick = removeRight;
}

init();
