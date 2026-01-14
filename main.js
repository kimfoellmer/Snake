let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let rows = 20
let cols = 20
let snake = [{
    x: 19,
    y: 3
},{
    x:19,
    y:4
}
]
let essen
let zellenBreite = canvas.width / cols //Berechnung der Zellenbreite
let zellenHoehe = canvas.height / rows //Bercehnung der Zellenhöhe
let blickrichtung = 'LINKS'
let essenGesammelt = false


function zeichnen() {
    ctx.fillStyle = 'grey'
    ctx.fillRect(0,0,canvas.width, canvas.height)

    ctx.fillStyle = 'blue'
    ctx.fillRect(essen.x*zellenBreite, essen.y*zellenHoehe, zellenBreite, zellenHoehe)

    ctx.fillStyle = `black`
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x*zellenBreite,snake[i].y*zellenHoehe, zellenBreite, zellenHoehe)
    }
    requestAnimationFrame(zeichnen)
}

document.addEventListener(`keydown`, keyDown)

platziereEssen()
setInterval(gameLoop, 170);
zeichnen()



function platziereEssen() {
    let zufallX = Math.floor(Math.random() * cols)
    let zufallY = Math.floor(Math.random() * rows)

    essen = {
        x: zufallX,
        y: zufallY
    }
}

function keyDown(e){
    if(e.code == `KeyA`){
        blickrichtung = `LINKS`
    }

    if(e.code == `KeyW`){
        blickrichtung = `HOCH`
    }

    if(e.code == `KeyD`){
        blickrichtung = `RECHTS`
    }

    if(e.code == `KeyS`){
        blickrichtung = `RUNTER`
    }
}



function snakeArrayAktualisieren() {
    for (let i = snake.length-1; i>0 ; i--) {
        const part = snake [i];
        const lastPart = snake [i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}


function gameLoop() {

    if(essenGesammelt){
        snake.unshift({
            x: snake[0].x,
            y: snake[0].y}
        )

        essenGesammelt = false
    }

    snakeArrayAktualisieren();

    if (blickrichtung == `LINKS`) {
        snake[0].x--;
    }

    if (blickrichtung == `RECHTS`) {
        snake[0].x++;
    }

    if (blickrichtung == `HOCH`) {
        snake[0].y--;
    }

    if (blickrichtung === `RUNTER`) {
        snake[0].y++;
    }

    if(snake[0].x == essen.x && snake[0].y == essen.y) {
        essenGesammelt = true;
        platziereEssen();
    }
    testGameOver()
}


function testGameOver() {

    let snakeKopf = snake[0];
    let snakeKoerper = snake.slice(1);
    let duplicatePart = snakeKoerper.find(part =>
        part.x === snakeKopf.x && part.y === snakeKopf.y)

    if ( snakeKopf.x < 0 ||
         snakeKopf.x > cols - 1 ||
         snakeKopf.y < 0 ||
         snakeKopf.y > rows -1 ||
         duplicatePart){

        alert ("tot!")

        platziereEssen();
        snake = [{
            x : 19,
            y : 3
        },{
            x : 19,
            y : 4
        }];
        blickrichtung = `LINKS`
    }
}

function punkte() {
    let punktezahl = 0
        if (essenGesammelt === true)
            punktezahl = punktezahl + 1
}





