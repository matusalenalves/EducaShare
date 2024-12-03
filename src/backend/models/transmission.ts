/**
 * Classe Transmission
 * Gerencia os dados da transmissão: código único fixo, status e lista de alunos conectados.
 */
export class Transmission {
  public readonly code: string; // Código agora é fixo e somente leitura
  public students: string[];
  public isActive: boolean;

  constructor() {
    this.code = this.generateCode(); // Gera apenas uma vez na inicialização
    this.students = [];
    this.isActive = false;
  }

  /**
   * Gera um código único fixo para a transmissão.
   */
  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  /**
   * Adiciona um aluno à lista de conectados.
   */
  public addStudent(name: string): void {
    if (!this.students.includes(name)) {
      this.students.push(name);
    }
  }

  /**
   * Remove um aluno da lista de conectados.
   */
  public removeStudent(name: string): void {
    this.students = this.students.filter((student) => student !== name);
  }

  /**
   * Reinicia a transmissão, mantendo o código fixo.
   */
  public reset(): void {
    this.students = [];
    this.isActive = false;
  }
}