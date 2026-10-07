#!/bin/bash

cd /home/marcos/Projetos/gh-pages/

LISTA="paineis.txt"

if [ ! -f "$LISTA" ]; then
    echo "❌ Erro: O arquivo $LISTA não foi encontrado!"
    exit 1
fi

while IFS=":" read -r pasta url || [ -n "$pasta" ]; do
    [[ -z "$pasta" || "$pasta" =~ ^# ]] && continue

    echo "--------------------------------------------------"
    echo "📂 Processando painel: [$pasta]"
    echo "🔗 URL: http://$url"
    echo "--------------------------------------------------"

    mkdir -p "$pasta"
    cd "$pasta" || exit

    rm -rf *

    wget -E -k -K -p -H -nH --cut-dirs=10 --base="http://$url" "http://$url"

    ARQUIVO_BAIXADO=$(find . -maxdepth 1 -type f -name "*.html" ! -name "index.html" | head -n 1)
    
    if [ -n "$ARQUIVO_BAIXADO" ]; then
        mv "$ARQUIVO_BAIXADO" index.html
        echo "✅ Arquivo principal renomeado para index.html"
    else
        if [ ! -f "index.html" ]; then
            echo "⚠️ Aviso: Nenhum arquivo HTML foi encontrado para renomear em $pasta"
        fi
    fi

    cd ..

done < "$LISTA"

echo "--------------------------------------------------"
echo "🚀 Sincronizando alterações com o GitHub..."
echo "--------------------------------------------------"

git add .

if ! git diff-index --quiet HEAD --; then
    git commit -m "auto: atualização automática dos painéis de controle"
    git push origin main
    echo "🎉 Sucesso! Todos os painéis foram atualizados no GitHub Pages."
else
    echo "😎 Nenhum painel sofreu alterações. Repositório já estava atualizado."
fi

