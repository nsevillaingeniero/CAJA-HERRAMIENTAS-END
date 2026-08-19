# Caja de Herramientas END — línea gráfica institucional en Lovable

## Punto de partida

El repositorio `nsevillaingeniero/caja-de-herramientas-END` es un sitio **Astro** con:

- Páginas: inicio, `recursos` (+ categoría y detalle), `end-digital` (+ categoría y detalle), `para-docentes` (+ detalle), `capacitacion`, `necesito/[slug]`, `buscar`, 404.
- Contenido en JSON/Markdown: 9 recursos, 5 capacitaciones, 6 tutoriales, categorías, facultades, intenciones, enlaces institucionales.
- Sistema visual propio en `src/styles/global.css`: azul `#0877C9`, cian `#45C7C8`, naranja `#F28C52`, tipografías Montserrat + Work Sans, sombras y utilidades (glass, orbes, reveal).

Este proyecto de Lovable usa TanStack Start + React + Tailwind v4, no Astro. Portarlo aquí implica reescribir las páginas y componentes en React manteniendo el contenido tal cual.

## Qué voy a hacer

### 1. Portar el sitio a este proyecto

- Copiar el contenido (recursos, capacitaciones, tutoriales, categorías, facultades, intenciones, enlaces) como módulos de datos tipados.
- Recrear las rutas equivalentes en `src/routes/`: `/` (inicio), `/recursos`, `/recursos/categoria/$slug`, `/recursos/$slug`, `/end-digital` y sus subrutas, `/para-docentes` y detalle, `/capacitacion`, `/necesito/$slug`, `/buscar`, 404.
- Recrear los componentes: Header, Footer, Brand, Hero, tarjetas de recurso/capacitación/tutorial, explorador con filtros, buscador y diálogo de búsqueda.
- Imágenes institucionales (logo, sede, piscina, laboratorio, estudiantes) se traen del repositorio y se publican como assets del proyecto.

### 2. Aplicar la línea gráfica de la IUEND (solo identidad visual)

Tomando como referencia el portal `endeporte.edu.co`:

- **Color**: azul institucional profundo como color de marca y de barra de navegación; azul medio para enlaces y titulares; amarillo y rojo institucionales como acentos puntuales (botón principal, subrayados, badges). Se retiran cian y naranja como colores de área y se sustituyen por la paleta institucional.
- **Barra superior**: franja delgada oscura tipo institucional sobre el encabezado blanco con logo END, buscador a la derecha y navegación en banda azul oscura debajo.
- **Tipografía**: familia sans institucional (Montserrat para titulares, Work Sans para texto), titulares en azul profundo, misma escala tipográfica actual.
- **Tarjetas y botones**: bordes suaves, borde superior de color por sección, botón principal en rojo institucional con esquinas redondeadas y botón secundario en azul contorneado.
- **Pie de página**: bloque claro con datos de contacto, redes y enlaces legales al estilo del portal, más franja inferior oscura con la marca.
- Se conservan la estructura, el contenido y las secciones existentes; solo cambian color, tipografía, encabezado, pie y estilos de componentes.

## Detalles técnicos

- Tokens en `src/styles.css` (Tailwind v4 `@theme` / `@theme inline`) en formato `oklch`, reemplazando la paleta genérica del template.
- Fuentes cargadas con `<link>` en `src/routes/__root.tsx` (no `@import` remoto en CSS).
- Datos estáticos en `src/data/*.ts`; sin backend, todo se renderiza en build/SSR.
- Búsqueda del lado del cliente sobre el índice generado de los datos.
- `head()` propio por ruta con título y descripción específicos.
- Los cambios quedan en este proyecto de Lovable; el repositorio de GitHub no se modifica salvo que lo pidas después.

## Fuera de alcance

- Cambios de estructura de navegación o de contenido del portal.
- Reescritura de textos, nuevas secciones o funcionalidades.
