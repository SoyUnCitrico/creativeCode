let diametroBase;
let separacion = 0;
let w = 1000;
let h = 1000
let elip = 0;
let index = 0;
let tiempo, tiempoAhora;
let d = w *.1;
let fS = 250;

let verde1, verde2, verde3;
let vino1, vino2, vino3;
let orbitron, orbitron_bold;
function preload() {
    orbitron = loadFont('assets/orbitron-black.otf');
    orbitron_bold = loadFont('assets/orbitron-bold.otf');
  }

function setup() {
    createCanvas(w,h);
    frameRate(50);
    colorMode(HSB,360,100,100,100);
    ellipseMode(CENTER);
    

    diametroBase = w *.35;
    diametroBase2 = h *.6;

    verde1 = color(88,22,100);
    verde2 = color(75,100,100);
    verde3 = color(80,88,80);
    
    vino1 = color(339,82,81);
    vino2 = color(332,78,64);
    vino3 = color(290,59,31);
    
    background(vino3);
    tiempo = millis();
    // tiempoAhora = millis();
}


function draw() {
    if(elip < 6) {
        if(millis() - tiempo > (1666*elip)) {
            ellipseDelay(elip); 
            elip ++;
            console.log(elip);
        }
        tiempoAhora = millis();
    } else {
        // console.log(index);
        if(millis() - tiempoAhora > 1666) {
            texto('DELAY',index);
            tiempoAhora = millis();
            index++;        

            if(index > 4) {
                // console.log("Voy a apagar");
                noLoop();
            }   
        }
    }
}

function ellipseDelay(index) {
        push();
        translate((width * 4/ 5) - (separacion), h / 3)
        
        // stroke(255,0,0);
        // strokeWeight(5);
        // point(0,0);
        let matiz = hue(vino1);
        let br = brightness(vino1);
        let sat = saturation(vino1);
        // verde2.set(100-(100*index/5))
        fill(matiz,br,sat-(sat*index/5));
        noStroke();
        strokeWeight(4);

        ellipse(0, 0, diametroBase, diametroBase2)
        separacion += diametroBase*.88;
        diametroBase =  diametroBase / 1.619;
        diametroBase2 =  diametroBase2 / 1.619;
        
        pop();        

}

function texto(cadena, index) {
        push()

        let matiz = hue(verde2);
        let br = brightness(verde2);
        let sat = saturation(verde2);

        // fill(matiz, 30+(br*index/10), 30+(sat*index/10));
        // fill(matiz, br-(br*index/5), sat+(sat*index/5));
        fill(matiz, br, 40+(sat*index/5));

        textFont(orbitron_bold);
        textSize(fS);
        textAlign(LEFT);
        if(index == 3) {
            text(cadena.charAt(index), d + (d*.03), h*.85);
        }   else if(index == 4) {
            text(cadena.charAt(index), d + (d*.06), h*.85);
        } else {
            text(cadena.charAt(index), d, h*.85);
        }   
        // text(cadena.charAt(index), d + d *.02, h*.9);
        // stroke(255,0,0);
        // strokeWeight(5);
        // point(d- d*.3,h*.9)
        fS = fS / 1.619  
        d += fS * 1.9
        pop();
}

function keyTyped() {
    if (key === 's') {
        saveCanvas('rev', 'png');
    }
}