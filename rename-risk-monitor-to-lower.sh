#!/bin/bash

DIR="public/images/risk-monitor"

if [ ! -d "$DIR" ]; then
  echo "❌ La carpeta $DIR no existe"
  exit 1
fi

echo "🔄 Renombrando archivos de $DIR a minúsculas…"

cd "$DIR"

for file in *; do
  lower=$(echo "$file" | tr '[:upper:]' '[:lower:]')
  if [ "$file" != "$lower" ]; then
    git mv "$file" "$lower"
    echo "✅ $file → $lower"
  fi
done

cd -

echo -e "\n✅ Todos los archivos han sido renombrados a minúsculas."
echo "👉 Ahora ejecuta:"
echo "   git add -A && git commit -m \"fix: unify casing in risk-monitor images\" && git push"
