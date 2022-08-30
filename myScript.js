const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
ctx.strokeStyle = 'black'
ctx.lineWidth = 1;

for (var i = 0; i <= 20; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * 30)
    ctx.lineTo(600, i * 30)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(i * 30, 0)
    ctx.lineTo(i * 30, 600)
    ctx.stroke()
}

ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 150, 75);
