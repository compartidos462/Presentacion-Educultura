#!/bin/sh
# Arma index.html del repositorio a partir del archivo fuente (el mismo del artefacto):
# usa fuentes y jsPDF locales y registra el service worker para que funcione sin internet.
SRC="$1"
python3 - "$SRC" <<'PY'
import sys,re,time
s=open(sys.argv[1],encoding='utf8').read()
s=s.replace('<link rel="preconnect" href="https://fonts.googleapis.com">\n','').replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n','')
s=re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com/css2[^"]*">','<link rel="stylesheet" href="vendor/fonts.css">',s)
s=s.replace('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','vendor/jspdf.umd.min.js')
assert 'googleapis' not in s and 'cdnjs' not in s
sw="<script>if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')) addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));</script>"
out='<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n</head>\n<body>\n'+s+'\n'+sw+'\n</body>\n</html>\n'
open('index.html','w',encoding='utf8').write(out)
sw_js=open('sw.js',encoding='utf8').read()
sw_js=re.sub(r"const V='[^']*';","const V='dc-%d';"%int(time.time()),sw_js)
open('sw.js','w',encoding='utf8').write(sw_js)
PY
