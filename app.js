/**
 * Aplicação React - Curso SCORM Interativo
 * Implementa navegação entre telas, quiz interativo e integração com LMS
 */

const { useState, useEffect } = React;

// ===== Dados do Quiz =====
const quizQuestions = [
  {
    id: 1,
    question: "Qual é o principal objetivo de um sistema LMS (Learning Management System)?",
    options: [
      "Gerenciar apenas o cadastro de alunos",
      "Facilitar a criação, distribuição e acompanhamento de conteúdos educacionais",
      "Substituir completamente professores e tutores",
      "Apenas armazenar vídeos e documentos"
    ],
    correctAnswer: 1,
    explanation: "Um LMS é uma plataforma completa para gestão de aprendizagem, permitindo criar, distribuir e acompanhar conteúdos educacionais de forma integrada."
  },
  {
    id: 2,
    question: "O que significa a sigla SCORM no contexto de e-learning?",
    options: [
      "System Content Organization and Resource Management",
      "Sharable Content Object Reference Model",
      "Standard Course Online Resource Module",
      "Structured Content for Online Remote Management"
    ],
    correctAnswer: 1,
    explanation: "SCORM significa Sharable Content Object Reference Model, um padrão internacional para conteúdos de e-learning que garante interoperabilidade entre diferentes plataformas."
  },
  {
    id: 3,
    question: "Qual das seguintes tecnologias NÃO é comumente utilizada no desenvolvimento de conteúdos web interativos?",
    options: [
      "HTML5 para estruturação de conteúdo",
      "CSS3 para estilização e animações",
      "JavaScript para interatividade",
      "COBOL para lógica de negócio"
    ],
    correctAnswer: 3,
    explanation: "COBOL é uma linguagem antiga usada principalmente em sistemas legados bancários. HTML5, CSS3 e JavaScript são as tecnologias fundamentais para desenvolvimento web moderno."
  }
];

// ===== Componente: Tela de Boas-Vindas =====
function WelcomeScreen({ onNext }) {
  return (
    <div className="glass-card">
      <div className="welcome-icon">🚀</div>
      <h1 className="title">Bem-vindo ao Curso Interativo</h1>
      <p className="subtitle">
        Conhecimentos Fundamentais em Tecnologia Educacional
      </p>
      
      <div className="description">
        <p>
          Este curso foi desenvolvido para apresentar conceitos essenciais sobre 
          plataformas de aprendizagem e tecnologias web. Você será avaliado através 
          de um quiz interativo ao final.
        </p>
      </div>

      <ul className="feature-list">
        <li className="feature-item">
          <span className="feature-icon">📚</span>
          <span className="feature-text">Conteúdo estruturado e objetivo</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon">✅</span>
          <span className="feature-text">Quiz com 3 perguntas de múltipla escolha</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon">🎯</span>
          <span className="feature-text">Nota mínima para aprovação: 60%</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon">📊</span>
          <span className="feature-text">Progresso registrado automaticamente no LMS</span>
        </li>
      </ul>

      <div className="btn-container">
        <button className="btn btn-primary" onClick={onNext}>
          Iniciar Curso →
        </button>
      </div>
    </div>
  );
}

// ===== Componente: Tela do Quiz =====
function QuizScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (questionId, answerIndex) => {
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;

    // Registra a resposta imediatamente
    const newAnswers = {
      ...answers,
      [questionId]: { answer: answerIndex, correct: isCorrect }
    };
    setAnswers(newAnswers);

    // Mostra feedback
    setShowFeedback({
      show: true,
      correct: isCorrect,
      explanation: question.explanation
    });

    // Aguarda 2 segundos antes de avançar
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowFeedback({});
      } else {
        // Quiz completo
        setQuizCompleted(true);
        calculateScore(newAnswers);
      }
    }, 2500);
  };

  const calculateScore = (finalAnswers) => {
    const correctAnswers = Object.values(finalAnswers).filter(a => a.correct).length;
    const totalQuestions = quizQuestions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Registra no SCORM
    if (window.scormAPI) {
      window.scormAPI.completeCourse(scorePercentage);
    }

    // Passa para a tela de conclusão com detalhes das respostas
    setTimeout(() => {
      onComplete({
        score: scorePercentage,
        correct: correctAnswers,
        total: totalQuestions,
        passed: scorePercentage >= 60,
        answers: finalAnswers
      });
    }, 1000);
  };

  if (quizCompleted) {
    return (
      <div className="glass-card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
          Calculando sua pontuação...
        </p>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const hasAnswered = showFeedback.show;

  return (
    <div className="glass-card">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Questão {currentQuestion + 1} de {quizQuestions.length}
        </div>
      </div>

      <div className="quiz-container">
        <div className="question-card">
          <span className="question-number">Questão {question.id}</span>
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-container">
            {question.options.map((option, index) => {
              let className = "option-button";
              
              if (hasAnswered) {
                if (index === question.correctAnswer) {
                  className += " correct";
                } else if (index === answers[question.id]?.answer && !answers[question.id]?.correct) {
                  className += " incorrect";
                }
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => !hasAnswered && handleAnswer(question.id, index)}
                  disabled={hasAnswered}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              );
            })}
          </div>

          {showFeedback.show && (
            <div className={`feedback ${showFeedback.correct ? 'correct' : 'incorrect'}`}>
              <span className="feedback-icon">
                {showFeedback.correct ? '✓' : '✗'}
              </span>
              <div>
                <strong>{showFeedback.correct ? 'Correto!' : 'Incorreto!'}</strong>
                <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
                  {showFeedback.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Componente: Tela de Conclusão =====
function CompletionScreen({ results, onRestart }) {
  const { score, correct, total, passed, answers } = results;

  useEffect(() => {
    // Anima o background na tela final
    const backgrounds = document.querySelectorAll('.background-image');
    backgrounds.forEach((bg, index) => {
      setTimeout(() => {
        bg.classList.add('active');
      }, index * 1000);
    });
  }, []);

  return (
    <div className="glass-card glass-card-large">
      <div className="completion-icon">
        {passed ? '🎉' : '📚'}
      </div>
      
      <h1 className="title">
        {passed ? 'Parabéns!' : 'Curso Concluído'}
      </h1>
      
      <p className="subtitle">
        {passed 
          ? 'Você concluiu o curso com sucesso!' 
          : 'Continue estudando para melhorar seu desempenho!'}
      </p>

      <div className="score-display">
        <div className="score-label">Sua Pontuação</div>
        <div className={`score-value ${passed ? '' : 'failed'}`}>
          {score}%
        </div>
        <div className={`score-status ${passed ? 'passed' : 'failed'}`}>
          {passed ? '✓ APROVADO' : '✗ REPROVADO'}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{correct}/{total}</div>
          <div className="stat-label">Acertos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{total - correct}/{total}</div>
          <div className="stat-label">Erros</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">60%</div>
          <div className="stat-label">Nota Mínima</div>
        </div>
      </div>

      {/* Resumo das Questões */}
      <div className="questions-review">
        <h2 className="review-title">📝 Resumo das Questões</h2>
        
        {quizQuestions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer?.correct;
          
          return (
            <div key={question.id} className={`review-card ${isCorrect ? 'review-correct' : 'review-incorrect'}`}>
              <div className="review-header">
                <span className="review-number">Questão {index + 1}</span>
                <span className={`review-badge ${isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>
                  {isCorrect ? '✓ Acertou' : '✗ Errou'}
                </span>
              </div>
              
              <p className="review-question">{question.question}</p>
              
              <div className="review-answers">
                <div className="review-answer-item">
                  <strong className="answer-label">Sua resposta:</strong>
                  <span className={isCorrect ? 'answer-correct' : 'answer-incorrect'}>
                    {question.options[userAnswer?.answer]}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="review-answer-item">
                    <strong className="answer-label">Resposta correta:</strong>
                    <span className="answer-correct">
                      {question.options[question.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="review-explanation">
                <strong>💡 Explicação:</strong> {question.explanation}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        <button className="btn btn-primary" onClick={onRestart}>
          🔄 Reiniciar Curso
        </button>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(30, 41, 59, 0.5)', 
        borderRadius: '12px',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        textAlign: 'center'
      }}>
        <strong>Status SCORM:</strong> {passed ? 'passed' : 'failed'} | 
        <strong> Score:</strong> {score}/100 | 
        <strong> Dados sincronizados com o LMS</strong>
      </div>
    </div>
  );
}

// ===== Componente Principal =====
function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [quizResults, setQuizResults] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Efeito para alternar backgrounds
  useEffect(() => {
    const backgrounds = document.querySelectorAll('.background-image');
    
    const interval = setInterval(() => {
      backgrounds.forEach(bg => bg.classList.remove('active'));
      
      setBackgroundIndex(prev => {
        const next = (prev + 1) % backgrounds.length;
        backgrounds[next].classList.add('active');
        return next;
      });
    }, 5000);

    // Ativa o primeiro background
    if (backgrounds[0]) {
      backgrounds[0].classList.add('active');
    }

    return () => clearInterval(interval);
  }, []);

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
    
    // Atualiza status no SCORM
    if (window.scormAPI) {
      window.scormAPI.setStatus('incomplete');
    }
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentScreen('completion');
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setQuizResults(null);
    
    // Reinicia o SCORM
    if (window.scormAPI) {
      window.scormAPI.setStatus('incomplete');
      window.scormAPI.setScore(0);
    }
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onNext={handleStartQuiz} />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}
      
      {currentScreen === 'completion' && quizResults && (
        <CompletionScreen results={quizResults} onRestart={handleRestart} />
      )}
    </>
  );
}

// ===== Renderização =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
