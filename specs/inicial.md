# Objetivo: Crear una Single Page Application (SPA) minimalista con componentes funcionales.

## 1. Estructura de Archivos:

- src/index.html: Contenedor base.
- src/app.js: Punto de entrada (Controlador).
- src/components.js: Definición de las funciones de la Vista.


## 2. Requisitos de Código (Reglas de Oro):

- Modularidad: Cada componente es una función pura que devuelve un String de HTML.
- Sin Estado Global: Los datos pasan por parámetros.
- Punto de entrada: Una función main() en app.js que orqueste el renderizado.


## 3. Funciones a implementar en components.js:

- createNavbar(title): Devuelve un <nav> con el título recibido.
- createContent(text): Devuelve un <div> con el texto recibido.