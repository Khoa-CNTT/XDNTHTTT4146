# safe-push.ps1
Write-Host "🚨 Đang chuẩn bị push code an toàn..."

# Backup .env files
if (Test-Path "toeic-be/.env") {
    Copy-Item "toeic-be/.env" "toeic-be/.env.local" -Force
    Remove-Item "toeic-be/.env"
}
if (Test-Path "toeic-fe/.env") {
    Copy-Item "toeic-fe/.env" "toeic-fe/.env.local" -Force
    Remove-Item "toeic-fe/.env"
}

# Git add, commit, push
git add .
$commitMessage = Read-Host "Nhập commit message"
git commit -m $commitMessage
git push origin main

# Restore lại .env
if (Test-Path "toeic-be/.env.local") {
    Move-Item "toeic-be/.env.local" "toeic-be/.env" -Force
}
if (Test-Path "toeic-fe/.env.local") {
    Move-Item "toeic-fe/.env.local" "toeic-fe/.env" -Force
}

Write-Host "✅ Đã push xong! File .env đã được khôi phục."
