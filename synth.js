let vco1,vco2, filter;
let lfo,adsr,ad;
let textColor;

function setup() {
  createCanvas(600, 600);  
  colorMode(HSB);
  textColor = color(160,255,80);
  let posVCO = createVector(width/2, 0);
  let posVCF = createVector(0,150);
  let posADSR = createVector(width/2,150);
  let posAD = createVector(width/2,300);
  let sizeVCO = createVector(300,150);
  vco1 = new VCO('sine',440,0.2);  
  vco2 = new PWM(440,0.2,posVCO,sizeVCO);  
  filter = new VCF('lowpass',20000,1,posVCF,sizeVCO);
  adsr = new ADSR(0,0.1,0.5,0.3,posADSR,sizeVCO);
  ad = new ADSR(0,0,1,0,posAD,sizeVCO);

  vco1.unplugged();
  vco2.unplugged();
  vco1.setScreen();
  vco2.setScreen();
  filter.setScreen();
  vco1.plug(filter.getFilter());
  vco2.plug(filter.getFilter());
  // filter.unplugged();
  
  // filter.plug();
}

function draw() {   
    background(30);
    // vco1.actualiza();
    vco1.dibuja(); 
    // vco2.actualiza();
    vco2.dibuja(); 
    // filter.actualiza();
    filter.dibuja();
    // filter.setFreq(ad.getEnvelope());
    // adsr.actualiza();
    adsr.dibuja();
    ad.dibujaAD();

}

function keyPressed() {
  if(key == '1') {
        vco1.changeVoice('sine');
        

    }
  if(key == '2'){
        vco1.changeVoice('triangle')
        
    }
  if(key == '3'){
      vco1.changeVoice('square')
      
    }
  if(key == '4') {
      vco1.changeVoice('sawtooth')
      
  }
  
  if(key == '8'){
    vco2.changeVoice('triangle')  
  }
  if(key == '9'){
    vco2.changeVoice('square')
  }
  if(key == '0') {
    vco2.changeVoice('sawtooth')
  }

  if(key == 'w') {
    vco1.changeWave();
    vco2.changeWave();
    filter.changeWave();
  }
  
  if(key == 'l') {
    vco2.changeMode();
    vco1.changeMode();  
    filter.changeMode();
    // print(screen.isLog);
  }
  
  if(key == 'a') {
    vco1.oscStart();
  }
  if(key == 's') {  
    vco1.oscStop();
  }

  if(key == 'j') {
    vco2.oscStart();
  }
  if(key == 'k') {  
    vco2.oscStop();
  }
  if(key == 't') {  
    adsr.play(filter.getFilter());
    print('Press T');
  }
}
function mouseClicked() {
  ad.triggerAD();
  // filter.setFreq(ad.getEnvelope());
  // print(ad);
  
}

function mousePressed() {
  adsr.triggerA(filter.getFilter());
}

function mouseReleased() {
  adsr.triggerR(filter.getFilter());
}


