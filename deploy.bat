@echo off
echo 🔄 Déploiement Oradia en cours...

REM Vérifier si on est dans un dépôt Git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ❌ Ce dossier n'est pas un dépôt Git. Abandon...
    pause
    exit /b
)

REM Vérifie si la branche "main" existe
git branch --show-current >nul 2>&1
if errorlevel 1 (
    echo ❌ Aucune branche Git active. Abandon...
    pause
    exit /b
)

REM Ajoute tous les fichiers, même supprimés et non trackés
git add -A

REM Vérifie s’il y a des changements à commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo ⚠️ Aucun changement détecté à déployer.
) else (
    REM Commit les changements
    git commit -m "🔄 Déploiement Oradia auto"
)

REM Vérifie si l’upstream est configuré
git rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
if errorlevel 1 (
    echo 🌱 Aucun upstream configuré. Création de l’upstream...
    git push -u origin main
) else (
    REM Push sur la branche distante
    git push origin main
)

echo ✅ Déploiement terminé. Vérifie sur GitHub et Vercel.
pause
