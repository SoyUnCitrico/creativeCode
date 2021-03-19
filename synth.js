let vco1,vco2;
let textColor;

function setup() {
  createCanvas(600, 600);  
  colorMode(HSB);
  textColor = color(160,255,80);
  let posVCO = createVector(width/2, 0);
//   let posVCO = createVector(0,0);
  let sizeVCO = createVector(300,150);
  vco1 = new VCO('sine',440,0.2);  
  vco2 = new PWM(440,0.2,posVCO,sizeVCO);  

}

function draw() {   
    background(0);
    vco1.actualiza();
    vco1.dibuja(); 
    vco2.actualiza();
    vco2.dibuja(); 
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

  if(key == 'a') {
    vco1.oscStart();
    vco2.oscStart();
  }
  if(key == 's') {
    vco1.oscStop();
    vco2.oscStop();
  }
  if(key == 'w') {
    vco1.changeWave();
    vco2.changeWave();
  }
  if(key == 'l')
    vco2.changeMode();
    vco1.changeMode();
    // print(screen.isLog);
}





  