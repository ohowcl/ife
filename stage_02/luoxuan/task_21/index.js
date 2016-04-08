/**
 * processTag() process the input of the tag input
 */
function processTag(oldValue) {
    const tag = document.getElementById("tag-input");
    let value = tag.value;

    // make sure the content of the text input is changed
    if (oldValue == value) {
        window.setTimeout(processTag, 100, value);
        return;
    }
    const reg = /[^\u4e00-\u9fffa-zA-Z0-9]+/g;
    if (value.search(reg) != -1) {
        tag.value = "";
        
        // make sure need to add a new tag
        value = value.replace(reg, "");
        if (value == "") {
            window.setTimeout(processTag, 100, "");
            return;
        }
        
        // make sure the value have not appear
        const tags = document.getElementsByClassName("tag");
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent == value) {
                window.setTimeout(processTag, 100, "");
                return;
            }
        }

        // remove the first tag when the number of tag more thant 10
        if (tags.length == 10) {
            tags[0].remove();
        }

        // add a new tag
        const tagContainer = document.getElementById("tag-container");
        const newtag = document.createElement("div");
        newtag.className = "tag";
        newtag.textContent = value;
        newtag.onclick = function() { this.remove() };
        tagContainer.appendChild(newtag);
        window.setTimeout(processTag, 100, "");
    } else {
        window.setTimeout(processTag, 100, value);
    }
}

/**
 * processInterest() process the input of the interest textarea
 */
function processInterest() {
    const content = document.getElementById("it-content");
    const itContainer = document.getElementById("it-container");
    itContainer.innerHTML = "";
    const value = content.value;
    content.value = "";
    const interests = value.split(/[^\u4e00-\u9fffa-zA-Z0-9]+/g);

    // filter the valid value
    const uniqueInterest = interests.filter(function(element, index) {
        return interests.indexOf(element) == index && element != "";
    });

    // no more than 10 elements
    let start = uniqueInterest.length >= 10? uniqueInterest.length - 10: 0;

    // insert interest
    while (start < uniqueInterest.length) {
        let interest = document.createElement("div");
        interest.className = "it";
        interest.textContent = uniqueInterest[start];
        itContainer.appendChild(interest);
        start ++;
    }
}

/**
 * init() initial the application
 */
function init() {
    const itConfirm = document.getElementById("it-confirm");
    itConfirm.onclick = processInterest;
    window.setTimeout(processTag, 100, "");
}

init();
