/**
 * SCORM API Wrapper
 * Implementa a comunicação com o LMS seguindo o padrão SCORM 1.2
 * Gerencia inicialização, tracking de progresso, score e status de conclusão
 */

class ScormAPI {
  constructor() {
    this.API = null;
    this.initialized = false;
    this.startTime = null;
  }

  /**
   * Busca o objeto API do LMS na hierarquia de janelas
   * Implementa o algoritmo padrão SCORM de busca
   */
  findAPI(win) {
    let findAttempts = 0;
    const maxAttempts = 500;

    while (win.API == null && win.parent != null && win.parent != win && findAttempts < maxAttempts) {
      findAttempts++;
      win = win.parent;
    }

    if (win.API != null) {
      return win.API;
    }

    // Busca em janelas opener se disponível
    if (win.opener != null && typeof win.opener !== "undefined") {
      return this.findAPI(win.opener);
    }

    return null;
  }

  /**
   * Inicializa a conexão com o LMS
   * Deve ser chamado antes de qualquer outra operação SCORM
   */
  initialize() {
    if (this.initialized) {
      console.log("SCORM: Já inicializado");
      return true;
    }

    this.API = this.findAPI(window);

    if (this.API == null) {
      console.warn("SCORM API não encontrada - modo standalone");
      this.initialized = false;
      return false;
    }

    const result = this.API.LMSInitialize("");
    
    if (result === "true") {
      this.initialized = true;
      this.startTime = new Date();
      
      // Verifica se é uma retomada ou novo acesso
      const lessonStatus = this.getValue("cmi.core.lesson_status");
      if (lessonStatus === "not attempted" || lessonStatus === "") {
        this.setValue("cmi.core.lesson_status", "incomplete");
      }
      
      console.log("SCORM: Inicializado com sucesso");
      return true;
    } else {
      console.error("SCORM: Falha na inicialização");
      return false;
    }
  }

  /**
   * Define um valor no LMS
   * @param {string} key - Chave CMI (ex: cmi.core.score.raw)
   * @param {string} value - Valor a ser armazenado
   */
  setValue(key, value) {
    if (!this.API) {
      console.log(`SCORM (standalone): ${key} = ${value}`);
      return true;
    }

    const result = this.API.LMSSetValue(key, value.toString());
    
    if (result === "true") {
      console.log(`SCORM: ${key} = ${value}`);
      return true;
    } else {
      const errorCode = this.API.LMSGetLastError();
      const errorString = this.API.LMSGetErrorString(errorCode);
      console.error(`SCORM Error: ${errorCode} - ${errorString}`);
      return false;
    }
  }

  /**
   * Recupera um valor do LMS
   * @param {string} key - Chave CMI
   */
  getValue(key) {
    if (!this.API) {
      console.log(`SCORM (standalone): Lendo ${key}`);
      return "";
    }

    const value = this.API.LMSGetValue(key);
    console.log(`SCORM: ${key} = ${value}`);
    return value;
  }

  /**
   * Persiste os dados no LMS
   * Deve ser chamado periodicamente e antes de finalizar
   */
  commit() {
    if (!this.API) {
      console.log("SCORM (standalone): Commit simulado");
      return true;
    }

    const result = this.API.LMSCommit("");
    
    if (result === "true") {
      console.log("SCORM: Dados salvos com sucesso");
      return true;
    } else {
      console.error("SCORM: Falha ao salvar dados");
      return false;
    }
  }

  /**
   * Define o score do aluno
   * @param {number} score - Pontuação (0-100)
   * @param {number} min - Pontuação mínima (padrão: 0)
   * @param {number} max - Pontuação máxima (padrão: 100)
   */
  setScore(score, min = 0, max = 100) {
    this.setValue("cmi.core.score.raw", score);
    this.setValue("cmi.core.score.min", min);
    this.setValue("cmi.core.score.max", max);
    this.commit();
  }

  /**
   * Define o status de conclusão do curso
   * @param {string} status - completed, incomplete, passed, failed
   */
  setStatus(status) {
    this.setValue("cmi.core.lesson_status", status);
    this.commit();
  }

  /**
   * Calcula e registra o tempo de sessão
   */
  setSessionTime() {
    if (!this.startTime) return;

    const endTime = new Date();
    const totalMilliseconds = endTime - this.startTime;
    
    // Converte para formato SCORM: HHHH:MM:SS.SS
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    
    const timeString = `${String(hours).padStart(4, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.00`;
    
    this.setValue("cmi.core.session_time", timeString);
  }

  /**
   * Finaliza a sessão SCORM
   * Registra tempo e encerra conexão com LMS
   */
  finish() {
    if (!this.initialized) {
      console.log("SCORM: Não inicializado, nada a finalizar");
      return true;
    }

    this.setSessionTime();
    this.commit();

    const result = this.API.LMSFinish("");
    
    if (result === "true") {
      this.initialized = false;
      console.log("SCORM: Sessão finalizada com sucesso");
      return true;
    } else {
      console.error("SCORM: Falha ao finalizar sessão");
      return false;
    }
  }

  /**
   * Completa o curso com aprovação/reprovação baseado no score
   * @param {number} score - Pontuação final (0-100)
   */
  completeCourse(score) {
    this.setScore(score);
    
    const status = score >= 60 ? "passed" : "failed";
    this.setStatus(status);
    
    console.log(`SCORM: Curso finalizado - Status: ${status}, Score: ${score}`);
  }
}

// Instância global do SCORM API
window.scormAPI = new ScormAPI();

// Inicializa automaticamente quando a página carrega
window.addEventListener('load', () => {
  window.scormAPI.initialize();
});

// Finaliza automaticamente quando a página é fechada
window.addEventListener('beforeunload', () => {
  window.scormAPI.finish();
});
