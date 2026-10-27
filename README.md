# Presentación Educultura · DataCocha

Presentación interactiva de la propuesta para Educultura.

- `index.html`: la presentación completa (un solo archivo). Se abre directo en el navegador o se publica con GitHub Pages.
- `material/Competidores_Educultura.xlsx`: base de competidores y hoja para la prueba de tiempo de respuesta.
- `material/ejemplo-propuesta.pdf`: ejemplo del PDF que genera la presentación (datos de prueba).

## Publicar con nombre propio (Netlify)
1. netlify.com → Add new site → Import from Git → este repositorio → Deploy.
2. Site configuration → Change site name → por ejemplo `datacocha-educultura` (queda en datacocha-educultura.netlify.app).

Cada cambio que se sube a `main` se publica solo.

## Datos compartidos
Lo que se edita en la presentación (respuestas, módulos, precios, textos) se guarda en Supabase, proyecto "fractal", tabla `presentaciones`, fila `dc-educultura`. Todos los que abren el link ven lo mismo; para ver cambios de otro socio basta con volver a la pestaña o recargar.
