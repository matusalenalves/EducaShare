import { exec } from "child_process";

export const startServer = () => {
  exec("nodemon dist/backend/server.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar o servidor: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro no servidor: ${stderr}`);
    }
    console.log(stdout);
  });
};

export const stopServer = () => {
  exec("pkill -f 'nodemon dist/backend/server.js'", (error) => {
    if (error) {
      console.error(`Erro ao encerrar o servidor: ${error.message}`);
    } else {
      console.log("Servidor encerrado.");
    }
  });
};
