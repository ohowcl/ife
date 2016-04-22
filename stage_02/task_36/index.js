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
    "instructions": [],
    "validCmds": ["GO", "TUN LEF", "TUN RIG", "TUN BAC", "TRA LEF",
        "TRA TOP", "TRA RIG", "TRA BOT", "MOV LEF", "MOV RIG", "MOV TOP",
        "MOV BOT"],
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
        this.cells = [];
        // when the celll clicked, invoke the callback
        const callback = function() {
            const x = this.getAttribute("x");
            const y = this.getAttribute("y");
            let cmd = "MOV TO " + x + ", " + y;
            Contianer.command(cmd);
            Contianer.exec();
        };
        for (var j = 1; j <= this.Y_MAX; j++) {
            this.cells[j] = [];
            for (var i = 1; i <= this.X_MAX; i++) {
                let tmp  = document.createElement("div");
                tmp.classList.add("cell");
                tmp.setAttribute("x", i);
                tmp.setAttribute("y", j);
                tmp.onclick = callback;
                tmp.setAttribute("title", "pos: " + i + ", " + j);
                this.entity.appendChild(tmp);
                this.cells[j][i] = tmp;
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
     * nextPosition() calculate the next postion
     *
     * @param {Number} direction
     * @param {Number} num
     */
    nextPosition: function(direction, num) {
        let x = this.x;
        let y = this.y;
        switch(direction) {
            case "TOP":
                while (y > 0 && num >= 0) {
                    if (this.cells[y][x].getAttribute("block") == "1") {
                        break;
                    }
                    y--;
                    num--;
                }
                this.y = y + 1;
                break;
            case "RIG":
                while (x <= this.X_MAX && num >= 0) {
                    if(this.cells[y][x].getAttribute("block") == "1") {
                        break;
                    }
                    x++;
                    num--;
                }
                this.x = x - 1;
                break;
            case "BOT":
                while (y <= this.Y_MAX && num >= 0) {
                    if(this.cells[y][x].getAttribute("block") == "1") {
                        break;
                    }
                    y++;
                    num--;
                }
                this.y = y - 1;
                break;
            case "LEF":
                while (x > 0 && num >= 0) {
                    if (this.cells[y][x].getAttribute("block") == "1") {
                        break;
                    }
                    x--;
                    num--;
                }
                this.x = x + 1;
                break;
        }
    },
    /**
     * searchPath() using the dynamic algorithm to search the path
     *
     * @param {Number} initX
     * @param {Number} initY
     * @param {Number} aimX
     * @param {Number} aimY
     * @return {Array}
     */
    searchPath: function(initX, initY, aimX, aimY) {
        if (aimX < 1 || aimX > this.X_MAX || aimY < 1 || aimY > this.Y_MAX ||
                this.cells[aimY][aimX].getAttribute("block") == "1") {
            return [];
        }
        if (initX < 1 || initX > this.X_MAX 
                || initY < 1 || initY > this.Y_MAX
                || this.cells[initY][initX].getAttribute("block") == "1") {
            return [];
        }
        const state = [];
        for (var i = 1; i <= this.Y_MAX; i++) {
            state[i] = [];
            for (var j = 1; j <= this.X_MAX; j++) {
                state[i][j] = [];
                state[i][j][0] = 400;
                state[i][j][1] = {"cmd":"", args:""};
            }
        }
        const queue = [];
        queue.push([aimX, aimY]);
        state[aimY][aimX][0] = 0;
        let x = 0;
        let y = 0;
        while (queue.length != 0) {
            x = queue[0][0];
            y = queue[0][1];
            if (x > 1 && this.cells[y][x - 1].getAttribute("block") != "1") {
                if (state[y][x - 1][0] > state[y][x][0] + 1) {
                    state[y][x - 1][0] = state[y][x][0] + 1;
                    state[y][x - 1][1]["cmd"] = "MOV RIG";
                    state[y][x - 1][2] = [x, y];
                    queue.push([x - 1, y]);
                }
            }
            if (x < this.X_MAX 
                    && this.cells[y][x + 1].getAttribute("block") != "1") {
                if (state[y][x + 1][0] > state[y][x][0] + 1) {
                    state[y][x + 1][0] = state[y][x][0] + 1;
                    state[y][x + 1][1]["cmd"] = "MOV LEF";
                    state[y][x + 1][2] = [x, y];
                    queue.push([x + 1, y]);
                }
            }
            if (y > 1 && this.cells[y - 1][x].getAttribute("block") != "1") {
                if (state[y - 1][x][0] > state[y][x][0] + 1) {
                    state[y - 1][x][0] = state[y][x][0] + 1;
                    state[y - 1][x][1]["cmd"] = "MOV BOT";
                    state[y - 1][x][2] = [x, y];
                    queue.push([x, y - 1]);
                }
            }
            if (y < this.Y_MAX 
                    && this.cells[y + 1][x].getAttribute("block") != "1") {
                if (state[y + 1][x][0] > state[y][x][0] + 1) {
                    state[y + 1][x][0] = state[y][x][0] + 1;
                    state[y + 1][x][1]["cmd"] = "MOV TOP";
                    state[y + 1][x][2] = [x, y];
                    queue.push([x, y + 1]);
                }
            }
            queue.shift();
        }
        const re = [];
        if (state[initY][initX][0] != 400) {
            x = initX;
            y = initY;
            while (x != aimX || y != aimY) {
                re.push(state[y][x][1]);
                let tmpx = state[y][x][2][0];
                let tmpy = state[y][x][2][1];
                x = tmpx;
                y = tmpy;
            }
        }
        return re;
    },
    /**
     * cmdGo() go to the next positiont of the widget
     */
    cmdGo: function(step) { const num = step || 1; // get the direction of the widget
        let dir = this.direction % 4;
        if (dir < 0) {
            dir += 4;
        }
        switch(dir) {
            case 0: this.nextPosition("TOP", num); break;
            case 1: this.nextPosition("RIG", num); break;
            case 2: this.nextPosition("BOT", num); break;
            case 3: this.nextPosition("LEF", num); break;
        }
        this.setWidgetPos();
    },
    /**
     * cmdTra() the transform command processor
     */
    cmdTra: function(direction, step) {
        const num = step || 1;
        this.nextPosition(direction, num);
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
     * validateColor() validate the css color scheme
     *
     * @param {String} the color sheme
     * @return {Boolean}
     */
    validateColor: function(color) {
        if (color[0] == "#") {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        } else {
            return true;
        }
    },
    /**
     * cmdBru() set the color infront of the widget
     *
     * @param {String} color
     * @return {Boolean}
     */
    cmdBru: function(color) {
        // get the direction of the widget
        let dir = this.direction % 4;
        let x = this.x;
        let y = this.y;
        if (dir < 0) {
            dir += 4;
        }
        switch(dir) {
            case 0: y = this.y - 1; break;
            case 1: x = this.x + 1; break;
            case 2: y = this.y + 1; break;
            case 3: x = this.x - 1; break;
        }
        if (x < 1 || x > this.X_MAX) {
            console.log("the x overflow");
            return false;
        }
        if (y < 1 || y > this.Y_MAX) {
            console.log("the y overflow");
            return false;
        }
        
        this.cells[y][x].style.backgroundColor = color;
        this.cells[y][x].setAttribute("block", "1");
    },
    cmdMovTo: function(args) {
        const ele = args.split("TO");
        const coord = ele[1].split(",");
        if (Number.isNaN(Number(coord[0])) || Number.isNaN(Number(coord[1]))) {
            return false;
        }
        const aimX = Number(coord[0]);
        const aimY = Number(coord[1]);
        this.state = "block";
        let xx = this.x;
        let yx = this.y;
        let re = this.searchPath(xx, yx, aimX, aimY);
        this.instructions = this.instructions.concat(re);
        return true;
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
        let instruct = {"cmd": "", "args": []};
        args.trim();
        const cmds = args.split(' ');
        if (cmds.length == 2 && cmds[0] == "BRU") {
            if (!this.validateColor(cmds[1])) {
                this.instructions = [];
                return false;
            }
            instruct["cmd"] = "BRU";
            instruct["args"] = cmds[1];
            this.instructions.push(instruct);
            return true;
        }
        if (cmds.length > 2 && cmds[0] == "MOV" && cmds[1] == "TO") {
            if (this.cmdMovTo(args) == false) {
                this.instructions = [];
                return false;
            }
            return true;
        }
        let cmd = "";
        let num = 1;
        if (Number.isNaN(Number(cmds[cmds.length - 1]))) {
            cmd = args;
        } else {
            num = Number(cmds[cmds.length - 1]);
            cmds.pop();
            cmd = cmds.join(" ");
        }
        instruct["cmd"] = cmd;
        instruct["args"] = num;
        if (this.validCmds.indexOf(cmd) < 0) {
            this.instructions = [];
            return false;
        }
        this.instructions.push(instruct);
        return true;
    },
    /**
     * exec() execute the instruction set
     */
    exec: function() {
        const execCommands = function(cmds, idx) {
            if (idx < cmds.length) {
                switch (cmds[idx]["cmd"]) {
                    case "GO": 
                        Contianer.cmdGo(cmds[idx].args); break;
                    case "TUN LEF": 
                        Contianer.cmdTunLef(cmds[idx].args); break;
                    case "TUN RIG": 
                        Contianer.cmdTunRig(cmds[idx].args); break;
                    case "TUN BAC": 
                        Contianer.cmdTunBac(cmds[idx].args); break;
                    case "TRA LEF": 
                        Contianer.cmdTra("LEF", cmds[idx].args); break;
                    case "TRA TOP": 
                        Contianer.cmdTra("TOP", cmds[idx].args); break;
                    case "TRA RIG": 
                        Contianer.cmdTra("RIG", cmds[idx].args); break;
                    case "TRA BOT": 
                        Contianer.cmdTra("BOT", cmds[idx].args); break;
                    case "MOV LEF": 
                        Contianer.cmdMov("LEF", cmds[idx].args); break;
                    case "MOV TOP": 
                        Contianer.cmdMov("TOP", cmds[idx].args); break;
                    case "MOV RIG": 
                        Contianer.cmdMov("RIG", cmds[idx].args); break;
                    case "MOV BOT": 
                        Contianer.cmdMov("BOT", cmds[idx].args); break;
                    case "BRU":
                        Contianer.cmdBru(cmd[idx].args); break;
                    default: return false; break;
                }
                window.setTimeout(execCommands, 500, cmds, idx + 1);
            } else {
                Contianer.instructions = [];
            }
        }
        window.setTimeout(execCommands, 500, this.instructions, 0);
    }
};

Contianer.init();

//binding event
const executeButton = document.getElementById("execute");
// the execute button callback
executeButton.onclick = function() {
    const elements = document.getElementById("commands-content").children;
    const hints = document.getElementById("commands-hint");

    let flag = true;
    // the cmd execute function
    for (var idx = 0; idx < elements.length; idx++) {
        // if the command not right mark it and stop running
        if (Contianer.command(elements[idx].innerHTML) == false) {
            hints.children[idx].classList.add("hint-error");
            flag = false;
        } else {
            hints.children[idx].classList.remove("hint-error");
        }
    }
    if (flag) {
        Contianer.exec();
    } else {
        Contianer.instructions = [];
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

const generateWall = document.getElementById("generate");
generateWall.onclick = function() {
    for (var y = 1; y <= Contianer.Y_MAX; y++) {
        for (var x = 1; x <= Contianer.X_MAX; x++) {
            let tmp = Math.random();
            if (tmp > 0.75 && !(x == 1 && y == 1)) {
                let color = "#" + tmp.toString(16).slice(2, 8);
                Contianer.cells[y][x].setAttribute("block", "1");
                Contianer.cells[y][x].style.backgroundColor = color;
            } else {
                Contianer.cells[y][x].setAttribute("block", "0");
                Contianer.cells[y][x].style.backgroundColor = "green";
            }
        }
    }
};

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
