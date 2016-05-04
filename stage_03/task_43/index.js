/**
 * The Album constructor function
 */
var Album = function(setting) {
    var DEFAULT_SETTING = {
        "pictures": [],
        "width": "800",
        "height": "400",
    };
    // if user not set the attribute, using the default
    this.setting = setting || {};
    for (var key in DEFAULT_SETTING) {
        this.setting[key] = this.setting[key] ||
            DEFAULT_SETTING[key];
    }
    this.getRenderedAlbum = this["render_" + this.setting["pictures"].length + "_pic"];
}

/**
 * createContainer() create the container of the album
 *
 * @return a dom object container
 */
Album.prototype.createContainer = function() {
    var obj = document.createElement("div");
    obj.classList.add("album-container");
    obj.style["width"] = this.setting["width"] + "px";
    obj.style["height"] = this.setting["height"] + "px";
    return obj;
}

/**
 * _renderElements() render the elements with given style
 *
 * @param {Array} elements
 * @param {Array} styles
 */
Album.prototype._renderElements = function(elements, styles) {
    for (var i = 0; i < styles.length; i++) {
        for (var key in styles[i]) {
            elements[i].style[key] = styles[i][key];
        }
    }
}

/**
 * render_1_pic() render function for 1 picture
 *
 * @return the rendered album
 */
Album.prototype.render_1_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];

    // create styles
    var styles = [
        {
            "width": width + "px",
            "height": height + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width + "px " + height + "px"
        }
    ];

    // create pictures item
    var ele = document.createElement("div");
    obj.appendChild(ele);

    // render the pictures item
    this._renderElements([ele], styles);

    return obj;
}

/**
 * render_2_pic() render function for 2 pictures
 *
 * @return the rendered album
 */
Album.prototype.render_2_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];
    var angle = Math.atan(width / (height * 3)) / Math.PI * 180;

    // create styles
    var styles = [
        {
            "width": width + "px", 
            "height": height + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width + "px " + height + "px"
        },
        {
            "width": width + "px",
            "height": height + "px",
            "marginLeft": width / 2 + "px",
            "transform": "skew(-" + angle + "deg)",
            "overflow": "hidden"
        },
        {
            "width": width + "px",
            "height": height + "px",
            "marginLeft": - width / 2 + "px",
            "transform": "skew(" + angle + "deg)",
            "background-image": "url(" + this.setting["pictures"][1] + ")",
            "background-size": width + "px " + height + "px"
        }
    ];

    // create picture items
    var back = document.createElement("div");
    obj.appendChild(back);
    var frontContainer = document.createElement("div");
    back.appendChild(frontContainer);
    var front = document.createElement("div");
    frontContainer.appendChild(front);

    // render picture items
    this._renderElements([back, frontContainer, front], styles);

    return obj;
}

/**
 * render_3_pic() render function for 2 pictures
 *
 * @return the rendered album
 */
Album.prototype.render_3_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];

    // create styles
    var styles = [
        {
            "width": width / 2 + "px",
            "height": height + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width / 2 + "px " + height + "px",
            "float": "left"
        },
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][1] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "right"
        },
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][2] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "right"
        }
    ];

    // create picture items
    var leftPic = document.createElement("div");
    obj.appendChild(leftPic);
    var rightTopPic = document.createElement("div");
    obj.appendChild(rightTopPic);
    var rightBottomPic = document.createElement("div");
    obj.appendChild(rightBottomPic);

    // render picture items
    this._renderElements([leftPic, rightTopPic, rightBottomPic], styles);

    return obj;
}

/**
 * render_4_pic() render function for 2 pictures
 *
 * @return the rendered album
 */
Album.prototype.render_4_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];

    // create styles
    var styles = [
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "left"
        },
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][1] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "left"
        },
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][2] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "left"
        },
        {
            "width": width / 2 + "px",
            "height": height / 2 + "px",
            "background-image": "url(" + this.setting["pictures"][3] + ")",
            "background-size": width / 2 + "px " + height / 2 + "px",
            "float": "left"
        }
    ];

    // create picture items
    var pics = [];
    var pic = null;
    for (var i = 0; i < styles.length; i++) {
        pic = document.createElement("div");
        obj.appendChild(pic);
        pics.push(pic);
    }

    // render picture items
    this._renderElements(pics, styles);

    return obj;
}

/**
 * render_5_pic() render function for 2 pictures
 *
 * @return the rendered album
 */
Album.prototype.render_5_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];

    // create styles
    var styles = [
        {
            "width": width * 2 / 3 + "px",
            "height": height * 2 / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width * 2 / 3 + "px " + height * 2 / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][3] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "right"
        },
        {
            "width": width / 3 + "px",
            "height": height * 2 / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][4] + ")",
            "background-size": width / 3 + "px " + height * 2 / 3 + "px",
            "float": "right"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][1] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][2] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        }
    ];

    // create picture items
    var pics = [];
    var pic = null;
    for (var i = 0; i < styles.length; i++) {
        pic = document.createElement("div");
        obj.appendChild(pic);
        pics.push(pic);
    }

    // render picture items
    this._renderElements(pics, styles);

    return obj;
}

/**
 * render_6_pic() render function for 2 pictures
 *
 * @return the rendered album
 */
Album.prototype.render_6_pic = function() {
    var obj = this.createContainer();
    var width = this.setting["width"];
    var height = this.setting["height"];


    // create styles
    var styles = [
        {
            "width": width * 2 / 3 + "px",
            "height": height * 2 / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][0] + ")",
            "background-size": width * 2 / 3 + "px " + height * 2 / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][1] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height * 1 / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][2] + ")",
            "background-size": width / 3 + "px " + height * 1 / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][3] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][4] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        },
        {
            "width": width / 3 + "px",
            "height": height / 3 + "px",
            "background-image": "url(" + this.setting["pictures"][5] + ")",
            "background-size": width / 3 + "px " + height / 3 + "px",
            "float": "left"
        }
    ];

    // create picture items
    var pics = [];
    var pic = null;
    for (var i = 0; i < styles.length; i++) {
        pic = document.createElement("div");
        obj.appendChild(pic);
        pics.push(pic);
    }

    // render picture items
    this._renderElements(pics, styles);

    return obj;
}

// Test

var album = new Album({"pictures": ["a.png"]});
var container = document.getElementById("container");
container.appendChild(album.getRenderedAlbum());

function callback(list) {
    return function () {
        var album = new Album({"pictures": list});
        var container = document.getElementById("container");
        container.innerHTML = "";
        container.appendChild(album.getRenderedAlbum());
    }
}

var buttonPic1 = document.getElementById("pic1");
buttonPic1.onclick = callback(["b.png"]);

var buttonPic2 = document.getElementById("pic2");
buttonPic2.onclick = callback(["a.png", "b.png"]);

var buttonPic3 = document.getElementById("pic3");
buttonPic3.onclick = callback(["a.png", "b.png", "c.png"]);

var buttonPic4 = document.getElementById("pic4");
buttonPic4.onclick = callback(["a.png", "b.png", "c.png", "d.png"]);

var buttonPic5 = document.getElementById("pic5");
buttonPic5.onclick = callback(["a.png", "b.png", "c.png", "d.png", "e.png"]);

var buttonPic6 = document.getElementById("pic6");
buttonPic6.onclick = callback(
    ["a.png", "b.png", "c.png", "d.png", "e.png", "f.png"]
);

