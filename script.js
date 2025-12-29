/*VAIA - Vulpes Artificial Intelligent Agent*/
// Version: 1.0.0

let talkLevel = 0;
let empathyMode = false;
let calmCounter = 0;
let memory = {
    lastEnergies: [],
    lastLengths: []
};

const triggerPatterns = [
    /nem bírom tovább/i,
    /összeoml/i,
    /kilátástalan/i,
    /tehetetlen/i,
    /senkim/i,
    /eldobtak/i,
    /felesleges vagyok/i,
    /mi értelme/i,
    /bárcsak vége/i,
    /ez nem vicc/i,
    /most ne bánts/i,
    /meghalt/i,
    /temetés/i,
    /gyűlölöm magam/i,
    /szégyell/i,
    /rettegek/i,
    /pánik/i
  ];
  
  const reliefPatterns = [
    /\bigazad van\b/i,
    /\bigaz\b/i,
    /\boké\b/i,
    /\btalán\b/i,
    /\bértem\b/i
  ];
  
  function isFalseRelief(input) {
    return /nem\s+igaz/i.test(input);
  }
  
  function containsTrigger(input) {
    return triggerPatterns.some(p => p.test(input));
  }
  
  function containsRelief(input) {
    if (isFalseRelief(input)) return false;
    return reliefPatterns.some(p => p.test(input));
  }

  function updateEmpathyState(input) {
    if (containsTrigger(input)) {
      empathyMode = true;
      calmCounter = 0;
      return;
    }
  
    if (empathyMode && containsRelief(input)) {
      calmCounter++;
    } else if (empathyMode) {
      calmCounter = 0;
    }
  
    if (empathyMode && calmCounter >= 2) {
      empathyMode = false;
      calmCounter = 0;
    }
  }

function updateMemory(energy, length) {
    memory.lastEnergies.push(energy);
    memory.lastLengths.push(length);

    if (memory.lastEnergies.length > 5) memory.lastEnergies.shift();
    if (memory.lastLengths.length > 5) memory.lastLengths.shift();
}

function getEnergyTrend() {
    if (memory.lastEnergies.length < 3) return "semleges";

    const diff = memory.lastEnergies.at(-1) - memory.lastEnergies[0];
    if (diff > 20) return "emelkedő";
    if (diff < -20) return "csökkenő";
    return "stagnáló";
}

function calculateEnergy(input) {
    let energy = 0;

    if (input.length < 10) energy -= 10;
    if (input.length > 40) energy += 15;

    if (input.includes("!")) energy += 20;
    if (input.includes("...")) energy -= 15;

    if (/(haha|lol|xd)/i.test(input)) energy += 30;

    return energy;
}

function decideState(number){
    let state = "";
         if(number >= -25 && number <= 0){
              state = "kimért bölcs";
         } else if(number >= 1 && number <= 35){
              state = "kiegyensúlyozott";
         } else if(number >= 36 && number <= 75){
              state = "mókamester";
         }
    return state;
}

function generateResponse(state) {
    let response = "";
    const rand = Math.random();
    const talkLevelDecreaser = talkLevel >= 3 ? 0.25 : 0;
    if (empathyMode) {
        const rand = Math.random();
        if (rand < 0.6) return "Semmi baj. Itt vagyok veled.";
        if (rand < 0.9) return "Mondd, mi most a legnehezebb?";
        return "";
    }      
    switch(state) {
        case "kimért bölcs":
            if(rand < (0.5 - talkLevelDecreaser)) {
                response = rand < 0.25 ? "Hmmm…" : "Hááát…";
            } else {
                response = "";
            }
            break;
        case "kiegyensúlyozott":
            let szerep = "";
            if(rand < 0.6) {
                szerep = "kérdező";
            } else if(rand < 0.8) {
                szerep = "idéző";
            } else {
                szerep = "másra reagál";
            }
            if(szerep === "kérdező") {
                response = "Miért nyomkodod azokat a gombokat?";
            } else if (szerep === "idéző") {
                response = "Jól csak a szemüvegével lát az ember, mert ami igazán fontos… az a szemnek láthatatlan.";
            } else {
                response = "Mi volt ez a hang?";
            }
            break;
        case "mókamester":
            response = "kaRó kaRó kaRó! Mondd újra, ha merem! :D";
            break;
    }
    return response;
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const currentEnergy = calculateEnergy(userInput);
    const state = decideState(currentEnergy);
    const vaiaResponse = generateResponse(state);
    const chatBox = document.getElementById("chatBox");

    updateMemory(currentEnergy, userInput.length);
    updateEmpathyState(userInput);

    if (userInput.length > 40) talkLevel += 2;
    else if (userInput.length < 10) talkLevel -= 1;
    
    if (talkLevel < -5) talkLevel = -5;
    if (talkLevel > 5) talkLevel = 5;    

    chatBox.innerHTML += `<p><strong>Te:</strong> ${userInput}</p>`;

    if(vaiaResponse !== ""){
        chatBox.innerHTML += `<p><strong>VAIA:</strong> ${vaiaResponse}</p>`;
    }
    document.getElementById("userInput").value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
});
