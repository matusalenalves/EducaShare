import { Server, Socket } from "socket.io";
import { Transmission } from "../models/transmission";
import { logEvent } from "./logger";

/**
 * Gerencia os eventos do Socket.IO.
 */
export const registerSocketHandlers = (io: Server, transmission: Transmission) => {
  io.on("connection", (socket: Socket) => {
    logEvent(`Cliente conectado: ${socket.id}`);

    // Envia o status atual da transmissão ao cliente que acabou de conectar
    socket.emit("transmissionStatus", {
      isActive: transmission.isActive,
      code: transmission.code,
    });

    /**
     * Evento: Aluno tenta se conectar à transmissão.
     */
    socket.on("join", (name: string) => {
      try {
        if (!transmission.isActive) {
          socket.emit("error", "A transmissão ainda não começou.");
          logEvent(`Tentativa de conexão falhou para ${name}: transmissão inativa.`);
          return;
        }

        // Adiciona o aluno à lista e atualiza os clientes
        transmission.addStudent(name);
        logEvent(`Aluno ${name} entrou na aula.`);
        io.emit("updateStudents", [...transmission.students]);
      } catch (error) {
        logEvent(`Erro ao processar o evento 'join' para ${name}: ${error}`);
        socket.emit("error", "Erro ao tentar entrar na transmissão.");
      }
    });

    /**
     * Evento: Professor expulsa um aluno.
     */
    socket.on("removeStudent", (name: string) => {
      try {
        transmission.removeStudent(name);
        logEvent(`Aluno ${name} foi removido pelo professor.`);
        io.emit("updateStudents", [...transmission.students]);
      } catch (error) {
        logEvent(`Erro ao processar o evento 'removeStudent' para ${name}: ${error}`);
        socket.emit("error", "Erro ao tentar remover o aluno.");
      }
    });

    /**
     * Evento: Encerrar a transmissão.
     */
    socket.on("endTransmission", () => {
      try {
        transmission.isActive = false;
        transmission.students = [];
        logEvent(`A transmissão foi encerrada pelo professor.`);
        io.emit("transmissionStatus", {
          isActive: transmission.isActive,
          code: transmission.code,
        });
      } catch (error) {
        logEvent(`Erro ao processar o evento 'endTransmission': ${error}`);
        socket.emit("error", "Erro ao encerrar a transmissão.");
      }
    });

    /**
     * Evento: Cliente desconectado.
     */
    socket.on("disconnect", () => {
      logEvent(`Cliente desconectado: ${socket.id}`);
    });
  });
};
