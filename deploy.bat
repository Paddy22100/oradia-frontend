@echo off
echo ==================================================
echo 🔄 Déploiement Oradia en cours...
echo ==================================================

REM 📂 Aller dans le projet
cd /d %~dp0

REM 📌 Vérifie que Git est initialisé
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ❌ Ce dossier n'est pas un dépôt Git. Abandon...
    pause
    exit /b
)

REM 📌 Bascule sur main si nécessaire
for /f %%b in ('git branch --show-current') do set currentBranch=%%b
if NOT "%%currentBranch%%"=="main" (
    echo 🔄 Passage sur la branche main...
    git checkout main
)

REM ✅ Ajoute et commit
git add -A
git commit -m "🔄 Déploiement Oradia auto" || echo ⚠️ Aucun changement à commit

REM 🚀 Push vers GitHub
git push origin main || (
    echo ❌ Échec du push !
    pause
    exit /b
)

REM ♻️ Déclenche rebuild Vercel
git commit --allow-empty -m "♻️ Rebuild Vercel"
git push origin main

echo ✅ Déploiement terminé. Vérifie sur https://oradia.fr/test
pause
