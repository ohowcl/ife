/**
 * getData() return the ul element and make an array.
 *
 * @param
 * @return {Array} data
 */
function getData() {
    const children = document.getElementById("source").children;
    const data = [];
    for (var i = 0; i < children.length; i++) {
        let item = ["", ""];
        item[0] = children[i].textContent.slice(0, 2);
        item[1] = children[i].textContent.slice(-2);
        data.push(item);
    }
    return data;
}


/**
 * sortAqiData() return the sorted array of data
 *
 * @param {Array} data
 * @return {Array} sorted data
 */
function sortAqiData(data) {
    // compare() return the relation between a and b
    // return: 1(a[1] > b[1]), 0(a[1] == b[1]), -1(a[1] < b[1])
    const compare = function (a, b) {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] == b[1]) {
            return 0;
        } else {
            return 1;
        }
    };

    return data.sort(compare);
}

/** 
 * render() add the content of data to the page
 *
 * @param {Array} data
 * @return none
 */
function render(data) {
    const resort = document.getElementById("resort");
    for (var i = 0; i < data.length; i++) {
        let element = document.createElement("li");
        element.innerHTML = data[i][0] + "空气质量：<b>" + data[i][1] + "</b>";
        resort.appendChild(element);
    }
}

// init the event binding
function init() {
    const button = document.getElementById("sort-btn");
    button.onclick = function() {
        let data = sortAqiData(getData());
        render(data);
    }
}
init();
