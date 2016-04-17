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
    var Ship = function(id, energy, speed, consumption, charging, radius) {
        this.id = id;
        this.speed = speed || Math.ceil(Math.random() * 100);
        this.energy = energy || Math.ceil(Math.random() * 100);
        this.consumption = consumption || Math.ceil(Math.random() * 10);
        this.charging = charging || this.consumption - Math.random() * 2 + 1;

        // the ship orbit radius
        this.radius = radius || Math.ceil(Math.random() * 150);
        this.radius = BASIC_SHIP_RADIUS + this.radius;

        // times of each second update
        this._timeUnit = 50;
        // the degree of the ship in the coordinate
        this._degree = 0;
        // init the ship
        this._init();
        // set the ship speed
        this._setSpeed();
        // _state
        this._state = "stop";
        this._time = window.setInterval(function(obj) {
            obj._run();
        }, 1000 / this._timeUnit, this);
    };
    /**
     * _setSpeed() calculate the ship degree speed
     */
    Ship.prototype._setSpeed = function() {
        // each update energy consumption
        this.consumption = this.consumption / this._timeUnit;
        // each update energy charging
        this.charging = this.charging / this._timeUnit;
        // set degree speed
        this._degreeSpeed = Math.asin(
                this.speed / (2 * this._timeUnit * this.radius)
                ) * 2;
    };
    /**
     * _init() init the ship dom entity
     */
    Ship.prototype._init = function() {
        const container = document.getElementById("container");
        this._entity = document.createElement("div");
        this._entity.style.top = SHIP_POS_BASIC_Y + "px";
        this._entity.style.left = SHIP_POS_BASIC_X + this.radius + "px"; 
        this._entity.classList.add("ship");
        this._entity.innerHTML = "No." + this.id + "-" + this.energy + "%";
        container.appendChild(this._entity);
    };
    /**
     * command() recieve the cmd and do correspond action
     *
     * @param {String} msg
     */
    Ship.prototype.command = function(msg) {
        const id = Number(msg.slice(0, 4)) + "";
        const cmd = msg.slice(4);
        if (id != this.id) {
            return;
        }
        switch (cmd) {
            case "0001": 
                this.run();
                break;
            case "0010": 
                this.stop();
                break;
            case "1100": 
                this.destroy();
            default:
                break;
        }
    };
    /**
     * run() ship enter the run state
     */
    Ship.prototype.run = function() {
        if (this._state == "stop") {
            this._state = "run";
        }
    };
    /**
     * stop() ship enter the stop state
     */
    Ship.prototype.stop = function() {
        // window.clearInterval(this._time);
        this._state = "stop";
    };
    /**
     * destroy() destroy the ship and remove correspond dom object
     */
    Ship.prototype.destroy = function() {
        this._state = "destroy";
    };
    /**
     * _nextpos() calculate the next postiont of the ship
     *
     * @return {Object}
     */
    Ship.prototype._nextpos = function() {
        this._degree = (this._degree + this._degreeSpeed) % (2 * Math.PI);
        return {
            x: Math.cos(this._degree) * this.radius + SHIP_POS_BASIC_X,
            y: Math.sin(this._degree) * this.radius + SHIP_POS_BASIC_Y
        };
    };
    /**
     * _run() update the ship to next postion
     */
    Ship.prototype._run = function() {
        this.energy += this.charging;
        if (this.energy >= this.consumption && this._state == "run") {
            const nextPos = this._nextpos();
            this._entity.style.top = nextPos.y + "px";
            this._entity.style.left = nextPos.x + "px";
            const deg = this._degree / Math.PI * 180;
            this._entity.style.transform = "rotateZ(" + deg + "deg)";
            this.energy -= this.consumption;
        }
        this._entity.innerHTML = "No." + this.id + "-" + Math.floor(this.energy) + "%";
        this.energy = this.energy >= 100? 100 : this.energy;
        this.energy = this.energy >= 0? this.energy : 0;
        if (this._state == "destroy") {
            this._entity.remove();
            window.clearInterval(this._time);
        }
        this._broadcast();
    }; 
    /**
     * _broadcase() ship broadcast the info to planet
     */
    Ship.prototype._broadcast = function() {
        let msg = Number(this.id).toString(2);
        while (msg.length < 4) {
            msg = "0" + msg;
        }
        switch(this._state) {
            case "stop":
                msg += "0010";
                break;
            case "run":
                msg += "0001";
                break;
            case "destroy":
                msg += "1100";
                break;
            default:
                msg += "0010";
                break;
        }
        let tmp = Math.floor(this.energy).toString(2);
        while (tmp.length < 8) {
            tmp = "0" + tmp;
        }
        msg += tmp;
        Mediator.shipSpread(msg);
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
        },
        /**
         * createItem() create a ship and its panel
         */
        "createItem": function() {
            if (Object.keys(this._items).length >= 4) {
                return -1 + "";
            }
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
                Controller.adapter({
                    "id": id,
                    "cmd": cmd
                }, "send");
            };
            this._items["" + id] = {};
            // create a panel
            this._createPanelItem(id, callback);
            return id + "";
        },
        "destroyItem": function(id) {
            const tr = document.getElementById("board-table-" + id);
            tr.remove();
            this._items[id].remove();
            this._reusedId.push(id);
            delete this._items[id + ""];
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
            const destroyButton = document.createElement("button");
            destroyButton.classList.add("panel-destroy");
            destroyButton.innerHTML = "销毁";
            destroyButton.onclick = function() {
                callback(this, "destroy");
            };
            item.appendChild(destroyButton);

            // record the panel
            this._items[id + ""] = item;
            this._entity.appendChild(item);
        },
        /**
         * updateBoard() update the board state
         *
         * @param {String} id
         * @param {String} state
         * @param {String} energy
         */
        "updateBoard": function(id, state, energy) {
            const table = document.getElementById("board-table");
            const ele = document.getElementById("board-table-" + id);
            ele.children[3].innerHTML = state;
            ele.children[4].innerHTML = energy + "%";
        },
        /**
         * adapter() tranlate the info to bus or bus to info
         */
        "adapter": function(info, direction) {
            if (direction == "send") {
                let msg = "000" + info["id"];
                switch(info["cmd"]) {
                    case "run":
                        msg += "0001";
                        break;
                    case "stop":
                        msg += "0010";
                        break;
                    case "destroy":
                        msg += "1100";
                        break;
                    default:
                        return;
                }
                Mediator.planetSpread(msg);
            } else {
                const id = parseInt(info.slice(0, 4), 2) + "";
                const state = info.slice(4, 8);
                const energy = parseInt(info.slice(8), 2) + "";
                let tmp;
                switch(state) {
                    case "0010":
                        tmp = "停止";
                        break;
                    case "0001":
                        tmp = "运行中";
                        break;
                    case "1100":
                        this.destroyItem(id);
                        break;
                    default:
                        return;
                }
                this.updateBoard(id, tmp, energy);
            }
        },
        /**
         * route() route the recieved info
         */
        "route": function(msg) {
            this.adapter(msg, "recieve");
        }
    };

    const Ships = {
        "ships": {},
        /**
         * route() manage the message to the ship
         */
        "route": function(msg) {
            for (var key in this.ships) {
                this.ships[key].command(msg);
            }
            if (msg.slice(4) == "1100") {
                const id = Number(msg.slice(0, 4)) + "";
                delete this.ships[id];
            }
        },
        /**
         * _createShip() create a ship with give parameters
         */
        "createShip": function(id, speed, energy, consumption, charging,
                radius) {
            // create a ship
            this.ships[id + ""] = new Ship(
                    id, speed, energy, consumption, charging, radius
                    );
        }
    };
    const Mediator = {
        /**
         * planetSpread() spread the info mation to ship
         */
        "planetSpread": function (msg) {
            // assumption the create info will not lost
            let probability = Math.random();
            // retrasmission
            while (probability < 0.1) {
                probability = Math.random();
            }
            window.setTimeout(function() {
                Ships.route(msg);
            }, 300);
        },
        /**
         * shipSpread() spread the infomation to the plante
         */
        "shipSpread": function(msg) {
            // assumption the create info will not lost
            let probability = Math.random();
            // retrasmission
            while (probability < 0.1) {
                probability = Math.random();
            }
            Controller.route(msg);
        }
    };

    Controller.init();

    /**
     * engine category
     */
    const EngineCategory = {
        "0": {speed: 30, consumption: 5, name: "前进号"},
        "1": {speed: 40, consumption: 7, name: "奔腾号"},
        "2": {speed: 80, consumption: 9, name: "超越号"}
    };
    /**
     * energy category
     */
    const EnergyCategory = {
        "0": {charging: 2, name: "劲量型"},
        "1": {charging: 3, name: "光能型"},
        "2": {charging: 4, name: "永久型"}
    };
    const newButton = document.getElementById("controller-new-item");
    // binding the new ship command
    newButton.onclick = function() {
        const id = Controller.createItem();
        if (id != "-1") {
            // get the engine type
            const engine = document.getElementsByName("engine");
            let selectedEngine;
            for (var i = 0; i < engine.length; i++) {
                if (engine[i].checked) {
                    selectedEngine = EngineCategory[engine[i].value];
                    break;
                }
            }
            // get the energy
            const energy = document.getElementsByName("energy");
            let selectedEnergy;
            for (var i = 0; i < energy.length; i++) {
                if (energy[i].checked) {
                    selectedEnergy = EnergyCategory[energy[i].value];
                    break;
                }
            }
            // create a board item
            const table = document.getElementById("board-table");
            const tr = document.createElement("tr");
            tr.id = "board-table-" + id;
            tr.innerHTML = "<td>" + id + "号飞船</td>";
            tr.innerHTML += "<td>" + selectedEngine.name + "</td>";
            tr.innerHTML += "<td>" + selectedEnergy.name + "</td>";
            tr.innerHTML += "<td>" + "停止" + "</td>";
            tr.innerHTML += "<td>" + "100%" + "</td>";
            table.appendChild(tr);
            Ships.createShip(
                    id, 
                    100, 
                    selectedEngine.speed, 
                    selectedEngine.consumption, 
                    selectedEnergy.charging
                    );
        }
    };
})();
