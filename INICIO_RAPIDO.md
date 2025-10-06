# Início Rápido

## Teste Local (30 segundos)

```bash
# 1. Abra o arquivo no navegador
Abra com o Live Server, ou qualquer outro navegador.
```

Pronto! O curso está rodando localmente.

## Importar no Moodle (2 minutos)

```bash
# 1. Crie o pacote (já está criado: curso-scorm.zip)
./criar-pacote.sh

# 2. No Moodle:
# - Ativar edição
# - Adicionar atividade → Pacote SCORM
# - Upload: curso-scorm.zip
# - Salvar e exibir
```

## Estrutura do Projeto

```
ScormJS/
├── 📄 imsmanifest.xml    # Manifesto SCORM 1.2
├── 🌐 index.html         # Página principal
├── ⚙️  scorm-api.js      # API SCORM wrapper
├── ⚛️  app.js            # Aplicação React
├── 🎨 styles.css         # Estilos glassmorphism
├── 📦 curso-scorm.zip    # Pacote pronto para LMS
├── 📖 README.md          # Documentação completa
├── 🧪 GUIA_TESTES.md     # Guia de testes
└── 🔧 criar-pacote.sh    # Script de empacotamento
```

## Características Principais

✅ **SCORM 1.2 Completo** - Compatível com Moodle, Blackboard, Canvas  
✅ **3 Telas Interativas** - Boas-vindas, Quiz, Conclusão  
✅ **Quiz com Feedback** - 3 perguntas com explicações  
✅ **Design Moderno** - Dark mode + Glassmorphism  
✅ **Responsivo** - Desktop, tablet e mobile  
✅ **Tracking LMS** - Status, score e tempo de sessão  
✅ **Reiniciar Curso** - Funcionalidade completa  
✅ **Imagens Abstratas** - Backgrounds dinâmicos da Unsplash  

## Tecnologias

- React 18
- SCORM 1.2
- CSS3 (Glassmorphism)
- JavaScript ES6+
- HTML5

## Nota Mínima

**60%** para aprovação (2 de 3 questões corretas)

## Suporte

Consulte o **README.md** para documentação completa ou **GUIA_TESTES.md** para procedimentos de teste detalhados.

---

**Desenvolvido por**: João Vitor Chaves
**Versão**: 0.0.1 
**Data**: Outubro 2025
