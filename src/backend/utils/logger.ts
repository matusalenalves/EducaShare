import fs from "fs";
import path from "path";

/**
 * Função para registrar eventos e erros no arquivo de log.
 * @param message Mensagem a ser registrada no log.
 */
export const logEvent = (message: string): void => {
  const logPath = path.join(__dirname, "../../logs", "sessions.log");

  try {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    // Garante que o diretório de logs existe
    if (!fs.existsSync(path.dirname(logPath))) {
      fs.mkdirSync(path.dirname(logPath), { recursive: true });
    }

    // Adiciona a mensagem ao arquivo de log
    fs.appendFileSync(logPath, logMessage, "utf8");

    // Opcional: Exibe no console para facilitar o debugging
    console.log(logMessage.trim());
  } catch (error) {
    console.error("Erro ao registrar o log:", error);
  }
};
