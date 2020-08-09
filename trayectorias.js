let w = 1000;
let h = 1000;

let col1, col2, col3;

let ns = 0;
let nsStep = 0.01;
let duration = 60000;

let frame = 0;
let startMillis;
let fps = 15;
let capturer = new CCapture({
  format: 'png',
  framerate: fps
});


function setup() {
    createCanvas(w,h);
    frameRate(fps);
    ellipseMode(CORNER);
    rectMode(CORNERS);
    // // RGB
    col1 = color(0,0,255);  // LINEAs
    col2 = color(255,0,0);  // LOG
    col3 = color(0,255,0); // SIN
    back = color(0);

    // VERDE
    // col1 = c<olor(20, 113, 53);  // LINEAs
    // col2 = color(92, 158, 107);  // LOG
    // col3 = color(152, 193, 149); // SIN
    // back = color(28, 58, 62);
    
    // rosa
    // col1 = color(186, 47, 88);  // LINEAs
    // col2 = color(105, 60, 93);  // LOG
    // col3 = color(230, 101, 16); // SIN
    // back = color(39, 44, 64);

        // col1 = color(217, 82, 82);
        // col2 = color(140, 69, 69);
        // col3 = color(242, 236, 233);
        // back = color(138, 155, 166);

    background(back);
    
    ns+=random(100);

}


function draw() {
    // background(0);
    if (frame === 0) {
        // capturer.start();
        startMillis = millis();
        frame ++;   
    }

    let elapsed = millis() - startMillis;
    let t = map(elapsed, 0, duration, 0, 1);
    console.log(t);

    // Trayectoria Logaritmica
    push();
    translate(0,0)
    let posL = trayLogDown(t*2, 0);
    let posU = trayLogUp(t*2, 0);
    // ROJO
    // stroke(200,0,0,255*noise(ns));
    col2.setAlpha(255*noise(ns));
    stroke(col2);
    noFill();
    ellipse(posL.x, posL.y, w*.02,w*.02);
    translate(0,h - w * .02);
    ellipse(posU.x, posU.y, w*.02,w*.02);
    pop();
    

    // Senoidal
    push();
    translate(0, width/2);
    noFill();
    // VERDE
    // stroke(0,255,0, 255 * noise(ns));
    col3.setAlpha(255*noise(ns));
    stroke(col3)
    let pos3 = traySin(t*2, h*.1, -1.5, 0);
    // ellipse(pos3.x, pos3.y - (t * w*3/4) , w*.025,w*.025);
    ellipse(pos3.x, pos3.y, w*.015,w*.015);
    pop();


    // LINEAS
    push();
    translate(w/2,h/2);
    let pos2 = trayLissa(t, w * .4, 1, -1);
    
    // let pos = trayLissa(t, w * .25, 7,3);   
    // let pos = trayLissa(t, w * .25, 7,5);   
    // let pos = trayLissa(t, w * .25, 2,3);    
    // let pos = trayLissa(t, w * .25, 2,5);    
    let pos = trayLissa(t, w * .25, 5,10);
    // let pos = trayLissa(t, w * .25, 4,8);
    // let pos = trayLissa(t, w * .25, 3,6);
    // let pos = trayLissa(t, w * .25, 2,4);   
    // let pos = trayLissa(t, w * .25, 1,2);

    noFill(); 
    // AZUL
    // stroke(0,0,255, 255 * noise(ns));
    col1.setAlpha(255*noise(ns));
    stroke(col1);
    // rect(pos.x, pos.y, pos2.x, pos2.y);
    line(pos.x, pos.y, pos2.x, pos2.y);
    // line(pos.y, pos.x, pos2.y, pos2.x);
    pop();

    if(t <= 0.5) {
        ns += nsStep;
    } else {
        ns -= nsStep;
    }

    if (t >= 1) {
        noLoop();
        console.log('Finalizando');
        // capturer.stop();
        // capturer.save();
        return;
    } 
       
    // capturer.capture(document.getElementById('defaultCanvas0'));
}

function keyTyped() {
    if (key === 's') {
        saveCanvas('rev', 'png');
    }
}

function trayLogDown(tiempo, finX) {
    let x = tiempo * (w - finX);
    let y = pow(h  / 2,tiempo);
    let pos = createVector(x,y);
    return pos;

}

function trayLogUp(tiempo, finX) {
    let x = tiempo * (w - (finX));
    let y = - pow(h / 2,tiempo);
    let pos = createVector(x,y);
    return pos;
             
}


function trayCirculo(tiempo, radio) {
    // Jugar con los signos da cambios en el giro
    let x = radio * cos(TWO_PI*tiempo)
    let y = radio * sin(TWO_PI*tiempo)
    let pos = createVector(x,y);
    return pos;
             
}

function traySin(tiempo, alto, freq, offset) {
    // Jugar con los signos da cambios en el giro
    let x = tiempo * w;
    let y = alto * sin(freq * TWO_PI * tiempo + offset)
    let pos = createVector(x,y);
    return pos;
             
}

function trayLissa(tiempo, radio, perX, perY) {
    // Jugar con los signos da cambios en el giro
    let x = radio * -cos(perX * TWO_PI * tiempo)
    let y = radio * -sin(perY * TWO_PI * tiempo)
    let pos = createVector(x,y);
    return pos;
             
}