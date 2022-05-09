const oneGrid=50;
const tableCanvas=800
const squareCanvas=800
const circleCanvas=500
var btn2 = document.getElementById('btn2')
var btn3 = document.getElementById('btn3')
var btn4 = document.getElementById('btn4')
var located = document.getElementById('show');
btn2.addEventListener('click', addSquare)
btn3.addEventListener('click', addCircle)
btn4.addEventListener('click', addWord)
located.addEventListener('mousemove', mouselocated)

var clear = document.getElementById('clear').addEventListener('click', () => {
    var canvas = document.getElementById('square');
    document.getElementById('inputX').value = '';
    document.getElementById('inputY').value = '';
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.width
})
//創建方格
function addTable() {
    var canvas = document.getElementById('table');
    var ctx = canvas.getContext('2d');
    for (var i = oneGrid; i < tableCanvas; i += oneGrid) {
        ctx.setLineDash([5, 5.5]);
        ctx.moveTo(0, i);
        ctx.lineTo(tableCanvas, i);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray";
        ctx.stroke();
    }
    for (var i = oneGrid; i < tableCanvas; i += oneGrid) {
        ctx.setLineDash([5, 5.5]);
        ctx.moveTo(i, 0);
        ctx.lineTo(i, tableCanvas);
        ctx.strokeStyle = "gray";
        ctx.stroke();
    }

}
//創建實心格子(Die)
function addSquare() {
    var inputX = document.getElementById('inputX').value * 50
    var inputY = document.getElementById('inputY').value * 50
    if (inputX == 0 || inputY == 0) {
        alert('請輸入XY值')
    } else {
        for (var i = 0; i <= squareCanvas; i += inputX) {
            for (var j = 0; j <= squareCanvas; j += inputY) {
                var canvas = document.getElementById('square');
                var ctx = canvas.getContext('2d');
                ctx.moveTo(i, j);
                ctx.lineTo(i + inputX, j);
                ctx.lineTo(i + inputX, j + inputY);
                ctx.lineTo(i, j + inputY);
                ctx.lineTo(i, j);
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
        }
    }
}
//創建圓形
function addCircle() {
    var canvas = document.getElementById('circle');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(circleCanvas/2, circleCanvas/2, 250, 0, 2 * Math.PI);
    ctx.fillStyle = "#d8d8d8";
    ctx.strokeStyle = "#d8d8d8";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(circleCanvas/2, circleCanvas/2, 235, 0, 2 * Math.PI);
    ctx.fillStyle = "#f1f1f1";
    ctx.fill();
    ctx.stroke();


    var selectItem = document.getElementById("select");
    var index = selectItem.selectedIndex;
    var selectValue = selectItem.options[index].value
    //top:250,0  bottom:250,500 left:0,250 right:500,250
    if (selectValue == 'top') {
        createLittleCircle(250, 0)
    }
    else if (selectValue == 'bottom') {
        createLittleCircle(250, 500)
    }
    else if (selectValue == 'left') {
        createLittleCircle(0, 250)
    } else {
        createLittleCircle(500, 250)
    }

}
//新增座標文字
function addWord() {
    var quadrantX = document.getElementById('quadrantX').value
    var quadrantY = document.getElementById('quadrantY').value
    var c = document.getElementById("wordX");
    var cy = document.getElementById('wordY')
    var ctx = c.getContext("2d");
    var cty = cy.getContext("2d");
    ctx.font = "50px";
    cty.font = "50px";
    ctx.clearRect(0, 0, c.width, c.height);
    cty.clearRect(0, 0, cy.width, cy.height);
    if (quadrantX == 'normal') {
        var pos = 1
        for (var i = -4; i < 5; i++) {
            ctx.fillText(i, 50 * pos, 10);
            pos++
        }
    } else {
        var pos = 1
        for (var i = 4; i > -5; i--) {
            ctx.fillText(i, 50 * pos, 10);
            pos++
        }
    }
    if (quadrantY == 'normal') {
        var pos = 1
        for (var i = 4; i > -5; i--) {
            cty.fillText(i, 5, 50 * pos);
            pos++
        }
    } else {
        var pos = 1
        for (var i = -4; i < 5; i++) {
            cty.fillText(i, 5, 50 * pos);
            pos++
        }
    }
}
//小圓位置
function createLittleCircle(x, y) {
    var canvas = document.getElementById('circle');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white"
    ctx.fill();
    ctx.stroke();
}
//滑鼠位置
function mouselocated(e) {
    var X, Y
    var quadrantX = document.getElementById('quadrantX').value
    var quadrantY = document.getElementById('quadrantY').value
    var x = e.offsetX;
    var y = e.offsetY;
    if (quadrantX == 'reverse') {
        X = (parseInt(x / 50) - 5) * -1
    } else {
        X = (parseInt(x / 50) - 5)
    }
    if (quadrantY == 'reverse') {
        Y = (parseInt(y / 50) - 5)
    } else {
        Y = (parseInt(y / 50) - 5) * -1
    }
    var located = document.getElementById('located')
    located.innerHTML = "滑鼠位置:[" + X.toString() + "," + Y.toString() + "]"
}
//onload時 執行表格，圓形，座標文字的創建
window.onload = () => {
    addTable(),
        addCircle(),
        addWord()
}

