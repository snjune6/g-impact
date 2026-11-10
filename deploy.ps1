$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlPath = Join-Path $root "public\index.html"
$version = Get-Date -Format "yyyyMMddHHmmss"

$html = Get-Content -Path $htmlPath -Raw -Encoding UTF8
$html = [regex]::Replace($html, 'styles\.css(\?v=[^"\s]*)?', "styles.css?v=$version")
$html = [regex]::Replace($html, 'app\.js(\?v=[^"\s]*)?', "app.js?v=$version")
$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($htmlPath, $html, $utf8)

Write-Host "Asset version -> $version"
Set-Location $root
firebase deploy --only hosting
