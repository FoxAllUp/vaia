/*VAIA - Vulpes Artificial Intelligent Agent*/
// Version: 1.0.0

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
    switch(state) {
        case "kimért bölcs":
            if(rand < 0.5){
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
    chatBox.innerHTML += `<p><strong>Te:</strong> ${userInput}</p>`;
    chatBox.innerHTML += `<p><strong>VAIA:</strong> ${vaiaResponse}</p>`;
    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
  });
