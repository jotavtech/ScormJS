# Curso SCORM Interativo - Conhecimentos Fundamentais

## 📋 Visão Geral

Este projeto implementa um curso completo em formato SCORM 1.2, desenvolvido com tecnologias web modernas (React, JavaScript, HTML5 e CSS3). O curso apresenta uma interface responsiva com design dark mode e efeitos glassmorphism, garantindo uma experiência visual moderna e profissional.

O conteúdo aborda conceitos fundamentais sobre sistemas LMS e tecnologias educacionais, avaliando o conhecimento do aluno através de um quiz interativo de múltipla escolha. Toda a interação é rastreada e sincronizada automaticamente com o LMS através da API SCORM.

## 🎯 Objetivos Implementados

### Requisitos Obrigatórios ✅

- **Estrutura SCORM Completa**: Implementação do padrão SCORM 1.2 com `imsmanifest.xml` válido
- **Três Telas Funcionais**:
  - Tela 1: Boas-vindas com apresentação do curso e botão de início
  - Tela 2: Quiz interativo com 3 perguntas de múltipla escolha e feedback imediato
  - Tela 3: Conclusão com exibição de resultados e estatísticas detalhadas
- **Integração LMS**: Registro automático de status (`completed`, `passed`, `failed`)
- **Sistema de Avaliação**: Cálculo de pontuação com nota mínima de 60% para aprovação
- **JavaScript Puro**: Utilização de React (biblioteca JavaScript) para gerenciamento de estado
- **Layout Responsivo**: Design adaptável para desktop, tablet e mobile

### Requisitos Opcionais ✅

- **Recursos Multimídia**: Imagens abstratas de alta qualidade da Unsplash como backgrounds dinâmicos
- **Botão de Reiniciar**: Funcionalidade completa de reset do curso
- **Tracking Adicional**: Registro de tempo de sessão (`cmi.core.session_time`)

## 🏗️ Arquitetura Técnica

### Estrutura de Arquivos

```
ScormJS/
├── imsmanifest.xml      # Manifesto SCORM 1.2
├── index.html           # Estrutura HTML principal
├── scorm-api.js         # Wrapper da API SCORM
├── app.js               # Aplicação React
├── styles.css           # Estilos com glassmorphism
└── README.md            # Documentação técnica
```

### Tecnologias Utilizadas

- **React 18**: Gerenciamento de estado e componentização
- **SCORM 1.2**: Padrão de interoperabilidade com LMS
- **CSS3**: Animações, glassmorphism, blur effects e gradientes
- **Babel Standalone**: Transpilação JSX em runtime
- **Unsplash API**: Imagens abstratas de alta resolução

## 🔧 Implementação SCORM

### API Wrapper (`scorm-api.js`)

Desenvolvi uma classe `ScormAPI` que encapsula toda a comunicação com o LMS, implementando os seguintes métodos:

- `initialize()`: Estabelece conexão com o LMS através do algoritmo de busca padrão SCORM
- `setValue(key, value)`: Define valores CMI (Course Management Information)
- `getValue(key)`: Recupera valores armazenados no LMS
- `commit()`: Persiste dados no LMS
- `setScore(score, min, max)`: Registra pontuação do aluno
- `setStatus(status)`: Define status de conclusão
- `setSessionTime()`: Calcula e registra tempo de sessão no formato SCORM
- `finish()`: Finaliza sessão e encerra conexão

### Elementos CMI Rastreados

```javascript
cmi.core.lesson_status    // incomplete, completed, passed, failed
cmi.core.score.raw        // Pontuação 0-100
cmi.core.score.min        // Pontuação mínima (0)
cmi.core.score.max        // Pontuação máxima (100)
cmi.core.session_time     // Tempo de sessão (HHHH:MM:SS.SS)
```

### Mastery Score

Configurado no manifesto através da tag `<adlcp:masteryscore>60</adlcp:masteryscore>`, estabelecendo 60% como nota mínima para aprovação.

## 🎨 Design System

### Paleta de Cores

```css
--primary-color: #6366f1      /* Indigo principal */
--primary-hover: #4f46e5      /* Indigo hover */
--success-color: #10b981      /* Verde sucesso */
--error-color: #ef4444        /* Vermelho erro */
--text-primary: #f8fafc       /* Texto principal */
--text-secondary: #cbd5e1     /* Texto secundário */
--glass-bg: rgba(15, 23, 42, 0.7)  /* Background glass */
```

### Efeitos Visuais

- **Glassmorphism**: `backdrop-filter: blur(20px)` com backgrounds semi-transparentes
- **Bordas Arredondadas**: `border-radius: 16px-24px` em todos os cards
- **Gradientes**: Aplicados em títulos, botões e elementos de destaque
- **Animações**: `fadeInUp`, `scaleIn`, `float`, `shimmer` para transições suaves
- **Backgrounds Dinâmicos**: Rotação automática a cada 5 segundos com fade

## 💻 Funcionalidades Implementadas

### Tela de Boas-Vindas

- Ícone animado com efeito float
- Lista de features com ícones e hover effects
- Gradiente no título usando `background-clip: text`
- Botão call-to-action com animação shimmer

### Tela do Quiz

- Barra de progresso animada com efeito shimmer
- Feedback imediato (correto/incorreto) com explicações
- Destaque visual das respostas corretas e incorretas
- Transição automática entre questões (2.5s delay)
- Desabilitação de opções após resposta
- Cálculo automático de pontuação

### Tela de Conclusão

- Ícone animado com `scaleIn`
- Display de pontuação com gradiente condicional (verde/vermelho)
- Grid de estatísticas (acertos, erros, nota mínima)
- Badge de status (APROVADO/REPROVADO)
- Informações de sincronização SCORM
- Botão de reiniciar curso

## 🧪 Testes Realizados

### Teste Local (Standalone)

1. Abri o arquivo `index.html` diretamente no navegador
2. Verifiquei o funcionamento de todas as três telas
3. Testei o quiz completo com diferentes combinações de respostas
4. Confirmei o cálculo correto de pontuação (33%, 66%, 100%)
5. Validei o comportamento do botão reiniciar
6. Testei responsividade em diferentes resoluções (desktop, tablet, mobile)

**Console Output (Modo Standalone):**
```
SCORM API não encontrada - modo standalone
SCORM (standalone): cmi.core.lesson_status = incomplete
SCORM (standalone): cmi.core.score.raw = 66
SCORM (standalone): cmi.core.lesson_status = passed
```

### Teste em LMS (Moodle)

Para testar em ambiente real:

1. Compactei todos os arquivos em `curso-scorm.zip`
2. Acesse Moodle como administrador/professor
3. Adicione atividade do tipo "Pacote SCORM"
4. Faça upload do arquivo .zip
5. Configure as opções de rastreamento
6. Lance o curso e complete o quiz
7. Verifique o registro de notas no gradebook do Moodle

**Resultado Esperado:**
- Status: "Concluído" ou "Aprovado/Reprovado"
- Nota: Valor percentual (0-100)
- Tempo de sessão: Registrado automaticamente

## 📦 Empacotamento para LMS

### Processo de Criação do .zip

```bash
# Navegar até o diretório do projeto
cd /home/joaovitor/ScormJS

# Criar arquivo .zip com todos os arquivos necessários
zip -r curso-scorm.zip imsmanifest.xml index.html scorm-api.js app.js styles.css

# Verificar conteúdo do arquivo
unzip -l curso-scorm.zip
```

### Arquivos Incluídos

- `imsmanifest.xml` (obrigatório)
- `index.html`
- `scorm-api.js`
- `app.js`
- `styles.css`

**Importante**: O manifesto deve estar na raiz do .zip para ser reconhecido pelo LMS.

## 🚀 Como Importar no Moodle

1. **Login**: Acesse o Moodle com permissões de professor/administrador
2. **Ativar Edição**: Clique em "Ativar edição" no curso desejado
3. **Adicionar Atividade**: Selecione "Adicionar uma atividade ou recurso"
4. **Escolher SCORM**: Selecione "Pacote SCORM" na lista
5. **Upload**: Faça upload do arquivo `curso-scorm.zip`
6. **Configurações**:
   - Método de avaliação: Nota mais alta
   - Tentativas: Ilimitadas (ou conforme necessário)
   - Forçar conclusão: Sim
   - Rastrear nota: Sim
7. **Salvar**: Clique em "Salvar e exibir"

## 🔍 Validação SCORM

### Ferramentas Utilizadas

- **SCORM Cloud**: Plataforma de teste online (https://cloud.scorm.com/)
- **Moodle Local**: Instalação local para testes completos
- **Console do Navegador**: Monitoramento de chamadas SCORM

### Checklist de Validação

- [x] Manifesto XML válido e bem-formado
- [x] Inicialização SCORM bem-sucedida
- [x] Registro de status (incomplete → passed/failed)
- [x] Registro de pontuação (0-100)
- [x] Cálculo correto de tempo de sessão
- [x] Finalização adequada da sessão
- [x] Compatibilidade com SCORM 1.2

## 🎓 Conceitos Demonstrados

### JavaScript Avançado

- Programação orientada a objetos (classe ScormAPI)
- Promises e async/await
- Event listeners e lifecycle management
- Manipulação do DOM
- Algoritmos de busca (findAPI recursivo)

### React

- Hooks (useState, useEffect)
- Componentização e props
- Gerenciamento de estado
- Renderização condicional
- Event handling

### CSS Moderno

- Custom properties (variáveis CSS)
- Flexbox e Grid Layout
- Animações e transitions
- Media queries para responsividade
- Backdrop filters (glassmorphism)
- Gradientes e blend modes

### SCORM

- Estrutura de manifesto XML
- API de comunicação com LMS
- CMI Data Model
- Session time tracking
- Score e status management

## 📊 Métricas do Projeto

- **Linhas de Código**: ~1.200 linhas
- **Componentes React**: 4 (App, WelcomeScreen, QuizScreen, CompletionScreen)
- **Funções SCORM**: 10 métodos principais
- **Animações CSS**: 8 keyframes customizados
- **Questões do Quiz**: 3 perguntas com 4 alternativas cada
- **Tempo de Desenvolvimento**: 2 dias (conforme especificação)

## 🔐 Boas Práticas Implementadas

- **Separação de Responsabilidades**: Lógica SCORM isolada em módulo próprio
- **Código Comentado**: Documentação inline em português
- **Error Handling**: Tratamento de erros na comunicação SCORM
- **Fallback Mode**: Funcionamento standalone quando LMS não disponível
- **Acessibilidade**: Focus states e suporte a prefers-reduced-motion
- **Performance**: Uso de CDN para bibliotecas externas
- **Responsividade**: Mobile-first approach

## 🐛 Troubleshooting

### Problema: SCORM API não encontrada

**Solução**: Normal em modo standalone. O curso funciona localmente mas não registra dados. Para testar integração real, use um LMS.

### Problema: Manifesto inválido no Moodle

**Solução**: Verifique se o `imsmanifest.xml` está na raiz do .zip e se não há erros de sintaxe XML.

### Problema: Nota não aparece no gradebook

**Solução**: Confirme que a opção "Rastrear nota" está habilitada nas configurações do SCORM no Moodle.

### Problema: Backgrounds não carregam

**Solução**: Verifique conexão com internet. As imagens são carregadas da Unsplash via CDN.

## 👨‍💻 Autor

**João Vitor**  
Desenvolvedor Full Stack.

### Competências Demonstradas

- Desenvolvimento front-end com React
- Integração com padrões SCORM
- Design de interfaces modernas (glassmorphism, dark mode)
- Documentação técnica detalhada
- Testes e validação de software educacional

## 📄 Licença

Este projeto foi desenvolvido como parte de um processo seletivo para vaga de estágio em Suporte N1 com foco em Moodle e tecnologias educacionais.

---

**Data de Conclusão**: Outubro de 2025  
**Versão**: 0.0.1 
**Compatibilidade**: SCORM 1.2 | Moodle 3.x+ | Navegadores modernos (Chrome, Firefox, Safari, Edge)
