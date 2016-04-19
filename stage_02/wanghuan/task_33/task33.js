var tabledates = [];

/**
 * 表格中每个td的构造函数
 * 参数：
 * row：表格中每个格子的横坐标
 * col：表格中每个格子的纵坐标
 * td：表格中每个格子对应的td
 * deg:表示旋转的度数
*/
function Tabledate(row,col) {
    this.row = row;
    this.col = col;
    this.td = document.getElementsByTagName('td')[row*11 + col];
    this.deg = 0;
}

/**
 *td的构造函数的原型函数show
 *用于动态展示td中的div
*/
Tabledate.prototype.show = function() {
    divSpe = document.createElement("div");
    divSpe.setAttribute("class","divSpecial");
    this.td.appendChild(divSpe);
};

Tabledate.prototype.rotato = function(degThis) {
    this.deg = this.deg + degThis;
    this.td.firstChild.style.transform = "rotate(" + this.deg + "deg)";
};

/**
 *td的构造函数的原型函数hide
 *用于删除td中的div
*/
Tabledate.prototype.hide = function() {
    this.td.removeChild(this.td.firstChild);
};

/**
 *移动格子的构造函数
 *参数：
 *row：移动格子横坐标
 *col：移动格子纵坐标
 *direct：移动格子移动方向，默认方向向上
*/
function MoveDate(row,col) {
    this.row = row;
    this.col = col;
    this.direct = 0;
}

MoveDate.prototype.show2 = function() {
    tabledates[this.row][this.col].show();
};

MoveDate.prototype.move = function(sel) {
    switch (sel) {
        case "go":
            switch (this.direct) {
                // 向上走
                case 0:
                    if(this.row === 1) {break;}
                    tabledates[this.row][this.col].hide();
                    this.row --;
                    tabledates[this.row][this.col].show();
                    break;
                // 向右走
                case 1:
                    if(this.col === 10) {break;}
                    tabledates[this.row][this.col].hide();
                    this.col ++;
                    tabledates[this.row][this.col].show();
                    break;
                // 向下走
                case 2:
                    if(this.row === 10) {break;}
                    tabledates[this.row][this.col].hide();
                    this.row ++;
                    tabledates[this.row][this.col].show();
                    break;
                // 向左走
                case 3:
                    if(this.col === 1) {break;}
                    tabledates[this.row][this.col].hide();
                    this.col --;
                    tabledates[this.row][this.col].show();
                    break;
            }
            break;
        case "right":
            tabledates[this.row][this.col].rotato(90);
            this.direct = (this.direct + 1) % 4;
            break;
        case "back":
            tabledates[this.row][this.col].rotato(180);
            this.direct = (this.direct + 2) % 4;
            break;
        case "left":
            tabledates[this.row][this.col].rotato(-90);
            this.direct = (this.direct + 3) % 4;
            break;
    }
};

init();

function init() {
    var inputSubmit = document.getElementById('inputSubmit'),
        i,
        j;

    // 初始化对象数组
    for(i = 0;i < 11;i++) {
        tabledates[i] = [];
        for(j = 0;j < 11;j++) {
            tabledates[i][j] = new Tabledate(i,j);
        }
    }
    // 初始化一个活动节点
    moveDate = new MoveDate(5,6);
    moveDate.show2();

    inputSubmit.addEventListener("click",function(){
        // 获取文本框的值，并转换成小写
        var inputCommand = document.getElementById('inputCommand').value.trim().toLowerCase();

        if(inputCommand === "go") {
            moveDate.move("go");
        } else if(inputCommand === "tun lef") {
            moveDate.move("left");
        } else if(inputCommand === "tun rig") {
            moveDate.move("right");
        } else if(inputCommand === "tun bac") {
            moveDate.move("back");
        } else{
            alert("input error!");
        }
    });
}
