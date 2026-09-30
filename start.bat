@echo off
title AllTools TJKT - Server Lokal
cd /d "%~dp0"

echo ========================================================
echo                AllTools TJKT - Server Lokal
echo ========================================================
echo.

echo [1/3] Memeriksa runtime Python...
set "PY_CMD="
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "PY_CMD=python"
) else (
    where py >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        set "PY_CMD=py"
    )
)

if "%PY_CMD%"=="" (
    echo.
    echo [ERROR] Python tidak ditemukan di komputer ini!
    echo Silakan instal Python dan centang opsi 'Add Python to PATH'.
    echo Browser TIDAK dibuka karena server tidak dapat dijalankan.
    echo.
    pause
    exit /b 1
)

echo [2/3] Mempersiapkan verifikasi kesiapan server port 8000...
start "" /b powershell -NoProfile -Command "for ($i=0; $i -lt 20; $i++) { Start-Sleep -Milliseconds 250; try { $tcp = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 8000); if ($tcp.Connected) { $tcp.Close(); Start-Process 'http://localhost:8000'; break } } catch {} }"

echo [3/3] Menjalankan server HTTP lokal di port 8000...
echo.
echo --------------------------------------------------------
echo Server aktif di http://localhost:8000
echo Browser akan otomatis terbuka setelah server terverifikasi siap.
echo Untuk mematikan server, tekan Ctrl+C atau tutup jendela ini.
echo --------------------------------------------------------
echo.

%PY_CMD% -m http.server 8000
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Server berhenti dengan kode error: %ERRORLEVEL%.
    echo Pastikan port 8000 tidak sedang digunakan oleh aplikasi lain.
    echo.
    pause
)
