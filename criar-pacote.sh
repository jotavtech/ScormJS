#!/bin/bash

###############################################################################
# Script de Empacotamento SCORM
# Cria o arquivo .zip pronto para importação em LMS
###############################################################################

echo "=========================================="
echo "  Criando Pacote SCORM"
echo "=========================================="
echo ""

# Remove pacote anterior se existir
if [ -f "curso-scorm.zip" ]; then
    echo "🗑️  Removendo pacote anterior..."
    rm curso-scorm.zip
fi

# Cria o novo pacote
echo "📦 Empacotando arquivos..."
zip -r curso-scorm.zip \
    imsmanifest.xml \
    index.html \
    scorm-api.js \
    app.js \
    styles.css

echo ""
echo "✅ Pacote criado com sucesso!"
echo ""

# Mostra informações do pacote
echo "📊 Informações do pacote:"
echo "----------------------------------------"
ls -lh curso-scorm.zip
echo ""

# Lista conteúdo do pacote
echo "📋 Conteúdo do pacote:"
echo "----------------------------------------"
unzip -l curso-scorm.zip
echo ""

echo "=========================================="
echo "  Próximos Passos"
echo "=========================================="
echo ""
echo "1. Teste localmente: Abra index.html no navegador"
echo "2. Importe no Moodle: Use o arquivo curso-scorm.zip"
echo "3. Valide online: https://cloud.scorm.com/"
echo ""
echo "✨ Pronto para importação no LMS!"
echo ""
