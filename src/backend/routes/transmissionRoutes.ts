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
      res.status(200).json({ code: transmission.code });
    } catch (error) {
      res.status(500).json({ error: "Erro ao iniciar a transmissão." });
      console.error("Erro no endpoint /start:", error);
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
      transmission.reset();
      res.status(200).json({ message: "Transmissão encerrada." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao encerrar a transmissão." });
      console.error("Erro no endpoint /end:", error);
    }
  });

  /**
   * Retorna a lista de alunos conectados.
   */
  router.get("/students", (req: Request, res: Response) => {
    try {
      res.status(200).json({ students: transmission.students });
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar alunos conectados." });
      console.error("Erro no endpoint /students:", error);
    }
  });

  return router;
};

export default createTransmissionRoutes;
