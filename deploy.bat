@echo off
echo 🔄 Déploiement Oradia en cours...

REM 📂 Vérifie si on est dans un dépôt Git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ❌ Ce dossier n'est pas un dépôt Git. Abandon...
    pause
    exit /b
)

REM 📌 Récupère la branche courante
for /f %%b in ('git branch --show-current') do set currentBranch=%%b
echo 📌 Branche courante : %currentBranch%

REM 🚨 Si pas sur main, on bascule et merge
if NOT "%currentBranch%"=="main" (
    echo 🔄 Changement vers la branche main...
    git checkout main
    git merge %currentBranch%
)

REM ✅ Vérifie que le fichier page.jsx de test existe bien
if exist "app\test\page.jsx" (
    echo ✅ Fichier app\test\page.jsx détecté.
) else (
    echo ❌ ATTENTION : Le fichier app\test\page.jsx est manquant !
    echo 🔥 Le build Vercel ne verra pas la page /test.
    pause
    exit /b
)

REM ✅ Vérifie que le fichier layout.jsx existe bien (sinon le créer)
if not exist "app\test\layout.jsx" (
    echo 📝 Création d'un layout minimal pour app\test...
    echo export default function TestLayout({ children }) { return <>%children%</>; } > app\test\layout.jsx
)

REM 🧹 Supprime le dossier .next pour rebuild propre
if exist ".next" (
    echo 🧹 Suppression du cache .next...
    rmdir /s /q ".next"
)

REM ✅ Ajoute tous les fichiers (y compris supprimés et non trackés)
git add -A

REM 📝 Commit si besoin
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo ⚠️ Aucun changement détecté à committer.
) else (
    echo 📝 Commit des changements...
    git commit -m "🔄 Déploiement Oradia auto (avec layout test)"
)

REM 🌱 Vérifie si l’upstream est configuré
git rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
if errorlevel 1 (
    echo 🌱 Aucun upstream configuré. Création de l’upstream...
    git push -u origin main
) else (
    REM 🚀 Push sur la branche distante
    echo 🚀 Push des modifications sur GitHub...
    git push origin main
)

REM ♻️ Déclenche un rebuild Vercel même sans changement
echo ♻️ Déclenche un rebuild Vercel (commit vide)...
git commit --allow-empty -m "♻️ Rebuild Vercel sans cache"
git push origin main

echo ✅ Déploiement terminé. Vérifie sur https://oradia.fr/test
pause
