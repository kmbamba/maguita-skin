@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Integration Images Maguita Skin
echo ========================================
echo.

set SOURCE=C:\Users\hp\Pictures\Screenshots
set UPLOADS=C:\Users\hp\Documents\MAGUITA SKIN\backend\uploads
set PUBLIC=C:\Users\hp\Documents\MAGUITA SKIN\frontend\public

:: Creer les dossiers
if not exist "%UPLOADS%" mkdir "%UPLOADS%"
if not exist "%PUBLIC%" mkdir "%PUBLIC%"

echo Images disponibles dans Screenshots:
echo.
dir "%SOURCE%\*.png" "%SOURCE%\*.jpg" /B
echo.
echo ----------------------------------------
echo.

:: Logo
set /p LOGO="1. Nom du fichier LOGO: "
if not "%LOGO%"=="" (
    copy "%SOURCE%\%LOGO%" "%PUBLIC%\logo-maguita-skin.png" >nul 2>&1
    if errorlevel 1 (
        echo    [ERREUR] Fichier non trouve
    ) else (
        echo    [OK] Logo copie!
    )
)
echo.

:: Teint Noir 1
set /p TN1="2. Nom du fichier TEINT NOIR 1: "
if not "%TN1%"=="" (
    copy "%SOURCE%\%TN1%" "%UPLOADS%\gamme-teint-noir-1.jpg" >nul 2>&1
    if errorlevel 1 (
        echo    [ERREUR] Fichier non trouve
    ) else (
        echo    [OK] Teint Noir 1 copie!
    )
)
echo.

:: Teint Noir 2
set /p TN2="3. Nom du fichier TEINT NOIR 2: "
if not "%TN2%"=="" (
    copy "%SOURCE%\%TN2%" "%UPLOADS%\gamme-teint-noir-2.jpg" >nul 2>&1
    if errorlevel 1 (
        echo    [ERREUR] Fichier non trouve
    ) else (
        echo    [OK] Teint Noir 2 copie!
    )
)
echo.

:: Collagene
set /p COL="4. Nom du fichier COLLAGENE: "
if not "%COL%"=="" (
    copy "%SOURCE%\%COL%" "%UPLOADS%\gamme-collagene-1.jpg" >nul 2>&1
    if errorlevel 1 (
        echo    [ERREUR] Fichier non trouve
    ) else (
        echo    [OK] Collagene copie!
    )
)
echo.

:: Urgence
set /p URG="5. Nom du fichier URGENCE: "
if not "%URG%"=="" (
    copy "%SOURCE%\%URG%" "%UPLOADS%\gamme-urgence-1.jpg" >nul 2>&1
    if errorlevel 1 (
        echo    [ERREUR] Fichier non trouve
    ) else (
        echo    [OK] Urgence copie!
    )
)
echo.

echo ========================================
echo   Copie terminee!
echo ========================================
echo.
echo Prochaine etape:
echo   cd backend
echo   node scripts\updateImages.js
echo.
pause
