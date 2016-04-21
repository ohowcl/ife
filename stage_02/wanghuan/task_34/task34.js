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
        case "tralef":
            if(this.col === 1){break;}
            tabledates[this.row][this.col].hide();
            this.col = this.col - 1;
            tabledates[this.row][this.col].show();
            break;
        case "tratop":
            if(this.row === 1){break;}
            tabledates[this.row][this.col].hide();
            this.row = this.row - 1;
            tabledates[this.row][this.col].show();
            break;
        case "trarig":
            if(this.col === 10){break;}
            tabledates[this.row][this.col].hide();
            this.col = this.col + 1;
            tabledates[this.row][this.col].show();
            break;
        case "trabot":
            if(this.row === 10){break;}
            tabledates[this.row][this.col].hide();
            this.row = this.row + 1;
            tabledates[this.row][this.col].show();
            break;
        case "movlef":
            if(this.col === 1){break;}
            tabledates[this.row][this.col].hide();
            this.row = this.row + 1;
            tabledates[this.row][this.col].show();
            break;
        case "movtop":
            if(this.row === 1){break;}
            tabledates[this.row][this.col].hide();
            this.row = this.row - 1;
            tabledates[this.row][this.col].show();
            break;
        case "movrig":
            if(this.col === 10){break;}
            tabledates[this.row][this.col].hide();
            this.col = this.col + 1;
            tabledates[this.row][this.col].show();
            break;
        case "movbot":
            if(this.row === 10){break;}
            tabledates[this.row][this.col].hide();
            this.row = this.row + 1;
            tabledates[this.row][this.col].show();
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

        if(inputCommand === "tra lef") {
            moveDate.move("tralef");
        } else if(inputCommand === "tra top") {
            moveDate.move("tratop");
        } else if(inputCommand === "tra rig") {
            moveDate.move("trarig");
        } else if(inputCommand === "tra bot") {
            moveDate.move("trabot");
        } else if(inputCommand === "mov lef") {
            moveDate.move("movlef");
        }else if(inputCommand === "mov top") {
            moveDate.move("movtop");
        }else if(inputCommand === "mov rig") {
            moveDate.move("movrig");
        }else if(inputCommand === "mov bot") {
            moveDate.move("movbot");
        }else{
            alert("input error!");
        }
    });
}
