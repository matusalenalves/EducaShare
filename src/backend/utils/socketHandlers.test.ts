import { Server } from "socket.io";
import { createServer } from "http";
import { Transmission } from "../models/transmission";
import { registerSocketHandlers } from "./socketHandlers";
import { io as Client } from "socket.io-client";

describe("Socket.IO Handlers", () => {
  let ioServer: Server;
  let clientSocket: any;
  let transmission: Transmission;
  let httpServer: any;

  beforeAll((done) => {
    httpServer = createServer();
    ioServer = new Server(httpServer, {
      cors: { origin: "*" },
    });

    transmission = new Transmission();
    registerSocketHandlers(ioServer, transmission);

    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
    httpServer.close();
  });

  test("Aluno se junta à transmissão ativa", (done) => {
    transmission.isActive = true;

    clientSocket.emit("join", "João");

    clientSocket.on("studentList", (students: string[]) => {
      try {
        expect(students).toContain("João");
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
