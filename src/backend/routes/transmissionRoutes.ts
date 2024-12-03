import express, { Request, Response } from "express";
import { Transmission } from "../models/transmission";

const createTransmissionRoutes = (transmission: Transmission) => {
  const router = express.Router();

  /**
   * Inicia a transmissão.
   */
  router.post("/start", (req: Request, res: Response) => {
    try {
      if (transmission.isActive) {
        return res.status(400).json({ error: "A transmissão já está ativa." });
      }
      transmission.isActive = true;
      res.status(200).json({
        message: "Transmissão iniciada com sucesso.",
        code: transmission.code,
      });
    } catch (error) {
      console.error("Erro no endpoint /start:", error);
      res.status(500).json({ error: "Erro ao iniciar a transmissão." });
    }
  });

  /**
   * Encerra a transmissão.
   */
  router.post("/end", (req: Request, res: Response) => {
    try {
      if (!transmission.isActive) {
        return res.status(400).json({ error: "Nenhuma transmissão está ativa." });
      }
      transmission.isActive = false;
      res.status(200).json({ message: "Transmissão encerrada com sucesso." });
    } catch (error) {
      console.error("Erro no endpoint /end:", error);
      res.status(500).json({ error: "Erro ao encerrar a transmissão." });
    }
  });

  /**
   * Retorna o código da transmissão.
   */
  router.get("/code", (req: Request, res: Response) => {
    try {
      res.status(200).json({ code: transmission.code });
    } catch (error) {
      console.error("Erro no endpoint /code:", error);
      res.status(500).json({ error: "Erro ao obter o código da transmissão." });
    }
  });

  /**
   * Retorna a lista de alunos conectados.
   */
  router.get("/students", (req: Request, res: Response) => {
    try {
      res.status(200).json({ students: transmission.students });
    } catch (error) {
      console.error("Erro no endpoint /students:", error);
      res.status(500).json({ error: "Erro ao listar alunos conectados." });
    }
  });

  return router;
};

export default createTransmissionRoutes;
