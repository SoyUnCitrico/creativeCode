let w = 1080;
let h = 1350;
let t;
let ns;
// let nsStep = 0.5;
let nsStep = 0.7;
let duration = 42190;
// let duration = 42190 * 2;
let sound, amplitude, fft;
let level;
let size = 0;

let frame = 0;
let startMillis, elapsed;
let fps = 30;

let capturer = new CCapture({
  format: 'png',
  framerate: fps,
});

function preload() {
    // remington = loadFont('assets/Remington-Noiseless.ttf');
    // sound = loadSound('assets/noiseKick.mp3');
    sound = loadSound('assets/noiseHat.mp3');
  } 

function setup() {
    createCanvas(w,h);
    // cnv.mouseClicked(toggleSound);
    
    ellipseMode(CENTER) 
    rectMode(CENTER)
    frameRate(fps);     
    // ligthPink
    colorMode(RGB, 255,255,255,100); 
    luz1 = color(246,151,123,25);
    luz2 = color(247,92,1);
    luz3 = color(232,20,1);
    
    dark1 = color(194,104,147);
    dark2 = color(96,42,105);
    dark3 = color(39,15,60);
    backColor = color(30,3,0);
    amplitude = new p5.Amplitude();
    // fft = new p5.FFT();

    ns = random(100);
    // textFont(remington);
    background(0,0);
    smooth();
    t = 0;
}


function draw() {
    if (frame === 0) {
        // capturer.start();
        startMillis = millis();
        sound.play();
        frame ++;   
        console.log('GRABANDO');
    }
    
    elapsed = millis() - startMillis;
    t = map(elapsed, 0, duration, 0, 1);
    background(0,100);
    
    if(t <= 0.75) {
        level = amplitude.getLevel();
        size = map(level, 0, .5, w, 0);
        sunsetMoving(size);

        // level = amplitude.getLevel();
        // size = map(level, 0, 1, 25 , w);
        // textMoving(size);
        // console.log(size);

    } else if(t > 0.5 && t <= 0.75) {
        level = amplitude.getLevel();
        size = map(level, 0, .5, w, 0);
        sunsetMoving(size);

        // level = amplitude.getLevel();
        // size = map(level, 0, 1, 50 , w);
        // textMoving(size);

    } else if(t > 0.75 && t <= 1) {
        level = amplitude.getLevel();
        size = map(level, 0, 0.5, w, 0);
        sunsetMoving(size);

        // level = amplitude.getLevel();
        // size = map(level, 0, 1, 75 , w);
        // textMoving(size);

    } else {
        // translate(w/2,h/7);
        // text('noisE', 0,0);
        
        console.log('Finalizando');
        sound.stop();
        // capturer.stop();
        // capturer.save();
        noLoop();
        return;
    }
    
    // capturer.capture(document.getElementById("defaultCanvas0"));
}


function toggleSound() {
    if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
  }

function textMoving(tamano) {
    push();
    translate(w/2,h/7);
    fill(158,128,107);
    textSize(tamano);
    textAlign(CENTER, CENTER);
    text('noisE', 0,0);
    pop();
}

function sunsetMoving(amp) {
    push();
    translate(w/2,h*2/3);
    noFill();
    strokeWeight(3);            
    // sol.setAlpha(alfa);

    noFill();
    stroke(232,20,1);
    ellipse(0,0,amp,amp);
    stroke(112,8,68);
    strokeWeight(3);
    ellipse(0, 0, w*2-amp/2, w*2-amp/2);
    pop();
}


function keyTyped() {
    if (key === 's') {
        saveCanvas('rev', 'png');
    }
}
