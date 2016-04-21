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
    /**
     * init() init the board container
     */
    init: function() {
        this.entity = document.getElementById("board");
        this.widget = document.createElement("div");
        this.widget.id = "widget";
        this.cells = [];
        this.createCells();
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
        this.widget.remove();
        const index = (this.y - 1) * this.Y_MAX + this.x - 1;
        this.cells[index].appendChild(this.widget);
    },
    /**
     * setWidgetDirection() set the direction of the widget
     */
    setWidgetDirection: function() {
        switch(this.direction) {
            case 0: this.degree = "0deg"; break;
            case 1: this.degree = "90deg"; break;
            case 2: this.degree = "180deg"; break;
            case 3: this.degree = "270deg"; break;
        }
        this.widget.style.transform = "rotateZ(" + this.degree + ")";
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
     * cmdTunLef() turn left the widget
     */
    cmdTunLef: function() {
        this.direction = (this.direction + 3) % 4;
        this.setWidgetDirection();
    },
    /**
     * cmdTunRig() turn right the widget
     */
    cmdTunRig: function() {
        this.direction = (this.direction + 1) % 4;
        this.setWidgetDirection();
    },
    /**
     * cmdTunBac() turn back the widget
     */
    cmdTunBac: function() {
        this.direction = (this.direction + 2) % 4;
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
