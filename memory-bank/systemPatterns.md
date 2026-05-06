# System Patterns: Arquitectura y Reglas Técnicas

## Arquitectura del Sistema
El proyecto sigue un patrón de arquitectura modular desacoplada, similar a un MVC (Modelo-Vista-Controlador) simplificado para web.

### 1. Componentes (`src/components.js`)
- **Regla de Oro**: Todas las funciones en este archivo deben ser **puras**.
- No pueden acceder a variables globales ni modificar el estado del sistema.
- Reciben datos por parámetros y devuelven **HTML Strings**.
- Responsabilidad: Representación visual.

### 2. Controlador/Lógica (`src/app.js`)
- Gestiona el estado de la aplicación (pregunta actual, puntuación).
- Interactúa con el DOM (selección de elementos, actualización del HTML).
- Orquesta el flujo del test (cargar JSON, pasar a la siguiente pregunta).

### 3. Modelo/Datos (`src/data.json`)
- Almacena el banco de preguntas en formato JSON estructurado.

## Patrones de Diseño
- **Inyección de Dependencias**: Los componentes reciben los datos que necesitan de forma explícita.
- **Single Page Application (SPA)**: La navegación entre el test y los resultados ocurre sin recargar la página.

## Estándares Técnicos
- **HTML5 Semántico**: Uso de `<nav>`, `<main>`, `<article>`, `<header>`.
- **Vanilla JS**: No se permiten frameworks externos (React, Angular, etc.) para cumplir con los objetivos educativos.
- **CSS3 Moderno**: Flexbox/Grid para layouts, variables CSS para temas, y animaciones para transiciones suaves.
