import { io } from "socket.io-client";

// Elementos DOM
const startClassButton = document.getElementById("start-class");
const endClassButton = document.getElementById("end-class");
const studentsList = document.getElementById("students-list");
const codeDisplay = document.getElementById("class-code");

// Atualiza a lista de alunos
function updateStudentsList(students: string[]) {
  if (studentsList) {
    studentsList.innerHTML = students
      .map((student) => `<li>${student}</li>`)
      .join("");
  }
}

// Conexão com o backend
const socket = io("http://localhost:3000");

// Recebe o status inicial da transmissão
socket.on("transmissionStatus", ({ isActive, code }) => {
  if (codeDisplay) codeDisplay.textContent = code;
  if (isActive) {
    alert("Transmissão já está ativa.");
  }
});

// Inicia a transmissão
startClassButton?.addEventListener("click", () => {
  socket.emit("startClass", (response: { success: boolean; code?: string; error?: string }) => {
    if (response.success) {
      alert("Aula iniciada!");
      if (codeDisplay) codeDisplay.textContent = response.code!;
    } else {
      alert(`Erro: ${response.error}`);
    }
  });
});

// Encerra a transmissão
endClassButton?.addEventListener("click", () => {
  socket.emit("endClass", (response: { success: boolean; error?: string }) => {
    if (response.success) {
      alert("Aula encerrada!");
      updateStudentsList([]);
    } else {
      alert(`Erro: ${response.error}`);
    }
  });
});

// Atualiza a lista de alunos conectados
socket.on("updateStudents", (students: string[]) => {
  updateStudentsList(students);
});

// Mensagem de erro genérica
socket.on("error", (message: string) => {
  alert(`Erro: ${message}`);
});
