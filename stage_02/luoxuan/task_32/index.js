const verifyRules = {
    /**
     * elementHint() change the input to hint state
     *
     * @param {String} id
     * @param {String} str
     */
    elementHint: function (id, str){
        const element = document.getElementById(id);

        // if there is not class name
        if (element.className == "") {
            element.className = "input-hint";
            element.nextElementSibling.className = "hint";
            element.nextElementSibling.textContent = str;
        }
    },

    /**
     * elementVerify() verify the content of the input and hint
     *
     * @param {String} id
     * @param {String} name
     * @param {String} desc
     * @param {Function} ruleFun
     */
    elementVerify: function (id, name, desc, ruleFun) {
        const element = document.getElementById(id);
        const value = element.value;
        const sibling = element.nextElementSibling;

        // call the ruleFun to verify
        if (ruleFun()) {
            element.className = "input-correct";
            sibling.className = "correct";
            sibling.textContent = name + desc;
        } else {
            element.className = "input-error";
            sibling.className = "error";
            if (value.length != 0) {
                sibling.textContent = name + "不" + desc;
            } else {
                sibling.textContent = name + "不能为空";
            }
        }
    },

    /**
     * the name related function
     */
    "name": {
        /**
         * focus() the name input focus function
         */
        "focus": function() {
            let str = "必填，4-16个字符";
            verifyRules.elementHint("name", str);
        },

        /**
         * verify() the name input verify function
         *
         * @param {String}
         */
        "verify": function() {
            // name verify rule
            const rule = function() {
                const value = document.getElementById("name").value;
                const regex = /[\u4e00-\u9fa5]/g;
                const number = value.match(regex);
                let len = 0;
                if (number != null) {
                    len = value.length + number.length;
                } else {
                    len = value.length;
                }
                if (len >= 4 && len <= 16) {
                    return true;
                } else {
                    return false;
                }
            };

            verifyRules.elementVerify("name", "名称", "可用", rule);
        }
    },
    "pass": {
        "focus": function() {
            const str = "8-20个字母或数字";
            verifyRules.elementHint("pass", str);
        },
        "verify": function(id) {
            // pass verify rule
            const rule = function() {
                const value = document.getElementById("pass").value;
                const regex = /^[0-9a-z]{8,20}/gi;
                return regex.test(value);
            };

            verifyRules.elementVerify("pass", "密码", "可用", rule);
        }
    },
    "pass-confirm": {
        "focus": function() {
            const str = "必填";
            verifyRules.elementHint("pass-confirm", str);
        },
        "verify": function() {
            // pass-confirm verify rule
            const rule = function() {
                const value = document.getElementById("pass-confirm").value;
                const pass = document.getElementById("pass").value;
                const regex = /^[0-9a-z]{8,20}/gi;
                if (regex.test(value) && value == pass) {
                    return true;
                } else {
                    return false;
                }
            };

            verifyRules.elementVerify("pass-confirm", "密码", "一致", rule);
        }
    },
    "email": {
        "focus": function() {
            const str = "必填";
            verifyRules.elementHint("email", str);
        },
        "verify": function() {
            // email verify rule
            const rule = function() {
                const value = document.getElementById("email").value;
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(value);
            }

            verifyRules.elementVerify("email", "邮箱", "可用", rule);
        }
    },
    "phone": {
        "focus": function() {
            const str = "11位手机号码";
            verifyRules.elementHint("phone", str);
        },
        "verify": function() {
            // phone verify rule
            const rule = function() {
                const value = document.getElementById("phone").value;
                if (value.length == 11) {
                    return true;
                } else {
                    return false;
                }
            };

            verifyRules.elementVerify("phone", "号码", "可用", rule);
        }
    }
};

(function() {
    const clickHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        ele = e.target;
        if (ele.tagName == "INPUT") {
            verifyRules[ele.id].focus(ele.id);
        } else if (ele.tagName == "BUTTON") {
            verifyRules["name"].verify();
            verifyRules["pass"].verify();
            verifyRules["pass-confirm"].verify();
            verifyRules["email"].verify();
            verifyRules["phone"].verify();
        }
    };
    document.body.addEventListener("click", clickHandler, false);

    const keypressHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        ele = e.target;
        if (ele.tagName == "INPUT") {
            verifyRules[ele.id].verify(ele.id);
        }
    };
    document.body.addEventListener("keyup", keypressHandler, false);
})();
