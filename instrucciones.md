# Guía de Inicio: Proyecto Web Modular con IA

En este proyecto vamos a trabajar con un enfoque Spec-Driven (guiado por especificaciones). 
No vamos a "picar código" sin más; vamos a definir cómo queremos que sea nuestro sistema y usaremos la IA como nuestra herramienta de precisión.

## 1. Preparación del Entorno 📂
Lo primero es crear la estructura de carpetas que permitirá a los agentes de IA entender nuestro proyecto. Abre tu terminal y ejecuta:

mkdir proyectoNuevo1 (Crea la carpeta del proyecto)
cd proyectoNuevo1 (Entra en ella)
mkdir .antigravity src specs (Crea las carpetas de configuración, código y especificaciones)


## 2. Configuración de Reglas (El "Contrato") 📜
Crea el archivo .antigravity/rules.md. Este archivo le dice a la IA cómo debe escribir el código. Copia y pega esto:

Reglas de Desarrollo:

Arquitectura: Patrón MVC estricto.
Modularidad: Todo el código en funciones puras (sin variables globales).
Comunicación: Las funciones reciben datos por parámetros y devuelven HTML Strings.
Control: El archivo app.js gestiona el DOM; components.js solo genera HTML.


## 3. Definición de la Especificación 📝
Crea el archivo specs/inicial.md. Aquí definimos qué queremos construir:

Spec v1.0:

Componentes: Crear createNavbar(title) y createContent(text).
Lógica: Un archivo app.js con una función main() que importe los componentes y los renderice en un index.html.


## 4. Ejecución con IA (Antigravity/Gemini) 🤖
Ahora, utiliza el prompt de prompt1.txt en tu herramienta de IA para generar el primer componente:

Si la IA te pregunta proceder con la creación de los otros archivos mencionados en las especificaciones (app.js o index.html), responde que sí 
Si no te lo pide, crea un prompt propio utilizando prompt2.txt como referencia.


## 5. Puesta en marcha
Utiliza LveServer o algúna extensión de VSCode (tipo view-in-browser)para
abrir el archivo index.html y verificar que el código funciona correctamente.




ENLACES de interés:

https://medium.com/google-cloud/tutorial-getting-started-with-antigravity-skills-864041811e0d

https://antigravity.codes/rules/web-development

