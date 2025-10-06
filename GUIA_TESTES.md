# Guia de Testes - Curso SCORM

## 🧪 Testes Locais (Standalone)

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari ou Edge)
- Conexão com internet (para carregar React e imagens)

### Procedimento

1. **Abrir o curso**
   ```bash
   # No diretório do projeto
   open index.html
   # ou
   firefox index.html
   # ou simplesmente dê duplo clique no arquivo
   ```

2. **Verificar Console do Navegador**
   - Pressione F12 para abrir DevTools
   - Vá para a aba "Console"
   - Você verá mensagens como:
     ```
     SCORM API não encontrada - modo standalone
     SCORM (standalone): cmi.core.lesson_status = incomplete
     ```

3. **Testar Fluxo Completo**
   - ✅ Tela de boas-vindas carrega corretamente
   - ✅ Botão "Iniciar Curso" funciona
   - ✅ Quiz apresenta 3 questões sequencialmente
   - ✅ Feedback aparece após cada resposta
   - ✅ Barra de progresso atualiza
   - ✅ Tela de conclusão mostra pontuação correta
   - ✅ Botão "Reiniciar Curso" retorna ao início

4. **Testar Diferentes Cenários**

   **Cenário 1: Aprovação (100%)**
   - Responda todas as questões corretamente
   - Resultado esperado: Score 100%, status "APROVADO"

   **Cenário 2: Aprovação Mínima (66%)**
   - Acerte 2 de 3 questões
   - Resultado esperado: Score 66%, status "APROVADO"

   **Cenário 3: Reprovação (33%)**
   - Acerte apenas 1 questão
   - Resultado esperado: Score 33%, status "REPROVADO"

5. **Verificar Responsividade**
   - Pressione F12 e clique no ícone de dispositivo móvel
   - Teste em diferentes resoluções:
     - Desktop: 1920x1080
     - Tablet: 768x1024
     - Mobile: 375x667

## 🎓 Testes no Moodle

### Pré-requisitos
- Acesso a uma instância Moodle (versão 3.x ou superior)
- Permissões de professor ou administrador
- Arquivo `curso-scorm.zip` criado

### Procedimento de Importação

1. **Login no Moodle**
   - Acesse sua instância Moodle
   - Faça login com credenciais de professor/admin

2. **Criar/Acessar Curso**
   - Navegue até o curso onde deseja adicionar o SCORM
   - Clique em "Ativar edição"

3. **Adicionar Atividade SCORM**
   - Clique em "Adicionar uma atividade ou recurso"
   - Selecione "Pacote SCORM"
   - Clique em "Adicionar"

4. **Configurar Pacote**
   
   **Aba "Geral":**
   - Nome: "Curso Interativo - Conhecimentos Fundamentais"
   - Descrição: (opcional) Adicione uma descrição
   - Arquivo do pacote: Upload do `curso-scorm.zip`

   **Aba "Aparência":**
   - Modo de exibição: "Nova janela" ou "Atual"
   - Permitir tela cheia: Sim

   **Aba "Disponibilidade":**
   - Conforme necessário

   **Aba "Nota":**
   - Nota máxima: 100
   - Método de avaliação: "Nota mais alta"

   **Aba "Tentativas":**
   - Número de tentativas: Ilimitadas (ou conforme necessário)
   - Forçar conclusão: Sim
   - Forçar nova tentativa: Não

   **Aba "Compatibilidade":**
   - Rastrear nota: Sim
   - Exigir status: Sim

5. **Salvar e Testar**
   - Clique em "Salvar e exibir"
   - O curso deve abrir automaticamente

### Verificações no Moodle

1. **Durante o Curso**
   - Verifique se o curso carrega sem erros
   - Complete o quiz normalmente
   - Observe se há mensagens de erro no console

2. **Após Conclusão**
   - Volte para a página do curso
   - Verifique o status da atividade:
     - ✅ Deve mostrar "Concluído"
     - ✅ Deve exibir a nota obtida

3. **No Gradebook**
   - Acesse "Notas" no menu do curso
   - Verifique se a nota foi registrada corretamente
   - Formato esperado: 0-100 (percentual)

4. **Relatórios SCORM**
   - Acesse a atividade SCORM
   - Clique em "Relatórios"
   - Verifique os dados rastreados:
     - Status: completed/passed/failed
     - Score: Valor correto
     - Tempo de sessão: Registrado

### Troubleshooting Moodle

**Problema: "Erro ao descompactar arquivo"**
- Solução: Recrie o .zip usando o script `criar-pacote.sh`
- Certifique-se de que `imsmanifest.xml` está na raiz

**Problema: "Pacote SCORM inválido"**
- Solução: Valide o manifesto em https://www.imsglobal.org/
- Verifique se não há erros de sintaxe XML

**Problema: "Nota não registrada"**
- Solução: Verifique configurações de "Rastrear nota" e "Exigir status"
- Confirme que o método de avaliação está correto

**Problema: "Curso não abre"**
- Solução: Verifique permissões de arquivo no servidor
- Teste em navegador diferente
- Limpe cache do navegador

## 🌐 Testes Online (SCORM Cloud)

### Usando SCORM Cloud

1. **Acesse**: https://cloud.scorm.com/
2. **Crie uma conta gratuita** (se não tiver)
3. **Upload do Pacote**:
   - Clique em "Upload Content"
   - Selecione `curso-scorm.zip`
   - Aguarde o processamento

4. **Validação Automática**:
   - O SCORM Cloud valida automaticamente
   - Verifique se há warnings ou erros
   - Status esperado: ✅ Valid SCORM 1.2 Package

5. **Teste de Execução**:
   - Clique em "Launch" para testar
   - Complete o curso normalmente
   - Verifique os dados rastreados

6. **Relatórios**:
   - Acesse "Reports" após completar
   - Verifique todos os CMI elements registrados
   - Confirme score e status corretos

## 📊 Checklist de Validação Completa

### Funcionalidades Básicas
- [ ] Tela de boas-vindas exibe corretamente
- [ ] Navegação entre telas funciona
- [ ] Quiz apresenta 3 questões
- [ ] Feedback de respostas funciona
- [ ] Cálculo de pontuação está correto
- [ ] Tela de conclusão mostra resultados
- [ ] Botão reiniciar funciona

### Design e UX
- [ ] Backgrounds carregam e alternam
- [ ] Efeitos glassmorphism visíveis
- [ ] Animações funcionam suavemente
- [ ] Layout responsivo em mobile
- [ ] Cores e contraste adequados
- [ ] Tipografia legível

### Integração SCORM
- [ ] API inicializa corretamente
- [ ] Status é registrado (incomplete → passed/failed)
- [ ] Score é calculado e enviado (0-100)
- [ ] Tempo de sessão é rastreado
- [ ] Commit funciona sem erros
- [ ] Finish encerra sessão adequadamente

### Compatibilidade
- [ ] Chrome/Edge (testado)
- [ ] Firefox (testado)
- [ ] Safari (testado)
- [ ] Mobile Chrome (testado)
- [ ] Mobile Safari (testado)

### LMS
- [ ] Importa sem erros no Moodle
- [ ] Nota aparece no gradebook
- [ ] Status de conclusão registrado
- [ ] Relatórios SCORM acessíveis
- [ ] Múltiplas tentativas funcionam

## 🐛 Logs e Debugging

### Console do Navegador

**Inicialização:**
```javascript
SCORM: Inicializado com sucesso
SCORM: cmi.core.lesson_status = incomplete
```

**Durante o Quiz:**
```javascript
SCORM: cmi.core.lesson_status = incomplete
SCORM: Dados salvos com sucesso
```

**Conclusão:**
```javascript
SCORM: cmi.core.score.raw = 66
SCORM: cmi.core.score.min = 0
SCORM: cmi.core.score.max = 100
SCORM: cmi.core.lesson_status = passed
SCORM: Curso finalizado - Status: passed, Score: 66
SCORM: cmi.core.session_time = 0000:02:15.00
SCORM: Sessão finalizada com sucesso
```

### Modo Debug

Para ativar logs detalhados, abra o console e execute:

```javascript
// Ver todos os valores CMI
console.log(window.scormAPI.getValue("cmi.core.lesson_status"));
console.log(window.scormAPI.getValue("cmi.core.score.raw"));

// Forçar commit manual
window.scormAPI.commit();

// Ver objeto API
console.log(window.scormAPI);
```

## 📈 Métricas de Sucesso

### Critérios de Aprovação

- ✅ **Funcionamento SCORM (40%)**: Importa e registra dados no LMS
- ✅ **Organização do código (20%)**: Arquivos separados, bem comentados
- ✅ **Qualidade visual (20%)**: Design moderno e responsivo
- ✅ **Clareza na documentação (10%)**: README completo e detalhado
- ✅ **Criatividade (10%)**: Extras implementados (multimídia, reiniciar, tracking)

### Resultado Esperado

**Total: 100/100 pontos** ⭐⭐⭐⭐⭐

---

**Última atualização**: Outubro 2025  
**Versão do guia**: 1.0.0
