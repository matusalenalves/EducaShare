import express from "express";
import { startServer, stopServer } from "../utils/serverController";

const router = express.Router();

router.post("/start", (req, res) => {
  try {
    startServer();
    res.status(200).send("Servidor iniciado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao iniciar o servidor.");
  }
});

router.post("/stop", (req, res) => {
  try {
    stopServer();
    res.status(200).send("Servidor encerrado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao encerrar o servidor.");
  }
});

export default router;
