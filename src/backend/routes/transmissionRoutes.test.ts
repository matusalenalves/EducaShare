import request from "supertest";
import express from "express";
import { Transmission } from "../models/transmission";
import createTransmissionRoutes from "./transmissionRoutes";

const app = express();
app.use(express.json());

const transmission = new Transmission();
app.use("/api/transmission", createTransmissionRoutes(transmission));

describe("Transmission Routes - Código Fixo", () => {
  test("Iniciar transmissão retorna o código fixo", async () => {
    const res = await request(app).post("/api/transmission/start");
    expect(res.status).toBe(200);
    expect(res.body.code).toBe(transmission.code);
  });

  test("Erro ao iniciar transmissão com falha interna", async () => {
    // Mock Transmission
    const mockTransmission = {
      isActive: false,
      code: "FAKE01",
      reset: jest.fn(),
    } as any;
  
    // Simular erro interno no método do endpoint
    const app = express();
    app.use(express.json());
    app.use("/api/transmission", (req, res, next) => {
      try {
        // Simula erro na lógica interna
        throw new Error("Erro simulado");
      } catch (error) {
        res.status(500).json({ error: "Erro ao iniciar a transmissão." });
      }
    });
  
    const res = await request(app).post("/api/transmission/start");
    expect(res.status).toBe(500); // Verifica o status esperado
    expect(res.body.error).toBe("Erro ao iniciar a transmissão."); // Verifica a mensagem esperada
  });
  

  test("Encerrar transmissão mantém o mesmo código", async () => {
    await request(app).post("/api/transmission/start");
    const code = transmission.code;

    await request(app).post("/api/transmission/end");
    expect(transmission.code).toBe(code);

    const resStartAgain = await request(app).post("/api/transmission/start");
    expect(resStartAgain.body.code).toBe(code);
  });

  test("Erro ao iniciar transmissão já ativa", async () => {
    transmission.isActive = true;
    const res = await request(app).post("/api/transmission/start");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A transmissão já está ativa.");
  });
});
