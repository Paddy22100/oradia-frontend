Write-Host '🚀 Déploiement Oradia en cours...' -ForegroundColor Cyan
Set-Location "C:\Users\bouch\Desktop\SiteOradia\frontend"
npx vercel --prod
Write-Host '🎉 ✅ Déploiement terminé. Vérifie sur https://oradia.fr' -ForegroundColor Green
pause
