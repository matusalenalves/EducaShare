import { Server, Socket } from "socket.io";
import { Transmission } from "../models/transmission";
import { logEvent } from "./logger";

/**
 * Gerencia os eventos do Socket.IO.
 */
export const registerSocketHandlers = (io: Server, transmission: Transmission) => {
  io.on("connection", (socket: Socket) => {
    logEvent(`Cliente conectado: ${socket.id}`);

    // Envia o status atual da transmissão ao conectar
    socket.emit("transmissionStatus", {
      isActive: transmission.isActive,
      code: transmission.code,
    });

    /**
     * Evento: Aluno se junta à transmissão.
     */
    socket.on("join", (name: string) => {
      if (!transmission.isActive) {
        socket.emit("error", "A transmissão ainda não começou.");
        logEvent(`Tentativa de conexão falhou para ${name}: transmissão inativa.`);
        return;
      }

      // Atualiza estado e emite evento
      transmission.addStudent(name);
      logEvent(`Aluno ${name} entrou na aula.`);
      io.emit("studentList", [...transmission.students]);
    });

    /**
     * Evento: Expulsar um aluno.
     */
    socket.on("removeStudent", (name: string) => {
      transmission.removeStudent(name);
      logEvent(`Aluno ${name} foi removido pelo professor.`);
      io.emit("studentList", [...transmission.students]);
    });

    /**
     * Evento: Cliente desconectado.
     */
    socket.on("disconnect", () => {
      logEvent(`Cliente desconectado: ${socket.id}`);
    });
  });
};
