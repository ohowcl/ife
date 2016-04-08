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
    if (Number.isNaN(value)) {
        return;
    }
    const element = document.createElement("div");
    element.className = "item";
    element.style.height = (parseFloat(value) * 4) + "px";
    element.onclick = removeSelf;
    return element;
}

/**
 * validate() validte the require data
 */
function validateValue() {
    const value = document.getElementById("value").value;
    if (Number.isNaN(value)) {
        return false;
    } else if (parseFloat(value) < 10 || parseFloat(value) > 100) {
        return false;
    }
    if (document.getElementsByClassName("item") >= 60) {
        alert("More than 60 item!");
    }
    return true;
}

/**
 * insertLeft() insert a node in the left of the queue
 */
function insertLeft() {
    if (!validateValue()) {
        return;
    }
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
    if (!validateValue()) {
        return;
    }
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
    adjustHeight();
}

/**
 * removeRight() remove a node in the right of the queue
 */
function removeRight() {
    const queue = document.getElementById("queue");
    if (queue.hasChildNodes()) {
        queue.removeChild(queue.lastChild);
    }
    adjustHeight();
}

/**
 * sortItems() Bubble Sort the element
 *
 * @param {Array} items
 * @param {Number} curIdx
 * @param {Number} forwardIdx
 * @param {Number} stage
 * @param {Number} time
 */
function sortItems(items, curIdx, forwardIdx, stage, time, compare) {
    if (stage == 1) {
        let curHeight = parseFloat(items[curIdx].style.height.slice(0, -2));
        let forwardHeight = parseFloat(
                items[forwardIdx].style.height.slice(0, -2)
                );
        if (compare(curHeight, forwardHeight)) {
            items[curIdx].style.height = forwardHeight + "px";
            items[forwardIdx].style.height = curHeight + "px";
        }
        items[forwardIdx].style["background-color"] = "red";

        if (forwardIdx == items.length - 1) {
            items[curIdx].style["background-color"] = "red";
            if (curIdx == items.length - 2) {
                return;
            }
            items[curIdx + 1].style["background-color"] = "purple";
            items[curIdx + 2].style["background-color"] = "green";
            window.setTimeout(sortItems, time, items, curIdx + 1, curIdx + 2,
                    0, time, compare);
        } else {
            items[forwardIdx + 1].style["background-color"] = "green";
            window.setTimeout(sortItems, time, items, curIdx, forwardIdx + 1,
                    0, time, compare);
        }
    } else {
        window.setTimeout(sortItems, time, items, curIdx, forwardIdx, 1, time, 
                compare);
    }
}

/**
 * lowerCompare() return true when curHeight > forwardHeight
 *
 * @param {Number} curHeight
 * @param {Number} forwardHeigh
 */
function lowerCompare(curHeight, forwardHeight) {
    if (curHeight > forwardHeight) {
        return true;
    } else {
        return false;
    }
}

/**
 * higherCompare() return true when curHeight < forwardHeight
 *
 * @param {Number} curHeight
 * @param {Number} forwardHeigh
 */
function higherCompare(curHeight, forwardHeight) {
    if (curHeight < forwardHeight) {
        return true;
    } else {
        return false;
    }
}

/**
 * onSort() sort the array
 *
 * @param {function} compare
 * @param {Number} time
 */

function onSort(compare, time) {
    const items = document.getElementsByClassName("item");
    if (items.length <= 1) {
        return;
    } else {
        items[0].style["background-color"] = "purple";
        items[1].style["background-color"] = "green";
        setTimeout(sortItems, time, items, 0, 1, 0, time, compare);
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
    const sortLower = document.getElementById("sort-lower");
    const sortHigher = document.getElementById("sort-higher");
    leftIn.onclick = insertLeft;
    rightIn.onclick = insertRight;
    leftOut.onclick = removeLeft;
    rightOut.onclick = removeRight;
    sortLower.onclick = function() {
        onSort(lowerCompare, 500);
    };
    sortHigher.onclick = function() {
        onSort(higherCompare, 500);
    };
}

init();
