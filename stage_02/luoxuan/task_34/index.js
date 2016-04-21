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
    cmdGo: function() {
        switch(this.direction) {
            case 0:
                if (this.y > 1) {
                    this.y -= 1;
                }
                break;
            case 1:
                if (this.x < this.X_MAX) {
                    this.x += 1;
                }
                break;
            case 2:
                if (this.y < this.Y_MAX) {
                    this.y += 1;
                }
                break;
            case 3:
                if (this.x > 1) {
                    this.x -= 1;
                }
                break;
        }
        this.setWidgetPos();
    },
    /**
     * cmdTra() the transform command processor
     */
    cmdTra: function(direction) {
        switch(direction) {
            case "TOP":
                if (this.y > 1) {
                    this.y -= 1;
                }
                break;
            case "RIG":
                if (this.x < this.X_MAX) {
                    this.x += 1;
                }
                break;
            case "BOT":
                if (this.y < this.Y_MAX) {
                    this.y += 1;
                }
                break;
            case "LEF":
                if (this.x > 1) {
                    this.x -= 1;
                }
                break;
        }
        this.setWidgetPos();
    },
    /**
     * cmdMov() the move command processor
     */
    cmdMov: function(direction) {
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
        this.cmdGo();
        this.setWidgetDirection();
        this.setWidgetPos();
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
     */
    command: function(cmd) {
        switch (cmd) {
            case "GO": this.cmdGo(); break;
            case "TUN LEF": this.cmdTunLef(); break;
            case "TUN RIG": this.cmdTunRig(); break;
            case "TUN BAC": this.cmdTunBac(); break;
            case "TRA LEF": this.cmdTra("LEF"); break;
            case "TRA TOP": this.cmdTra("TOP"); break;
            case "TRA RIG": this.cmdTra("RIG"); break;
            case "TRA BOT": this.cmdTra("BOT"); break;
            case "MOV LEF": this.cmdMov("LEF"); break;
            case "MOV TOP": this.cmdMov("TOP"); break;
            case "MOV RIG": this.cmdMov("RIG"); break;
            case "MOV BOT": this.cmdMov("BOT"); break;
            default: break;
        }
    }
};

Contianer.init();

//binding event
const executeButton = document.getElementById("execute");
executeButton.onclick = function() {
    const value = document.getElementById("command").value;
    Contianer.command(value);
}
