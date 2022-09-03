const color = [
    '#ffc0c0', '#ffffc0', '#c0ffc0', '#c0ffff', '#c0c0ff', '#ffc0ff',
    '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
    '#c00000', '#c0c000', '#00c000', '#00c0c0', '#0000c0', '#c000c0',
    '#ffffff', '#000000'
]

const pallete = document.getElementById('myPallete')
const ptx     = pallete.getContext("2d")
ptx.strokeStyle = color[19]
ptx.fillStyle   = color[19]
ptx.lineWidth   = "1"

const canvas = document.getElementById('myCanvas')
const ctx    = canvas.getContext("2d")
ctx.strokeStyle = color[19]
ctx.fillStyle   = color[18]
ctx.lineWidth   = "0.5"

const palleteSize = 60
const myColorSize = 60
const canvasSize  = 30
var canvasColor   = []
var palleteColor  = 18

const nowColor = document.getElementById('myNowColor')
const ntx      = nowColor.getContext("2d")
ntx.strokeStyle = color[19]
ntx.fillStyle   = color[palleteColor]
ntx.lineWidth   = "1"

const widthSlider = document.getElementById("myWidth");
const canvasWidth = document.getElementById("canvasWidth");
canvasWidth.innerHTML = widthSlider.value;
var canvasW = widthSlider.value;

const heightSlider = document.getElementById("myHeight");
const canvasHeight = document.getElementById("canvasHeight");
canvasHeight.innerHTML = heightSlider.value;
var canvasH = heightSlider.value;

widthSlider.oninput = function() {
    canvasWidth.innerHTML = this.value;
    canvasW = widthSlider.value;
    ctx.fillStyle = color[18]
    ctx.fillRect(0, 0, 3000, 3000)
    for(var i = 0; i < canvasW; i++) 
    {
        for(var j = 0; j < canvasH; j++)
        {
            ctx.fillStyle = color[canvasColor[i][j]]
            ctx.fillRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
            ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
        }
    }
}

heightSlider.oninput = function() {
    canvasHeight.innerHTML = this.value;
    canvasH = heightSlider.value;
    ctx.fillStyle = color[18]
    ctx.fillRect(0, 0, 3000, 3000)
    for(var i = 0; i < canvasW; i++) 
    {
        for(var j = 0; j < canvasH; j++)
        {
            ctx.fillStyle = color[canvasColor[i][j]]
            ctx.fillRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
            ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
        }
    }
}

//initiate
for(var i = 0; i < 6; i++) 
{
    for(var j = 0; j < 3; j++) 
    {
        ptx.fillStyle = color[i + j * 6]
        ptx.fillRect  (i * palleteSize, j * palleteSize, palleteSize, palleteSize)
        ptx.strokeRect(i * palleteSize, j * palleteSize, palleteSize, palleteSize)
    }
}
ptx.fillStyle = color[18]
ptx.fillRect  (0, 3 * palleteSize, 3 * palleteSize, palleteSize)
ptx.strokeRect(0, 3 * palleteSize, 3 * palleteSize, palleteSize)
ptx.fillStyle = color[19]
ptx.fillRect  (3 * palleteSize, 3 * palleteSize, 3 * palleteSize, palleteSize)
ptx.strokeRect(3 * palleteSize, 3 * palleteSize, 3 * palleteSize, palleteSize)

ntx.fillRect  (0, 0, myColorSize, myColorSize)
ntx.strokeRect(0, 0, myColorSize, myColorSize)

for(var i = 0; i < 100; i++) 
{
    var temp = []
    for(var j = 0; j < 100; j++)
    {
        if(i < canvasW && j < canvasH)
        {
            ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
        }
        temp.push(18)
    }
    canvasColor.push(temp)
}

var canvasMouseDown = false
canvas.onmousedown = function(event)
{
    canvasMouseDown = true
}
canvas.onmousemove = function(event)
{
    if(canvasMouseDown)
    {
        const x = event.offsetX
        const y = event.offsetY
        if(x < canvasW * canvasSize && y < canvasH * canvasSize)
        {
            ctx.fillStyle = ntx.fillStyle
            for(var i = 0; i < 20; i++)
            {
                if(color[i] == ctx.fillStyle)
                {
                    canvasColor[parseInt(x / canvasSize)][parseInt(y / canvasSize)] = i
                }
            }
            ctx.fillRect  (parseInt(x / canvasSize) * canvasSize, parseInt(y / canvasSize) * canvasSize, canvasSize, canvasSize)
            ctx.strokeRect(parseInt(x / canvasSize) * canvasSize, parseInt(y / canvasSize) * canvasSize, canvasSize, canvasSize)    
        }
    }
}
canvas.onmouseup = function(event)
{
    canvasMouseDown = false
}
canvas.onclick = function(event)
{
    const x = event.offsetX
    const y = event.offsetY
    if(x < canvasW * canvasSize && y < canvasH * canvasSize)
    {
        ctx.fillStyle = ntx.fillStyle
        for(var i = 0; i < 20; i++)
        {
            if(color[i] == ctx.fillStyle)
            {
                canvasColor[parseInt(x / canvasSize)][parseInt(y / canvasSize)] = i
            }
        }
        ctx.fillRect  (parseInt(x / canvasSize) * canvasSize, parseInt(y / canvasSize) * canvasSize, canvasSize, canvasSize)
        ctx.strokeRect(parseInt(x / canvasSize) * canvasSize, parseInt(y / canvasSize) * canvasSize, canvasSize, canvasSize)    
    }    
}

pallete.onclick = function(event)
{
    const x = event.offsetX
    const y = event.offsetY
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
    ntx.fillRect  (0, 0, myColorSize, myColorSize)
    ntx.strokeRect(0, 0, myColorSize, myColorSize)
}

//delete colors on canvas
function deleteCanvas()
{
    ctx.fillStyle = color[18]
    for(var i = 0; i < 100; i++) 
    {
        for(var j = 0; j < 100; j++)
        {
            canvasColor[i][j]=18
            if(i < canvasW && j < canvasH)
            {
                ctx.fillRect  (i * canvasSize, j * canvasSize, canvasSize, canvasSize)
                ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
            }
        }
    }
}

//one step execute
var input  = document.getElementById('input')
var output = document.getElementById('output')
var debug = document.getElementById('debug')
const dx = [1, 0, -1, 0]
const dy = [0, 1, 0, -1]
var inputString = ""
var outputString = ""

var pointer = 0

var step = -1
var tries = 0 //from 0 to 7
var codelX = 0
var codelY = 0
var DP = 0
var CC = 0

var stack = []

function reset(outputDelete)
{
    pointer = 0

    step = -1
    tries = 0
    codelX = 0
    codelY = 0
    DP = 0
    CC = 0
    stack = []

    if(outputDelete) output.value = ""
}

function bfs(x, y)
{
    var list = []
    var visited = []
    for(var i = 0; i < canvasW; i++)
    {
        var temp = []
        for(var j = 0; j < canvasH; j++)
        {
            temp.push(false)
        }
        visited.push(temp)
    }
    var queue = []

    visited[x][y] = true
    list.push([x, y])
    queue.push([x, y])
    while(queue.length != 0)
    {
        var u = queue.shift()
        for(var i = 0; i < 4; i++)
        {
            var v = [u[0] + dx[i], u[1] + dy[i]]
            if(v[0] >= 0 && v[0] < canvasW && v[1] >= 0 && v[1] < canvasH && visited[v[0]][v[1]] == false && canvasColor[v[0]][v[1]] == canvasColor[u[0]][u[1]])
            {
                visited[v[0]][v[1]] = true
                list.push(v)
                queue.push(v)
            }
        }
    }

    return list
}

function oneStep()
{
    if(step == -1) //first of first
    {
        step = 0
        input  = document.getElementById('input')
        output = document.getElementById('output')
        inputString = input.value
        outputString = output.value
    }
    tries = 0
    var nowColorIndex = canvasColor[codelX][codelY]
    var nextColorIndex = 19
    var list = bfs(codelX, codelY)

    while(tries < 8)
    {
        list.sort(function(u, v){
            switch(DP * 2 + CC)
            {
                case 0:
                    if(u[0] > v[0]) return 1; 
                    if(u[0] < v[0]) return -1; 
                    if(u[1] < v[1]) return 1; 
                    return -1;
                case 1:
                    if(u[0] > v[0]) return 1; 
                    if(u[0] < v[0]) return -1; 
                    if(u[1] > v[1]) return 1; 
                    return -1;
                case 2:
                    if(u[1] > v[1]) return 1; 
                    if(u[1] < v[1]) return -1; 
                    if(u[0] > v[0]) return 1; 
                    return -1;
                case 3:
                    if(u[1] > v[1]) return 1; 
                    if(u[1] < v[1]) return -1; 
                    if(u[0] < v[0]) return 1; 
                    return -1;
                case 4:
                    if(u[0] < v[0]) return 1; 
                    if(u[0] > v[0]) return -1; 
                    if(u[1] > v[1]) return 1; 
                    return -1;
                case 5:
                    if(u[0] < v[0]) return 1; 
                    if(u[0] > v[0]) return -1; 
                    if(u[1] < v[1]) return 1; 
                    return -1;
                case 6:
                    if(u[1] < v[1]) return 1; 
                    if(u[1] > v[1]) return -1; 
                    if(u[0] < v[0]) return 1; 
                    return -1;
                case 7:
                    if(u[1] < v[1]) return 1; 
                    if(u[1] > v[1]) return -1; 
                    if(u[0] > v[0]) return 1; 
                    return -1;
                default:
                    break;
            }    
        })
        codelX = list[list.length - 1][0] + dx[DP]
        codelY = list[list.length - 1][1] + dy[DP]

        console.log("step:", step, ", tries:", tries, ", codelX:", codelX, ", codelY:", codelY);

        while(codelX >= 0 && codelX < canvasW && codelY >= 0 && codelY < canvasH && canvasColor[codelX][codelY] == 18)
        {
            codelX += dx[DP];
            codelY += dy[DP];
        }

        if(codelX >= 0 && codelX < canvasW && codelY >= 0 && codelY < canvasH && canvasColor[codelX][codelY] != 19)
        {
            nextColorIndex = canvasColor[codelX][codelY];
        }
        else
        {
            tries++;
            if(tries % 2 == 0)
            {
                DP++;
                DP %= 4;
            }
            else
            {
                CC++;
                CC %= 2;
            }
            if(tries >= 8)
            {
                debug.value = "Code Was Ended"
                // console.log('code was ended')
                reset(false)
                step = -1
                return;
            }
            continue;
        }
        debug.value = "Step: " + step + "\n"
        debug.value += "Location: ["+ codelX + ", " + codelY + "]\n"
        debug.value += "DP: "
        switch(DP)
        {
            case 0:
                debug.value += "RIGHT\n"
                break;
            case 1:
                debug.value += "DOWN\n"
                break;
            case 2:
                debug.value += "LEFT\n"
                break;
            case 3:
                debug.value += "UP\n"
                break;
            default:
                break;
        }
        debug.value += "CC: "
        switch(CC)
        {
            case 0:
                debug.value += "LEFT\n"
                break;
            case 1:
                debug.value += "RIGHT\n"
                break;
            default:
                break;
        }
        debug.value += "Command: "
        switch((nextColorIndex % 6 - nowColorIndex % 6 + 6) % 6 * 3 + (parseInt(nextColorIndex / 6) - parseInt(nowColorIndex / 6) + 3) % 3)
        {
            case 0:
                debug.value += "None\n"
                break;
            case 1:
                debug.value += "Push\n"
                stack.push(list.length);
                break;
            case 2:
                debug.value += "Pop\n"
                if(stack.length != 0) stack.pop();
                break;
            case 3:
                debug.value += "Add\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    var a = stack.pop();
                    stack.push(a + b);
                }
                break;
            case 4:
                debug.value += "Subtract\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    var a = stack.pop();
                    stack.push(a - b);
                }
                break;
            case 5:
                debug.value += "Multiply\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    var a = stack.pop();
                    stack.push(a * b);
                }
                break;
            case 6:
                debug.value += "divide\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    if(b == 0) stack.push(b);
                    else
                    {
                        var a = stack.pop();
                        stack.push(parseInt(a / b));
                    }
                    
                }
                break;
            case 7:
                debug.value += "Mod\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    if(b == 0) stack.push(b);
                    else
                    {
                        var a = stack.pop();
                        if(b > 0) stack.push((a % b + b) % b);
                        else stack.push((a % b - b) % (- b) + b);
                    }
                }
                break;
            case 8:
                debug.value += "Not\n"
                if(stack.length != 0)
                {
                    var a = stack.pop();
                    if(a == 0) stack.push(1);
                    else stack.push(0);
                }
                break;
            case 9:
                debug.value += "Greater\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    var a = stack.pop();
                    if(a > b) stack.push(1);
                    else stack.push(0);
                }
                break;
            case 10:
                debug.value += "Pointer(DP Rotate)\n"
                if(stack.length != 0)
                {
                    DP = ((DP + stack.pop()) % 4 + 4) % 4;
                }
                break;
            case 11:
                debug.value += "Switch(CC Rotate)\n"
                if(stack.length != 0)
                {
                    CC = ((CC + stack.pop()) % 2 + 2) % 2;
                }
                break;
            case 12:
                debug.value += "Duplicate\n"
                if(stack.length != 0)
                {
                    var a = stack.pop();
                    stack.push(a);
                    stack.push(a);
                }
                break;
            case 13:
                debug.value += "Roll\n"
                if(stack.length >= 2)
                {
                    var b = stack.pop();
                    var a = stack.pop();
                    if(a < 0 || a > stack.length)
                    {
                        stack.push(a);
                        stack.push(b);
                    }
                    else if(a == 0)
                    {

                    }
                    else
                    {
                        var temp = new Array(a);
                        for(var i = a - 1; i >= 0; i--)
                        {
                            temp[i] = stack.pop();
                        }
                        b = (b % a + a) % a;
                        for(var i = 0; i < a; i++)
                        {
                            stack.push(temp[(i - b + a) % a]);
                        }
                    }
                }
                break;
            case 14:
                debug.value += "In(Number)\n"
                var pnt = pointer;
                var sign = 1;
                var result = 0;
                while(pnt < inputString.length && (inputString[pnt] == ' ' || inputString[pnt] == '\t' || inputString[pnt] == '\n')) pnt++;
                
                if(pnt < inputString.length)
                {
                    if(inputString[pnt] == '-')
                    {
                        pnt++;
                        sign = -1;
                    }
                    if(pnt < inputString.length && inputString[pnt] >= '0' && inputString[pnt] <= '9')
                    {
                        while(pnt < inputString.length && inputString[pnt] >= '0' && inputString[pnt] <= '9')
                        {
                            result *= 10;
                            result += sign * (inputString[pnt] - '0');
                            pnt++;
                        }
                        stack.push(result);
                        pointer = pnt;
                    }
                }
                break;
            case 15:
                debug.value += "In(Char)\n"
                if(pointer < inputString.length)
                {
                    stack.push(inputString.charCodeAt(pointer));
                    pointer++;
                }
                break;
            case 16:
                debug.value += "Out(Number)\n"
                if(stack.length != 0)
                {
                    var a = stack.pop();
                    outputString += a.toString();
                    output.value = outputString
                }
              break;
            case 17:
                debug.value += "Out(Char)\n"
                if(stack.length != 0)
                {
                    var a = stack.pop();
                    outputString += String.fromCharCode(a)
                    output.value = outputString
                }
              break;
            default:
              break;
        }
        debug.value += "Stack: "+stack+"\n"
        step++;
        return;
    }
}

function execute()
{
    oneStep()
    while(step != -1)
    {
        oneStep()
    }
}

function stopStep()
{
    step = -1
}

const download = document.getElementById('download');
download.addEventListener('click', exportFile);
const link = document.createElement( 'a' );
link.style.display = 'none';

function exportFile() 
{
    const buffer = createData(); 
    const blob = new Blob([buffer], {type: 'application/octet-stream'})
    link.href = URL.createObjectURL(blob);
    link.download = 'file.bmp';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function createData()
{
    const pad = canvasW % 4
    const uint8 = new Uint8Array(26 + canvasW * canvasH * 3 + canvasH * pad)
    uint8[0] = 0x42; 
    uint8[1] = 0x4d; 

    uint8[2] = (26 + canvasW * canvasH * 3 + canvasH * pad) % 256
    uint8[3] = (26 + canvasW * canvasH * 3 + canvasH * pad) / 256 % 256
    uint8[4] = (26 + canvasW * canvasH * 3 + canvasH * pad) / 256 / 256

    uint8[10] = 0x1a;
    uint8[14] = 0x0c;

    uint8[18] = canvasW;
    uint8[20] = canvasH;

    uint8[22] = 0x01;
    uint8[24] = 0x18;

    for(var i = 0; i < canvasW; i++)
    {
        for(var j = 0; j < canvasH; j++)
        {
            var hex = color[canvasColor[i][j]]
            uint8[26 + ((canvasH - 1 - j) * canvasW + i) * 3 + 2 + (canvasH - 1 - j) * pad] = parseInt(hex[1] + hex[2], 16);
            uint8[26 + ((canvasH - 1 - j) * canvasW + i) * 3 + 1 + (canvasH - 1 - j) * pad] = parseInt(hex[3] + hex[4], 16);
            uint8[26 + ((canvasH - 1 - j) * canvasW + i) * 3 + 0 + (canvasH - 1 - j) * pad] = parseInt(hex[5] + hex[6], 16);
        }
    }
    return uint8.buffer
}

const upload = document.getElementById("upload");
upload.addEventListener("change", importFile);

function importFile()
{
    const selectedFile = upload.files[0];
    console.log(selectedFile)
    new Response(selectedFile).arrayBuffer().then(function(resolvedData){
        const uint8 = new Uint8Array(resolvedData)
        console.log(uint8)

        canvasW = uint8[18]
        canvasH = uint8[20]

        const temp = uint8[10]
        const pad = canvasW % 4

        for(var i = 0; i < 100; i++)
        {
            for(var j = 0; j < 100; j++)
            {
                if(i < canvasW && j < canvasH)
                {
                    var hex = '#' 
                    hex += uint8[temp + ((canvasH - 1 - j) * canvasW + i) * 3 + 2 + (canvasH - 1 - j) * pad].toString(16).padStart(2, '0');
                    hex += uint8[temp + ((canvasH - 1 - j) * canvasW + i) * 3 + 1 + (canvasH - 1 - j) * pad].toString(16).padStart(2, '0');
                    hex += uint8[temp + ((canvasH - 1 - j) * canvasW + i) * 3 + 0 + (canvasH - 1 - j) * pad].toString(16).padStart(2, '0');
                    for(var k = 0; k < 20; k++)
                    {
                        if(color[k] == hex)
                        {
                            canvasColor[i][j] = k
                        }
                    }
                }
                else
                {
                    canvasColor[i][j] = 18
                }
            }
        }
        ctx.fillStyle = color[18]
        ctx.fillRect(0, 0, 3000, 3000)
        for(var i = 0; i < canvasW; i++) 
        {
            for(var j = 0; j < canvasH; j++)
            {
                ctx.fillStyle = color[canvasColor[i][j]]
                ctx.fillRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
                ctx.strokeRect(i * canvasSize, j * canvasSize, canvasSize, canvasSize)
            }
        }
        widthSlider.value = canvasWidth.innerHTML = canvasW
        heightSlider.value = canvasHeight.innerHTML = canvasH
    });
}
