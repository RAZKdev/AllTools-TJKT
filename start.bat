@echo off
title AllTools TJKT - Server Lokal
cd /d "%~dp0"

echo ========================================================
echo                AllTools TJKT - Server Lokal
echo ========================================================
echo.
echo [1/2] Membuka browser ke http://localhost:8000 ...
start "" "http://localhost:8000"

echo [2/2] Menjalankan server HTTP lokal di port 8000...
echo.
echo --------------------------------------------------------
echo Server aktif! Biarkan jendela ini tetap terbuka.
echo Untuk mematikan server, tekan Ctrl+C atau tutup jendela ini.
echo --------------------------------------------------------
echo.

python -m http.server 8000
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Perintah 'python' tidak ditemukan, mencoba menggunakan launcher 'py'...
    py -m http.server 8000
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Python tidak terdeteksi di komputer ini.
        echo Pastikan Python sudah terinstal dan dicentang 'Add Python to PATH'.
        echo.
        pause
    )
)
