import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const messages = document.getElementById("chatMessages");


form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const text = input.value.trim();
    if (text === "") return;

    const message = document.createElement("div");
    message.textContent = text; 
    message.classList.add("chat-message-user");
    messages.appendChild(message);
    input.value = "";
    const response = await axios.post("/chat-generate", {
        question: text,
    });
    const  responseLLM = document.createElement("div");
    responseLLM.textContent = response.data.reply;
    responseLLM.classList.add("chat-message-llm");

    messages.appendChild(responseLLM);
    // messages.scrollTop = messages.scrollHeight;
});