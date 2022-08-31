const color = [
    '#FFC0C0', '#FFFFC0', '#C0FFC0', '#C0FFFF', '#C0C0FF', '#FFC0FF',
    '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
    '#C00000', '#C0C000', '#00C000', '#00C0C0', '#0000C0', '#C000C0',
    '#FFFFFF', '#000000'
]

const pallete = document.getElementById('myPallete');
const ptx     = pallete.getContext("2d");
ptx.strokeStyle = color[19]
ptx.fillStyle   = color[19]
ptx.lineWidth   = "1";

const canvas = document.getElementById('myCanvas');
const ctx    = canvas.getContext("2d");
ctx.strokeStyle = color[19]
ctx.fillStyle   = color[18]
ctx.lineWidth   = "0.5";

const palleteSize = 60
const myColorSize = 60
const canvasSize  = 30
var canvasN     = 30

var canvasColor = []
var palleteColor = 18

const nowColor = document.getElementById('myNowColor');
const ntx      = nowColor.getContext("2d");
ntx.strokeStyle = color[19]
ntx.fillStyle   = color[palleteColor]
ntx.lineWidth   = "1";

for(var i = 0; i < 6; i++) 
{
    for(var j = 0; j < 3; j++) 
    {
        ptx.fillStyle = color[i + j * 6]
        ptx.fillRect  (i * palleteSize, j * palleteSize, palleteSize, palleteSize);
        ptx.strokeRect(i * palleteSize, j * palleteSize, palleteSize, palleteSize);
    }
}
ptx.fillStyle = color[18]
ptx.fillRect  (0, 3 * palleteSize, 3 * palleteSize, palleteSize);
ptx.strokeRect(0, 3 * palleteSize, 3 * palleteSize, palleteSize);
ptx.fillStyle = color[19]
ptx.fillRect  (3 * palleteSize, 3 * palleteSize, 3 * palleteSize, palleteSize);
ptx.strokeRect(3 * palleteSize, 3 * palleteSize, 3 * palleteSize, palleteSize);

ntx.fillRect  (0, 0, myColorSize, myColorSize);
ntx.strokeRect(0, 0, myColorSize, myColorSize);

for(var i = 0; i < canvasN; i++) 
{
    var temp = []
    for(var j = 0; j < canvasN; j++)
    {
        ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize);
        temp.push(18)
    }
    canvasColor.push(temp);
}

var canvasMouseDown = false;
canvas.onmousedown = function(event)
{
    canvasMouseDown = true;
}
canvas.onmousemove = function(event)
{
    if(canvasMouseDown)
    {
        const x = event.clientX + window.pageXOffset - ctx.canvas.offsetLeft;
        const y = event.clientY + window.pageYOffset - ctx.canvas.offsetTop;
        
        ctx.fillStyle = ntx.fillStyle
        for(var i = 0; i < 20; i++)
        {
            if(color[i] == ctx.fillStyle)
            {
                canvasColor[parseInt(x / canvasN)][parseInt(y / canvasN)] = i;
            }
        }
        ctx.fillRect  (parseInt(x / canvasN) * canvasSize, parseInt(y / canvasN) * canvasSize, canvasSize, canvasSize);
        ctx.strokeRect(parseInt(x / canvasN) * canvasSize, parseInt(y / canvasN) * canvasSize, canvasSize, canvasSize);
    }
}
canvas.onmouseup = function(event)
{
    canvasMouseDown = false;
}
canvas.onclick = function(event)
{
    const x = event.clientX + window.pageXOffset - ctx.canvas.offsetLeft;
    const y = event.clientY + window.pageYOffset - ctx.canvas.offsetTop;
    
    ctx.fillStyle = ntx.fillStyle
    for(var i = 0; i < 20; i++)
    {
        if(color[i] == ctx.fillStyle)
        {
            canvasColor[parseInt(x / canvasN)][parseInt(y / canvasN)] = i;
        }
    }
    ctx.fillRect  (parseInt(x / canvasN) * canvasSize, parseInt(y / canvasN) * canvasSize, canvasSize, canvasSize);
    ctx.strokeRect(parseInt(x / canvasN) * canvasSize, parseInt(y / canvasN) * canvasSize, canvasSize, canvasSize);
}

pallete.onclick = function(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    for(var i = 0; i < 6; i++) 
    {
        if(i * palleteSize <= x && (i + 1) * palleteSize > x)
        {
            for(var j = 0; j < 3; j++) 
            {
                if(j * palleteSize <= y && (j + 1) * palleteSize > y)
                {
                    ntx.fillStyle = color[i + j * 6]
                }
            }
        }
    }
    if(0 <= x && x < 3 * palleteSize && 3 * palleteSize <= y && 4 * palleteSize > y)
    {
        ntx.fillStyle = color[18]
    }
    if(3 * palleteSize <= x && x < 6 * palleteSize && 3 * palleteSize <= y && 4 * palleteSize > y)
    {
        ntx.fillStyle = color[19]
    }
    ntx.fillRect  (0, 0, myColorSize, myColorSize);
    ntx.strokeRect(0, 0, myColorSize, myColorSize);
}
