/**
 * decodeEntity() return a string remove &nbsp &amp &quot
 *
 * @param {String} data
 * @return {String}
 */
function decodeEntity(data) {
    const translate_re = /&(nbsp|amp|quot);/g;
    const translate = {
        "nbsp": " ",
        "amp" : "&",
        "quot": "\"",
    };
    let str = data.replace(translate_re, function(match, entity) {
        return translate[entity];
    });
    return str;
}

/**
 * encodeEntity() return a string replaced " " "&" "\""
 *
 * @param {String} data
 * @return {String}
 */
function encodeEntity(data) {
    const translate_re = /( |&|")/g;
    const translate = {
        " ": "&nbsp;",
        "&" : "&amp;",
        "\"": "&quot;",
    };
    let str = data.replace(translate_re, function(match, entity) {
        return translate[entity];
    });
    return str;
}

/**
 * removeTags() remove tags in a string
 *
 * @param {String} data
 */
function removeTags(data) {
    const regex = /(<([^>]+)>)/ig
    let str = data.replace(regex, "");
    // str = unescape(str);
    str = decodeEntity(str);
    return str;
}

/**
 * searchKeyword() return string marked the matched wrod
 *
 * @param {String} data
 * @param {String} keyword
 * @return {String}
 */
function searchKeyword(data, keyword) {
    let result = "";
    const validReg = /[^\u4e00-\u9fffa-zA-Z0-9]+/g;
    const validArr = data.split(validReg);
    const invalidReg = /[\u4e00-\u9fffa-zA-Z0-9]+/g;
    const invalidArr = data.split(invalidReg);
    let i = 0;
    let j = 0;

    if (invalidArr.length > validArr.length) {
        result = invalidArr[0];
        j++;
    }
    for (i = 0; i < validArr.length; i++) {
        if (validArr[i].indexOf(keyword) > -1) {
            validArr[i] = "<span>" + validArr[i] + "</span>";
        }
        if (i < invalidArr.length) {
            result += validArr[i] + invalidArr[j];
        } else {
            result += validArr[i];
        }
        j++;
    }
    result = encodeEntity(result); 
    return result;
}

/**
 * search click callback
 */ 
function beginMatch() {
    const keyword = document.getElementById("keyword").value;
    const content = document.getElementById("content");
    const result = searchKeyword(removeTags(content.innerHTML), keyword);
    content.innerHTML = result;
}

function init() {
    const search = document.getElementById("search");
    search.onclick = beginMatch;
}

init();
