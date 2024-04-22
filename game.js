function generate() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var levels = parseInt(document.getElementById("levels").value);
    var branches = parseInt(document.getElementById("branches").value);

    if (levels < 2 || levels > 5 || branches < 2 || branches > 5) {
        alert("Levels must be between 2 and 5, Branches must be between 2 and 5.");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTree(ctx, canvas.width / 2, canvas.height, -Math.PI / 2, 100, levels, branches); // 传递 flowersLevels 参数
}

function drawTree(ctx, x, y, angle, length, levels, branches) {
    if (levels <= 0) return;

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "green";
    ctx.lineWidth = levels;
    ctx.moveTo(x, y);
    var endX = x + Math.cos(angle) * length;
    var endY = y + Math.sin(angle) * length;
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  
  var randomNumber = Math.random();
  
  if (levels === 1) {
        if (randomNumber < 0.5) {
        drawFlower(ctx, endX, endY); // 50% 的概率调用 drawFlower
    } else {
        drawFlower2(ctx, endX, endY); // 50% 的概率调用 drawFlower2
    }
  }
  else if(levels === 2){
        if (randomNumber < 0.5) {
        drawFlower(ctx, endX, endY); // 50% 的概率调用 drawFlower
    } else {
        drawFlower2(ctx, endX, endY); // 50% 的概率调用 drawFlower2
    }
  }

    for (var i = 0; i < branches; i++) {
        var newAngle = angle + (Math.random() - 0.5) * 2 * Math.PI / 3;
        var newLength = length * (0.7 + Math.random() * 0.3);
        drawTree(ctx, endX, endY, newAngle, newLength, levels - 1, branches);
    }
}


function drawFlower(ctx, x, y) {
      var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  
    ctx.beginPath();

    ctx.fillStyle = randomColor;
  
    ctx.moveTo(x, y);
    ctx.arc(x, y, 5, 0, Math.PI * 2); // 花朵是一个直径为 10px 的圆
    ctx.fill();
}

function drawFlower2(ctx, x, y) {
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  
    ctx.beginPath();
    ctx.fillStyle = randomColor;
    
    var radius = 7; // 三角形的半径

    // 计算三角形的三个顶点
    var p1 = { x: x, y: y - radius };
    var p2 = { x: x - radius * Math.cos(Math.PI / 6), y: y + radius * Math.sin(Math.PI / 6) };
    var p3 = { x: x + radius * Math.cos(Math.PI / 6), y: y + radius * Math.sin(Math.PI / 6) };

    // 绘制三角形
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();
}

function changeBackgroundColor() {
    var color = document.getElementById("background-color").value;
    document.body.style.backgroundColor = color;
}