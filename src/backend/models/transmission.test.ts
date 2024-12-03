import { Transmission } from "./transmission";

describe("Transmission Model - Código Fixo", () => {
  let transmission: Transmission;

  beforeEach(() => {
    transmission = new Transmission();
  });

  test("Código fixo permanece o mesmo após reset", () => {
    const initialCode = transmission.code;
    transmission.reset();
    expect(transmission.code).toBe(initialCode); // Código não deve mudar
  });

  test("Adicionar aluno à lista", () => {
    transmission.addStudent("João");
    expect(transmission.students).toContain("João");
  });

  test("Remover aluno da lista", () => {
    transmission.addStudent("João");
    transmission.removeStudent("João");
    expect(transmission.students).not.toContain("João");
  });

  test("Reset limpa lista de alunos e desativa transmissão", () => {
    transmission.addStudent("João");
    transmission.isActive = true;
    transmission.reset();
    expect(transmission.students).toHaveLength(0);
    expect(transmission.isActive).toBe(false);
  });
});
