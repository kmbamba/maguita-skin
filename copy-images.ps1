# Script d'Intégration des Images Maguita Skin
# Exécuter avec : .\copy-images.ps1

Write-Host "🎨 Copie des Images Maguita Skin..." -ForegroundColor Cyan
Write-Host ""

$sourceDir = "C:\Users\hp\Pictures\Screenshots"
$uploadsDir = "C:\Users\hp\Documents\MAGUITA SKIN\backend\uploads"
$publicDir = "C:\Users\hp\Documents\MAGUITA SKIN\frontend\public"

# Créer les dossiers s'ils n'existent pas
New-Item -ItemType Directory -Force -Path $uploadsDir | Out-Null
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null

# Lister les fichiers disponibles
Write-Host "📁 Fichiers trouvés dans Screenshots:" -ForegroundColor Yellow
Get-ChildItem -Path $sourceDir -Filter "*.png","*.jpg" | ForEach-Object { Write-Host "   - $($_.Name)" }
Write-Host ""

# Instructions interactives
Write-Host "📸 Veuillez identifier vos images:" -ForegroundColor Green
Write-Host ""

# Logo
Write-Host "1️⃣  LOGO MAGUITA SKIN" -ForegroundColor Magenta
$logoFile = Read-Host "   Nom du fichier logo (ex: Screenshot 2024-01-15 095832.png)"
if ($logoFile) {
    $sourcePath = Join-Path $sourceDir $logoFile
    $destPath = Join-Path $publicDir "logo-maguita-skin.png"
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Logo copié!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fichier non trouvé" -ForegroundColor Red
    }
}
Write-Host ""

# Gamme Teint Noir 1
Write-Host "2️⃣  GAMME TEINT NOIR (Photo 1 - Modèle seule)" -ForegroundColor Magenta
$teintnoir1 = Read-Host "   Nom du fichier"
if ($teintnoir1) {
    $sourcePath = Join-Path $sourceDir $teintnoir1
    $destPath = Join-Path $uploadsDir "gamme-teint-noir-1.jpg"
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Teint Noir 1 copié!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fichier non trouvé" -ForegroundColor Red
    }
}
Write-Host ""

# Gamme Teint Noir 2
Write-Host "3️⃣  GAMME TEINT NOIR (Photo 2 - Deux modèles)" -ForegroundColor Magenta
$teintnoir2 = Read-Host "   Nom du fichier"
if ($teintnoir2) {
    $sourcePath = Join-Path $sourceDir $teintnoir2
    $destPath = Join-Path $uploadsDir "gamme-teint-noir-2.jpg"
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Teint Noir 2 copié!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fichier non trouvé" -ForegroundColor Red
    }
}
Write-Host ""

# Gamme Collagène
Write-Host "4️⃣  GAMME COLLAGÈNE (Produits roses)" -ForegroundColor Magenta
$collagene = Read-Host "   Nom du fichier"
if ($collagene) {
    $sourcePath = Join-Path $sourceDir $collagene
    $destPath = Join-Path $uploadsDir "gamme-collagene-1.jpg"
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Collagène copié!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fichier non trouvé" -ForegroundColor Red
    }
}
Write-Host ""

# Gamme Urgence
Write-Host "5️⃣  GAMME URGENCE (Produits orange)" -ForegroundColor Magenta
$urgence = Read-Host "   Nom du fichier"
if ($urgence) {
    $sourcePath = Join-Path $sourceDir $urgence
    $destPath = Join-Path $uploadsDir "gamme-urgence-1.jpg"
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "   ✅ Urgence copié!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Fichier non trouvé" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "🎉 Copie terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaine étape: Mettre à jour la base de données" -ForegroundColor Yellow
Write-Host "   Exécuter: cd backend" -ForegroundColor Cyan
Write-Host "   Puis: node scripts/updateImages.js" -ForegroundColor Cyan
