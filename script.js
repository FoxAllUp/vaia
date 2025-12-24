/*VAIA - Vulpes Artificial Intelligent Agent*/
// Version: 1.0.0

function decideState(number){
    let state = "";
         if(number <= 30 && number >= 0){
              state = "kimért bölcs";
         } else if(number >= 31 && number <= 70){
              state = "kiegyensúlyozott";
         } else if(number >= 71 && number <= 100){
              state = "mókamester";
         }
    return state;
}

function generateResponse(state) {
    let response = "";
    switch(state) {
        case "kimért bölcs":
            response = "Gondolkodj…";
            break;
        case "kiegyensúlyozott":
            const szerep = Math.random() < 0.8 ? "kérdező" : "idéző";
            if(szerep === "kérdező") {
                response = "Miért nyomkodod azokat a gombokat?";
            } else {
                response = "Jól csak a szemüvegével lát az ember, mert ami igazán fontos… az a szemnek láthatatlan.";
            }
            break;
        case "mókamester":
            response = "kaRó kaRó kaRó! Mondd újra, ha merem! :D";
            break;
    }
    return response;
  }
function countECharacters(input) {
    return (input.match(/e/gi) || []).length;
}

  function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const eCount = countECharacters(userInput);
    const state = decideState(eCount);
    const vaiaResponse = generateResponse(state);
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>Te:</strong> ${userInput}</p>`;
    chatBox.innerHTML += `<p><strong>VAIA:</strong> ${vaiaResponse}</p>`;
    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }