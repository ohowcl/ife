/**
 * The Promption construct function, using the setting object to costum the 
 * Promption. The format please according to the DEFAULT_SETTING
 *
 * @param {Object} setting
 */
Promption = function(setting) {
    // The default setting
    var DEFAULT_SETTING = {
        // The promption box setting
        "box": {
            "top": "50%",
            "left": "50%",
            "width": "500",
            "height": "300",
            "dragable": "false"
        },
        // The promption box title setting
        "title": {
            "content": "This is a title.",  // The title content
            "textColor": "white",
            "bgcolor": "#ccc"
        },
        // The promption box content
        "content": {
            "content": "This is a promption.", // The promption content
            "textColor": "black",
            "bgcolor": "white"
        },
        // The promption box footer
        "footer": {
            "bgcolor": "#aaa"
        },
        // The promption box left button 
        "leftButton": {
            "content": "确定",
            "textColor": "white",
            "bgcolor": "#aaa",
            "callback": function() {} // The left button click callback
        },
        // The promption box right button
        "rightButton": {
            "content": "取消",
            "textColor": "white",
            "bgcolor": "#aaa",
            "callback": function() {} // The right button click callback
        },
        "cover": {
            "bgcolor": "#ddd",
            "opacity": "0.5"
        }
    };

    // if user not set the attribute, using the default
    this.setting = setting || {};
    for (var key in DEFAULT_SETTING) {
        this.setting[key] = this.setting[key] || {};
        for (var property in DEFAULT_SETTING[key]) {
            // Verify the callback which must be a function
            if (property == "callback") {
                if (typeof this.setting[key][property] !== "function") {
                    this.setting[key][property] = false;
                }
            }
            this.setting[key][property] = this.setting[key][property] || 
                DEFAULT_SETTING[key][property];
        }
    }
}

/**
 * render() render the promption
 */
Promption.prototype.render = function() {
    var body = document.getElementsByTagName("body")[0];
    this.cover = document.createElement("div");
    this.cover.classList.add("pp-cover");
    this.cover.style["background-color"] = this.setting["cover"]["bgcolor"];
    this.cover.style["opacity"] = this.setting["cover"]["opacity"];
    body.appendChild(this.cover);

    this.box = document.createElement("div");
    this.box.classList.add("pp-box");
    this.box.style["top"] = this.setting["box"]["top"];
    this.box.style["left"] = this.setting["box"]["left"];
    this.box.style["width"] = this.setting["box"]["width"] + "px";
    this.box.style["height"] = this.setting["box"]["height"] + "px";
    var leftMargin = -Number(this.setting["box"]["width"]) / 2;
    var topMargin = -Number(this.setting["box"]["height"]) / 2;
    this.box.style["margin-left"] = leftMargin + "px";
    this.box.style["margin-top"] = topMargin + "px";
    body.appendChild(this.box);

    var boxTitle = document.createElement("div");
    boxTitle.classList.add("pp-box-title");
    boxTitle.innerHTML = this.setting["title"]["content"];
    boxTitle.style["color"] = this.setting["title"]["textColor"];
    boxTitle.style["background-color"] = this.setting["title"]["bgcolor"];
    this.box.appendChild(boxTitle);

    var boxContent = document.createElement("div");
    boxContent.classList.add("pp-box-content");
    boxContent.innerHTML = this.setting["content"]["content"];
    boxContent.style["color"] = this.setting["content"]["textColor"];
    boxContent.style["background-color"] = this.setting["content"]["bgcolor"];
    this.box.appendChild(boxContent);

    var boxFooter = document.createElement("div");
    boxFooter.classList.add("pp-box-footer");
    boxFooter.style["background-color"] = this.setting["footer"]["bgcolor"];
    this.box.appendChild(boxFooter);

    var that = this;
    var removeCover = function() {
        var covers = document.getElementsByClassName("pp-cover");
        covers[0].remove();
        var boxs = document.getElementsByClassName("pp-box");
        boxs[0].remove();
    }

    var boxLeftButton = document.createElement("button");
    boxLeftButton.classList.add("pp-box-left-button");
    boxLeftButton.innerHTML = this.setting["leftButton"]["content"];
    boxLeftButton.style["color"] = this.setting["leftButton"]["textColor"];
    boxLeftButton.style["background-color"] = this.setting["leftButton"]["bgcolor"];
    boxLeftButton.onclick = function() {
        that.setting["leftButton"]["callback"]();
        removeCover();
    }
    boxFooter.appendChild(boxLeftButton);

    var boxRightButton = document.createElement("button");
    boxRightButton.classList.add("pp-box-right-button");
    boxRightButton.innerHTML = this.setting["rightButton"]["content"];
    boxRightButton.style["color"] = this.setting["rightButton"]["textColor"];
    boxRightButton.style["background-color"] = this.setting["rightButton"]["bgcolor"];
    boxRightButton.onclick = function() {
        that.setting["rightButton"]["callback"]();
        removeCover();
    }
    boxFooter.appendChild(boxRightButton);
}

/*
 * show() show the Promption
 */
Promption.prototype.show = function() {
    pp.render();
}

/**
 * destroy destroy the Proption
 */
Promption.prototype.destroy = function() {
    var covers = document.getElementsByClassName("pp-cover");
    covers[0].remove();
    var boxs = document.getElementsByClassName("pp-box");
    boxs[0].remove();
}

var pp = new Promption();
pp.show();
