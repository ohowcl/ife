(function() {
    // the basic ship orbit radius
    const BASIC_SHIP_RADIUS = 80;
    // the ship postion offset X
    const SHIP_POS_BASIC_X = 235;
    // the ship postion offset Y
    const SHIP_POS_BASIC_Y = 220;

    /**
     * Ship constructor
     */
    var Ship = function(id, speed, energy, consumption, charging, radius) {
        // times of each second update
        this._timeUnit = 50;

        // the ship id
        this.id = id;
        this.energy = energy;
        // each update energy consumption
        this.consumption = consumption / this._timeUnit;
        // each update energy charging
        this.charging = charging / this._timeUnit;

        // the timer handle
        this._time = 0;
        // the degree of the ship in the coordinate
        this._degree = 0;
        // the ship orbit radius
        this._radius = BASIC_SHIP_RADIUS + radius;
        // init the ship
        this._init();
        // set the ship speed
        this._setSpeed(speed);
    };
    /**
     * _init() init the ship dom entity
     */
    Ship.prototype._init = function() {
        const container = document.getElementById("container");
        this._entity = document.createElement("div");
        this._entity.classList.add("ship");
        this._entity.innerHTML = "No." + this.id + "-" + this.energy + "%";
        container.appendChild(this._entity);
    };
    /**
     * command() recieve the cmd and do correspond action
     *
     * @param {String} cmd
     */
    Ship.prototype.command = function(cmd) {
        switch (cmd) {
            case "run": 
                this.run();
                break;
            case "stop": 
                this.stop();
                break;
            case "destory": 
                this.destory();
            default:
                break;
        }
    };
    /**
     * _setSpeed() calculate the ship degree speed
     */
    Ship.prototype._setSpeed = function(speed) {
        this.speed = speed;
        this._degreeSpeed = Math.asin(
                this.speed / (2 * this._timeUnit * this._radius)
                ) * 2;
    };
    /**
     * run() ship enter the run state
     */
    Ship.prototype.run = function() {
        this._time = window.setInterval(function(obj) {
            obj._run();
        }, 1000 / this._timeUnit, this);
    };
    /**
     * stop() ship enter the stop state
     */
    Ship.prototype.stop = function() {
        window.clearInterval(this._time);
    };
    /**
     * destory() destroy the ship and remove correspond dom object
     */
    Ship.prototype.destory = function() {
        this.state = "destory";
        this._entity.remove();
        return this.id;
    };
    /**
     * _nextpos() calculate the next postiont of the ship
     *
     * @return {Object}
     */
    Ship.prototype._nextpos = function() {
        this._degree = (this._degree + this._degreeSpeed) % (2 * Math.PI);
        return {
            x: - Math.cos(this._degree) * this._radius + SHIP_POS_BASIC_X,
            y: - Math.sin(this._degree) * this._radius + SHIP_POS_BASIC_Y
        };
    };
    /**
     * _run() update the ship to next postion
     */
    Ship.prototype._run = function() {
        this.energy = this.energy + this.charging - this.consumption;
        this.energy = this.energy >= 100? 100 : this.energy;
        this.energy = this.energy >= 0? this.energy : 0;
        if (this.energy > 0) {
            const nextPos = this._nextpos();
            this._entity.style.top = nextPos.y + "px";
            this._entity.style.left = nextPos.x + "px";
            this._entity.innerHTML = "No." + this.id + "-" + Math.ceil(this.energy) + "%";
            const deg = this._degree / Math.PI * 180;
            this._entity.style.transform = "rotateZ(" + deg + "deg)";
        } else {
            this._entity.innerHTML = "No." + this.id + "-" + this.energy + "%";
        } 
    }; 

    /**
     * the controller of the system
     */
    const Controller = {
        /**
         * int() init the basic info of the controller
         */
        "init": function() {
            // the ship and conrrespond set
            this._items = {};
            // the id can be reused
            this._reusedId = [];
            // the max id the system used
            this._lastId = 0;
            // the controller dom entity
            this._entity = document.getElementById("controller");
            const newButton = document.getElementById("controller-new-item");
            
            // binding the new ship command
            newButton.onclick = function() {
                Controller.createItem();
            };
        },
        /**
         * createItem() create a ship and its panel
         */
        "createItem": function() {
            // get the id
            let id;
            if (this._reusedId.length == 0) {
                id = this._lastId++;
            } else {
                id = this._reusedId.pop();
            }

            // the callback function for the panel
            const callback = function(obj, cmd) {
                let id = obj.parentElement.getAttribute("data");
                Controller.route(id, cmd);
            };
            this._items["" + id] = {};
            // create a panel
            this._createPanelItem(id, callback);
            // create a ship
            this._createShip(id);
        },
        /**
         * _createPanelItem() create a panel for the ship with "id"
         */
        "_createPanelItem": function(id, callback) {
            const item = document.createElement("div");
            item.classList.add("panel");
            item.setAttribute("data", id);

            // the panel name
            const text = document.createElement("span");
            text.innerHTML = "对" + id + "飞船下达指令：";
            item.appendChild(text);

            // the panel start button
            const startButton = document.createElement("button");
            startButton.classList.add("panel-start");
            startButton.innerHTML = "开始飞行";
            startButton.onclick = function() {
                callback(this, "run");
            };
            item.appendChild(startButton);

            // the panel stop button
            const stopButton = document.createElement("button");
            stopButton.classList.add("panel-stop");
            stopButton.innerHTML = "停止飞行";
            stopButton.onclick = function() {
                callback(this, "stop");
            };
            item.appendChild(stopButton);

            // the panel destroy button
            const destoryButton = document.createElement("button");
            destoryButton.classList.add("panel-destroy");
            destoryButton.innerHTML = "销毁";
            destoryButton.onclick = function() {
                callback(this, "destory");
            };
            item.appendChild(destoryButton);

            // record the panel
            this._items[id + ""]["panel"] = item;
            this._entity.appendChild(item);
        },
        /**
         * _createShip() create a ship with give parameters
         */
        "_createShip": function(id, speed, energy, consumption, charging,
                radius) {
            // set ship parameters
            let _speed = speed || Math.ceil(Math.random() * 100);
            let _energy = energy || Math.ceil(Math.random() * 100);
            let _consumption = consumption || Math.ceil(Math.random() * 10);
            let _charging = charging || _consumption - Math.random() * 2 + 1;
            let _radius = radius || Math.ceil(Math.random() * 150);

            // create a ship
            this._items[id + ""]["ship"] = new Ship(
                    id, _speed, _energy, _consumption, _charging, _radius
                    );
            this._items[id + ""]["ship"].run();
        },
        /**
         * route() route the system comand
         */
        "route": function(id, cmd) {
            this._items[id + ""]["ship"].command(cmd);
            if (cmd == 'destory') {
                this._items[id + ""]["panel"].remove();
                this._reusedId.push(id);
                delete this._items[id + ""];
            }
        }
    };

    Controller.init();
})();
