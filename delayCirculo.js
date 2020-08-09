let diametroBase;
let separacion = 0;
let w = 1000;
let h = 1000

let elip = 0;
let index = 0;

let timeWindow = 1666;
let d = w *.1;
let fS = 250;

let verde1, verde2, verde3;
let vino1, vino2, vino3;
let orbitron, orbitron_bold;

var frame = 0;
var startMillis;
var fps = 30;
var capturer = new CCapture({
  format: 'png',
  framerate: fps
});

function preload() {
    orbitron = loadFont('assets/orbitron-black.otf');
    orbitron_bold = loadFont('assets/orbitron-bold.otf');
  }

function setup() {
    createCanvas(w,h);
    frameRate(fps);
    colorMode(HSB,360,100,100,100);
    ellipseMode(CORNER);
    

    diametroBase = w *.35;
    diametroBase2 = h *.6;

    verde1 = color(88,22,100);
    verde2 = color(75,100,100);
    verde3 = color(80,88,80);
    
    vino1 = color(339,82,81);
    vino2 = color(332,78,64);
    vino3 = color(290,59,31);
    
    background(vino3);
}


function draw() {
    if (frame === 0) {
        // capturer.start();
        startMillis = millis();
        frame ++;   
    }

    let duration = 15000;
    let elapsed = millis() - startMillis;
    let t = map(elapsed, 0, duration, 0, 1);
    console.log(elapsed);

    if (t > 1) {
        noLoop();
        console.log('finished recording.');
        capturer.stop();
        capturer.save();
        return;
    } 

    if(elapsed >= timeWindow*elip) {
        if(elip < 6) {
            ellipseDelay(elip); 
            elip ++;
            console.log(elip);
        } else  if(elip == 6) {
            for(let i = 0; i < 5; i++) {
                texto('DELAY', i);    
                console.log("Voy a apagar");
            }
 
            elip ++;    
        } else {

        }
    }
    capturer.capture(document.getElementById('defaultCanvas0'));
}

function ellipseDelay(index) {
        push();
        translate((width / 1.65) - (separacion), h *2/ 15)
        let matiz = hue(vino1);
        let br = brightness(vino1);
        let sat = saturation(vino1);
        let col = color(matiz,br, sat-(sat*index/5));
        col.setAlpha(100-(100*index/7));
        fill(col);
        noStroke();
        strokeWeight(4);
        ellipse(0, 0, diametroBase, diametroBase)
        separacion += diametroBase*.65;
        diametroBase =  diametroBase / 1.619;        
        pop();        
}

function texto(cadena, index) {
        push()
        let matiz = hue(verde2);
        let br = brightness(verde2);
        let sat = saturation(verde2);
        vino2.setGreen(180);
        vino2.setBlue(100);
        noStroke();
        fill(matiz, br, 40+(sat*index/5));

        textFont(orbitron_bold);
        textSize(fS);
        textAlign(LEFT);
        console.log(index);
        if(index == 3) {
            text(cadena.charAt(index), d + (d*.04), h*.8);
        }   else if(index == 4) {
            text(cadena.charAt(index), d + (d*.08), h*.8);
        } else {
            text(cadena.charAt(index), d, h*.8);
        }   
        fS = fS / 1.619  
        d += fS * 1.9
        pop();
}

function keyTyped() {
    if (key === 's') {
        saveCanvas('rev', 'png');
    }
}