  async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userText = input.value.trim();
  if (!userText) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = userText;
  chatBox.appendChild(userMsg);

  input.value = "";

  // Typing effect
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.innerText = "Typing...";
  chatBox.appendChild(botMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();

    botMsg.innerText = data.reply;
  } catch (error) {
    botMsg.innerText = "Error connecting to AI.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}