const btn = document.getElementById("chatBtn");
const chatFrame = document.getElementById("chatFrame");
const frame = document.getElementById("frame");
const navlist = document.getElementById("navlist");
const hamburger = document.querySelector(".hamburger");
const chatbotId = document.getElementById("chatbotSubmit");
const message = document.getElementById("message");
const chatform = document.getElementById("chatform");
const localizacaoInput = document.getElementById("localizacao");

chatbotId.addEventListener("click", (el) => {
    el.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(appendLocation);
    } else {
        message.classList.toggle("chatbot__location--error");
        message.innerText = "Você percisa permitir a sua gelolocalização";
    }
});
  
function appendLocation(position) {
    localizacaoInput.value = [
      position.coords.latitude,
      position.coords.longitude,
    ];
  
    validateData() == true ? sendPost() : console.error("erro");
}
  
function validateData() {
    let input = document.querySelectorAll("input");
    let arr = [];
    input.forEach((el) => {
      el.value !== ""
        ? arr.push(el.value)
        : (message.innerText = `Você precisa preencher o campo ${el.name}`);
    });
  
    console.log(arr);
    if (arr.length !== 4) {
      return false;
    } else {
      return true;
    }
}
  
async function sendPost() {
    chatFrame.innerHTML = `<iframe 
    title="chatbot" src='https://webchat.botframework.com/embed/BotAgainstCorona?s=a0RXGz5wxTI.nrD9P3krB3QlYtuHXWcOCe8ut_SbLc4b5M72YU5Tpm0'></iframe>`;
  
    let response = await fetch("https://juntoscomvc.com.br/", {
      method: "POST",
      mode: "cors",
      body: new FormData(chatform),
    });
  
    let result = await response.json();
  
    console.log(response, result);
}