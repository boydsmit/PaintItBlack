let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let colorSelection = 0xf;
let ega = ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#555555", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#ffffff"];
let pallet = [];
let drawing= [];
let jsonString = '[{"x":0,"y":0,"color":1,"colorBit":false},{"x":100,"y":0,"color":1,"colorBit":false},{"x":200,"y":0,"color":2,"colorBit":false},{"x":300,"y":0,"color":2,"colorBit":false},{"x":400,"y":0,"color":3,"colorBit":false},{"x":500,"y":0,"color":3,"colorBit":false},{"x":600,"y":0,"color":4,"colorBit":false},{"x":700,"y":0,"color":4,"colorBit":false},{"x":0,"y":100,"color":5,"colorBit":false},{"x":100,"y":100,"color":5,"colorBit":false},{"x":200,"y":100,"color":6,"colorBit":false},{"x":300,"y":100,"color":6,"colorBit":false},{"x":400,"y":100,"color":7,"colorBit":false},{"x":500,"y":100,"color":7,"colorBit":false},{"x":600,"y":100,"color":8,"colorBit":false},{"x":700,"y":100,"color":8,"colorBit":false},{"x":0,"y":200,"color":9,"colorBit":false},{"x":100,"y":200,"color":9,"colorBit":false},{"x":200,"y":200,"color":10,"colorBit":false},{"x":300,"y":200,"color":10,"colorBit":false},{"x":400,"y":200,"color":11,"colorBit":false},{"x":500,"y":200,"color":11,"colorBit":false},{"x":600,"y":200,"color":12,"colorBit":false},{"x":700,"y":200,"color":12,"colorBit":false},{"x":0,"y":300,"color":13,"colorBit":false},{"x":100,"y":300,"color":13,"colorBit":false},{"x":200,"y":300,"color":14,"colorBit":false},{"x":300,"y":300,"color":15,"colorBit":false},{"x":400,"y":300,"color":15,"colorBit":false},{"x":500,"y":300,"color":15,"colorBit":false},{"x":600,"y":300,"color":15,"colorBit":false},{"x":700,"y":300,"color":15,"colorBit":false},{"x":0,"y":400,"color":15,"colorBit":false},{"x":100,"y":400,"color":15,"colorBit":false},{"x":200,"y":400,"color":15,"colorBit":false},{"x":300,"y":400,"color":15,"colorBit":false},{"x":400,"y":400,"color":15,"colorBit":false},{"x":500,"y":400,"color":15,"colorBit":false},{"x":600,"y":400,"color":15,"colorBit":false},{"x":700,"y":400,"color":15,"colorBit":false},{"x":0,"y":500,"color":15,"colorBit":false},{"x":100,"y":500,"color":15,"colorBit":false},{"x":200,"y":500,"color":15,"colorBit":false},{"x":300,"y":500,"color":15,"colorBit":false},{"x":400,"y":500,"color":15,"colorBit":false},{"x":500,"y":500,"color":15,"colorBit":false},{"x":600,"y":500,"color":15,"colorBit":false},{"x":700,"y":500,"color":15,"colorBit":false},{"x":0,"y":600,"color":15,"colorBit":false},{"x":100,"y":600,"color":15,"colorBit":false},{"x":200,"y":600,"color":15,"colorBit":false},{"x":300,"y":600,"color":15,"colorBit":false},{"x":400,"y":600,"color":15,"colorBit":false},{"x":500,"y":600,"color":15,"colorBit":false},{"x":600,"y":600,"color":15,"colorBit":false},{"x":700,"y":600,"color":15,"colorBit":false},{"x":0,"y":700,"color":15,"colorBit":false},{"x":100,"y":700,"color":15,"colorBit":false},{"x":200,"y":700,"color":15,"colorBit":false},{"x":300,"y":700,"color":15,"colorBit":false},{"x":400,"y":700,"color":15,"colorBit":false},{"x":500,"y":700,"color":15,"colorBit":false},{"x":600,"y":700,"color":15,"colorBit":false},{"x":700,"y":700,"color":15,"colorBit":false}]';
class Bit {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.colorBit = false;// boolean
        addEventListener('mousedown', (e) => {
            let box = canvas.getBoundingClientRect();
            let mouseX = e.clientX - box.left;
            let mouseY = e.clientY - box.top;
            if (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y && mouseY < this.y + 100) {
                if (this.colorBit) {
                    colorSelection = this.color;
                } else {
                    this.color = colorSelection;
                    this.draw(context);
                    writeJson();
                }
            }
        })
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = ega[this.color];
        context.rect(this.x, this.y, 100, 100);
        context.stroke();
        context.fill();
        context.closePath();
    }
}

function init() {
    for (let i = 0; i < 0x10; i++) {
        let numOnRow = 2;
        let bitWidth = 100;
        let x = 800 + (i % numOnRow) * bitWidth;
        let y = Math.floor(i / numOnRow) * bitWidth;
        let bit = new Bit(x, y, i);
        bit.colorBit = true;
        bit.draw(context);
        pallet.push(bit);
    }

    console.log(pallet);

    for (i = 0; i < 64; i++) {
        let numOnRow = 8;
        let bitWidth = 100;
        let x = (i % numOnRow) * bitWidth;
        let y = Math.floor(i / numOnRow) * bitWidth;
        let bit = new Bit(x, y, 0xf);
        bit.draw(context);
        drawing[i] = bit;
    }
}
function refresh(){
    ajax("getJson");
}
function writeJson(){
    let drawExport = JSON.stringify(drawing);
    ajax("putJson",drawExport);
}
function refreshAuto(){
    window.setInterval(function(){
        refresh();
        console.log("Json written, drawing saved.");
    }, 2000);
}
function readJson(jsonString) {
    jsonObj = JSON.parse(jsonString);
    for (i = 0; i < 64; i++) {
        drawing[i].x = jsonObj[i].x;
        drawing[i].y = jsonObj[i].y;
        drawing[i].color = jsonObj[i].color;
        drawing[i].draw(context);
    }}
init();
refreshAuto();