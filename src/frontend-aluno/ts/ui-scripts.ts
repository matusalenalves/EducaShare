import { io } from "socket.io-client";

const connectClassButton = document.getElementById("connect-class");
const classCodeInput = document.getElementById("class-code-input") as HTMLInputElement;
const messagesList = document.getElementById("messages");

// Comunicação com o backend
const socket = io("http://localhost:3000");

// Conectar à aula
connectClassButton?.addEventListener("click", () => {
  const classCode = classCodeInput.value.trim();
  if (!classCode) {
    alert("Por favor, insira um código válido.");
    return;
  }

  socket.emit("joinClass", classCode, (response: { success: boolean; message: string }) => {
    if (response.success) {
      alert("Conectado com sucesso!");
    } else {
      alert(`Erro: ${response.message}`);
    }
  });
});

// Exibe mensagens recebidas
socket.on("message", (message: string) => {
  if (messagesList) {
    const li = document.createElement("li");
    li.textContent = message;
    messagesList.appendChild(li);
  }
});
