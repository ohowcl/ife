const Contianer = {
    // the max board x coordinator
    "X_MAX": 15,
    // the max board y coordinator
    "Y_MAX": 15,
    // the init widget x coordinator
    "x": 1,
    // the init widget y coordinator
    "y": 1,
    // the direction of widget
    // 0: up, 1: right, 2: down, 3: left
    "direction": 0,
    // the transfrom degree of the widget
    "degree": 0,
    // widget width
    "WIDGET_WIDTH": 40,
    // widget height
    "WIDGET_HEIGHT": 40,
    /**
     * init() init the board container
     */
    init: function() {
        this.entity = document.getElementById("board");
        this.widget = document.createElement("div");
        this.widget.id = "widget";
        this.cells = [];
        this.createCells();
        this.entity.appendChild(this.widget);
        this.setWidgetPos();
    },
    /**
     * createCells() create the cells in the board
     */
    createCells: function() {
        for (var i = 1; i <= this.X_MAX; i++) {
            for (var j = 1; j <= this.Y_MAX; j++) {
                let tmp  = document.createElement("div");
                tmp.classList.add("cell");
                this.entity.appendChild(tmp);
                this.cells.push(tmp);
            }
        }
    },
    /*
     * setWidgetPos() set the widget in the correspond pos in the board
     */
    setWidgetPos: function() {
        this.x = this.x < 1? 1: this.x;
        this.x = this.x > this.X_MAX? this.X_MAX: this.x;
        this.y = this.y < 1? 1: this.y;
        this.y = this.y > this.Y_MAX? this.Y_MAX: this.y;

        const top = (this.y - 1) * this.WIDGET_HEIGHT;
        const left = (this.x - 1) * this.WIDGET_WIDTH;
        this.widget.style.left = left + "px";
        this.widget.style.top = top + "px";
    },
    /**
     * setWidgetDirection() set the direction of the widget
     */
    setWidgetDirection: function() {
        this.degree = this.direction * 90;
        this.widget.style.transform = "rotateZ(" + this.degree + "deg)";
    },
    /**
     * cmdGo() go to the next positiont of the widget
     */
    cmdGo: function(step) {
        const num = step || 1;

        // get the direction of the widget
        let dir = this.direction % 4;
        if (dir < 0) {
            dir += 4;
        }
        switch(dir) {
            case 0:
                this.y -= num;
                break;
            case 1:
                this.x += num;
                break;
            case 2:
                this.y += num;
                break;
            case 3:
                this.x -= num;
                break;
        }
        this.setWidgetPos();
    },
    /**
     * cmdTra() the transform command processor
     */
    cmdTra: function(direction, step) {
        const num = step || 1;
        switch(direction) {
            case "TOP":
                this.y -= num;
                break;
            case "RIG":
                this.x += num;
                break;
            case "BOT":
                this.y += num;
                break;
            case "LEF":
                this.x -= num;
                break;
        }
        this.setWidgetPos();
    },
    /**
     * cmdMov() the move command processor
     */
    cmdMov: function(direction, step) {
        const num = step || 1;
        switch(direction) {
            case "LEF":
                this.direction = 3;
                break;
            case "TOP":
                this.direction = 0;
                break;
            case "RIG":
                this.direction = 1;
                break;
            case "BOT":
                this.direction = 2;
                break;
        }
        this.setWidgetDirection();
        this.cmdGo(num);
    },
    /**
     * cmdTunLef() turn left the widget
     */
    cmdTunLef: function() {
        this.direction = this.direction - 1;
        this.setWidgetDirection();
    },
    /**
     * cmdTunRig() turn right the widget
     */
    cmdTunRig: function() {
        this.direction = this.direction + 1;
        this.setWidgetDirection();
    },
    /**
     * cmdTunBac() turn back the widget
     */
    cmdTunBac: function() {
        this.direction = this.direction + 2;
        this.setWidgetDirection();
    },
    /**
     * command() exec the command
     *
     * @param {String} cmd
     * @return {Boolean}
     */
    command: function(args) {
        if (args == "") {
            return false;
        }
        args.trim();
        const cmds = args.split(' ');
        let cmd = "";
        let num = 1;
        if (Number.isNaN(Number(cmds[cmds.length - 1]))) {
            cmd = args;
        } else {
            num = Number(cmds[cmds.length - 1]);
            cmds.pop();
            cmd = cmds.join(" ");
        }
        switch (cmd) {
            case "GO": this.cmdGo(num); break;
            case "TUN LEF": this.cmdTunLef(); break;
            case "TUN RIG": this.cmdTunRig(); break;
            case "TUN BAC": this.cmdTunBac(); break;
            case "TRA LEF": this.cmdTra("LEF", num); break;
            case "TRA TOP": this.cmdTra("TOP", num); break;
            case "TRA RIG": this.cmdTra("RIG", num); break;
            case "TRA BOT": this.cmdTra("BOT", num); break;
            case "MOV LEF": this.cmdMov("LEF", num); break;
            case "MOV TOP": this.cmdMov("TOP", num); break;
            case "MOV RIG": this.cmdMov("RIG", num); break;
            case "MOV BOT": this.cmdMov("BOT", num); break;
            default: return false; break;
        }
        return true;
    },
};

Contianer.init();

//binding event
const executeButton = document.getElementById("execute");
// the execute button callback
executeButton.onclick = function() {
    const values = document.getElementById("commands-content").children;
    
    // the cmd execute function
    const execCommands = function(elements, idx) {
        if (idx < elements.length) {
            const hints = document.getElementById("commands-hint");

            // if the command not right mark it and stop running
            if (Contianer.command(elements[idx].innerHTML) == false) {
                hints.children[idx].classList.add("hint-error");
                return;
            } else {
                hints.children[idx].classList.remove("hint-error");
            }
            window.setTimeout(execCommands, 1000, elements, idx + 1);
        }
    }
    if (values.length > 0) {
        execCommands(values, 0);
    }
}

// binding the refresh command
const refreshButton = document.getElementById("refresh");
// the refresh callback
refreshButton.onclick = function() {
    const conmmandsContent = document.getElementById("commands-content");
    conmmandsContent.innerHTML = "<div></div>";

    const conmmandsHint = document.getElementById("commands-hint");
    conmmandsHint.innerHTML = "";
    const hintItem = document.createElement("div");
    hintItem.className = "hint-item";
    hintItem.textContent = 1;
    conmmandsHint.appendChild(hintItem);
    conmmandsHint.appendChild(hintItem);
}

// listening the key down event
document.onkeydown = function(e) {
    e.stopPropagation();
    
    // prevent detele all element in the input window
    if (e.target.id == "commands-content" && e.target.innerHTML == "") {
        e.target.innerHTML = "<div></div>";
    }

    // listening the enter key down, for the new line
    if (e.target.id == "commands-content" && e.code == "Enter") {
        const hints = document.getElementById("commands-hint");
        while (hints.children.length - 1 < e.target.children.length) {
            const hintItem = document.createElement("div");
            hintItem.className = "hint-item";
            hintItem.textContent = hints.children.length + 1;
            hints.appendChild(hintItem);
        }
    }

    // prevent the delete all content in the input window
    if (e.target.innerHTML.length == 11 && e.code == "Backspace") {
        return false;
    }
    if (e.target.innerHTML.length == 12 && e.code == "Backspace") {
        e.target.children[0].textContent = "";
        return false;
    }
}

// listening the key up event
document.onkeyup = function(e) {
    if (e.target.id == "commands-content") {
        const hints = document.getElementById("commands-hint");
    }

    // remove the line number
    if (e.target.id == "commands-content" && e.code == "Backspace") {
        const hints = document.getElementById("commands-hint");
        while (hints.children.length > e.target.children.length) {
            hints.children[hints.children.length - 1].remove();
        }
    }
}
