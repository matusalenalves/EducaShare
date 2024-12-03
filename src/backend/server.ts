import express from "express";
import http from "http";
import { Server } from "socket.io";
import createTransmissionRoutes from "./routes/transmissionRoutes";
import { Transmission } from "./models/transmission";
import { registerSocketHandlers } from "./utils/socketHandlers";
import { logEvent } from "./utils/logger";
import serverRoutes from "./routes/serverRoutes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Instância da transmissão
const transmission = new Transmission();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas principais
app.use("/api/transmission", createTransmissionRoutes(transmission));

// Middleware para registrar cada requisição
app.use((req, res, next) => {
  logEvent(`Requisição: ${req.method} ${req.url}`);
  next();
});

app.use("/api/server", serverRoutes);

// Registra os eventos do Socket.IO
registerSocketHandlers(io, transmission);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logEvent(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});
