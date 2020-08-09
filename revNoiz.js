// Fondo con noise
// Dimensiones de Instagram en vertical
let w = 1080;
let h = 1350;
// Variable de tiempo
let t;
// Variable de ruido
let ns;

// Como varia el ruido a traves del tiempo 't'
// let nsStep = 0.014;
let nsStep = 0.0075/2;

// Duracion total de la animacion
// let duration = 42190;
let duration = 42190;
let cuenta = 0;
let ang = 0;
let frame = 0;

// Varaibles para capturer events
let startMillis;
let fps = 30;
let capturer = new CCapture({
  format: 'png',
  framerate: fps
});

function setup() {
    createCanvas(w, h);
      
    ellipseMode(CENTER) 
    rectMode(CORNERS)
    frameRate(fps);


    // Paletas de colores para el atardecer 3 versiones
    // ROSITA RGB
    // colorMode(RGB, 255,255,255,100); 
    // luz1 = color(255,149,100);
    // luz2 = color(221,121,97);
    // luz3 = color(166,87,89);
    
    // dark1 = color(126,96,111);
    // dark2 = color(111,79,100);
    // dark3 = color(73,78,109);

    // // AMARILLO
    // colorMode(HSB, 360, 100, 100, 100); 
    // luz1 = color(46,35,100);
    // luz2 = color(40,46,100);
    // luz3 = color(34,47,95);
    
    // dark1 = color(219,76,35);
    // dark2 = color(220,67,25);
    // dark3 = color(231,27,29);

    // ligthPink
    colorMode(RGB, 255,255,255,100); 
    luz1 = color(246,151,123,25);
    luz2 = color(247,92,1);
    luz3 = color(232,20,1);
    
    dark1 = color(194,104,147);
    dark2 = color(96,42,105);
    dark3 = color(39,15,60);
    backColor = color(30,3,0);

    blendMode(BLEND);
    ns = random(100);
    // background(0,0);
    background(backColor);
    smooth();
    t = 0;
}

function draw() {
    if (frame === 0) {
        // capturer.start();
        startMillis = millis();
        frame ++;   
    }

    let elapsed = millis() - startMillis;
    t = map(elapsed, 0, duration, 0, 1);
    // console.log(t);

    if(t <= 1) {

        let nois = noise(ns);
        ns += nsStep;
        // Si el tiempo es menor a la variable 'duration'
        // Dibuja una parte del degradado del fondo 
        // en el sol y en el cielo
        sunset(t, nois * 100);

        // Cada 35 frames agrage un ponto en el horizonte
        if(frame > 35) {
            
            let radio = map(t, 0, 1, 0, w/2);
            let radio2 = map(t,0,1,w/2,w);
            let brigth = map(t,0,1,0,120);
            
            if (cuenta == 0) {
                for(let i = 0; i < 9; i++) {
                    let sep = i/8;
                    // console.log (t);
                    ligthRay(radio, sep, ang, brigth);
                    ligthRay(radio2,sep,ang, brigth+40);
                    }
                cuenta ++;
            }
            if(cuenta > 0) {
                cuenta ++;
            }
            if(cuenta == 2)  {
                cuenta = 0;
            }
            frame = 1;     
        }
        console.log(frame);
        ang = 15 * cos(t*TWO_PI*1.5);
        frame ++;   

    } else if(t > 1) {
        noLoop();
        console.log('Finalizando');
        // capturer.stop();
        // capturer.save();
        return;
    }

    // capturer.capture(document.getElementById('defaultCanvas0'));
}

// Funcion que sirve para crear el relieve de la parte 
// inferior fe la imagen que intent simular una montaña
function relieve(tiempo, radioInt, radioExt, ruido) {
    push();
    translate(w/2, h*2/3);
    strokeWeight(1);

    let x = radioExt * cos(TWO_PI * tiempo);
    let y = radioExt * -sin(TWO_PI * tiempo);
    let a = radioInt * cos(TWO_PI * tiempo);
    let b = - radioInt * noise(ruido) * -sin(TWO_PI * tiempo); 
    // console.log(b);

    // Descomentar en caso de usar con colores HSB 
    // HSB
    // let mt,br,st;
    // mt = hue(dark3);
    // br = brightness(dark3);
    // br = br * noise(ruido);
    // st = saturation(dark3);
    // st = st * noise(ruido);
    // stroke(mt,br,st);

    // Para colores en RGB
    let relieve = color(21,35,64);
    relieve.setAlpha(noise(ruido) * 60 + 40);
    stroke(relieve);
    line(a,b, x, y);
    pop();
}

// Sirve para crear los puntos que simulan los rayos de luz
function ligthRay(radioExt, separacion,anguloInicio,brillo) {
    
    push();
    colorMode(HSB,360,100,100,100);
    translate(w/2, h*2/3);
    strokeWeight(5);
    let x = radioExt * cos(PI*(separacion)) + anguloInicio;
    let y = radioExt * -sin(PI*(separacion));

    let rayo = color(11,47,92);
    let hu = hue(rayo);
    let sat = saturation(rayo);
    // let alfa = map(brillo,0,255,100,0);
    let alfa = 100;
    stroke(hu,sat,brillo,alfa);
    // stroke(0);
    point(x, y);
    pop();
}

// Funcion que sirve para crear el horizonte soleado
// y oscuro del fondo. En realidad son circunferencias, 
// en las que, el color es degradado y el brillo cambia
// mientras el radio aumenta
function sunset(tiempo, alfa) {
    colorMode(RGB,255,255,255,100);
    push();
    translate(w/2,h*2/3);
    noFill();
    strokeWeight(1);
    // stroke(255,(255-255*log(tiempo)));
    // let mult2 = 100-exp(4.62*tiempo);
    // let mult2 = 100 * pow(tiempo,2)
    // let sol = lerpColor(luz3,luz2,tiempo);   //HSB
    let sol = lerpColor(luz2,luz3,tiempo);      //RGB
    // let sol = lerpColor(luz2,luz3,alfa);      //RGB
    let mult2 = 100 - (95 * pow(tiempo,0.4))  
    // console.log(mult2);      |<21                     
    sol.setAlpha(mult2);
    // sol.setAlpha(alfa);

    noFill();
    stroke(sol);
    ellipse(0,0,w*tiempo, w*tiempo);
    
    // Regla de tres 
    // 138.62 == 100
    // 100 == ???
    // let mult = 72.14*log(1 + alpha);
    // let mult =  5*exp(3.05*tiempo)-5;
    // let cielo = lerpColor(dark2, dark1, tiempo) //HSB
    // let cielo = lerpColor(dark2, dark3, tiempo*1.5) //RGB
    let cielo = lerpColor(dark2, dark3, alfa*2) //RGB
    // let mult = 95 * pow(tiempo,1.5) + 7

    cielo.setAlpha(alfa);
    stroke(cielo);
    strokeWeight(1);
    ellipse(0,0,w+h*tiempo*3/4,w+h*tiempo*3/4);

    translate(-w/2,0);
    noStroke(); 
    fill(9,3,30);
    rect(0,1,w,h/3);
    pop();
}

function keyTyped() {
    if (key === 's') {
        saveCanvas('rev', 'png');
    }
}
