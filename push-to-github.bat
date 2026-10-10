@echo off
REM TRUSTORA - create GitHub repo + push (run AFTER: gh auth login)
REM Uses portable gh CLI downloaded to %TEMP%\ghcli if gh is not on PATH.
setlocal
cd /d "%~dp0"
where gh >nul 2>nul
if %ERRORLEVEL%==0 (
  set "GH=gh"
) else (
  set "GH=%TEMP%\ghcli\bin\gh.exe"
)
if not exist "%GH%" (
  echo [ERROR] GitHub CLI not found. Expected at %GH%
  echo Download from https://github.com/cli/cli/releases and add to PATH.
  exit /b 1
)
"%GH%" auth status
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ACTION NEEDED] You are not logged in. Run:
  echo   "%GH%" auth login
  echo Choose: GitHub.com ^> HTTPS ^> Yes ^> Login with a web browser.
  exit /b 1
)
echo Creating repo 'trustora' (public) and pushing branch 'main'...
"%GH%" repo create trustora --public --source=. --push --remote=origin
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [FALLBACK] If repo already exists on GitHub, run:
  echo   git remote add origin https://github.com/YOUR-USER/trustora.git
  echo   git branch -M main
  echo   git push -u origin main
  exit /b 1
)
echo.
echo DONE. Repo live. Now import it at vercel.com and render.com (see DEPLOY.md).
