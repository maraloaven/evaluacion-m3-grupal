# Sitio Web de la Clínica Clínica

Este es un proyecto de una página web para la Clínica Clínica, diseñado con HTML, CSS (Bootstrap) y JavaScript. El sitio web presenta información básica de la clínica, incluyendo una página de bienvenida, detalles sobre el equipo médico y una sección de contacto.

## Descripción del Proyecto

El sitio web incluye tres secciones principales:

1. **Página de Bienvenida:**  
   Presenta información general sobre la clínica, los servicios disponibles y testimonios de pacientes para generar confianza en los visitantes.

2. **Equipo Médico:**  
   Muestra los detalles del personal médico, como sus especialidades, experiencia y datos de contacto. También incluye una lista interactiva que se genera dinámicamente desde un archivo JSON.

3. **Página de Contacto:**  
   Ofrece un formulario para que los usuarios envíen mensajes y un mapa interactivo que muestra la ubicación de la clínica.

## Tecnologías Utilizadas

- HTML y CSS para la estructura y el diseño básico del sitio.
- JavaScript para implementar lógica interactiva y modelos de datos.
- JSON para almacenar y gestionar la información de los doctores.

## Programación Funcional

En el proyecto se aplicaron técnicas de programación funcional para realizar cálculos y operaciones de forma eficiente mediante JavaScript:

- Currying:
Se implementó para calcular el costo total de las consultas médicas. Primero se establece el precio por consulta, y luego se aplica ese precio a la cantidad de consultas necesarias.

- Funciones Flecha:
Se usaron para calcular el tiempo promedio de espera de los pacientes, sumando tiempos individuales y dividiendo entre el número de valores.

- Recursión:
Se utilizó para calcular el total de horas trabajadas por un doctor a lo largo de varios días, sumando las horas diarias de forma acumulativa hasta completar la semana.

- Composición de Funciones:
Se aplicaron descuentos al costo total de consultas, permitiendo manejar descuentos específicos según el volumen de servicios de forma clara y directa.

## Programación Orientada a Eventos y Asincronía

- Eventos en el Formulario de Contacto:
  Se añadieron interacciones con eventos que capturan el envío del formulario, mostrando alertas y notificando sobre el ingreso de nuevos pacientes mediante el uso del formulario.
  
- Asincronía con `async/await`:  
  Se simularon llamadas a una API para obtener datos de los doctores desde el archivo JSON.

- Manejo de Errores:
  Se gestionaron posibles fallos en las operaciones asincrónicas con try/catch

## Programación Orientada a Objetos

- Clase Doctor: 
  Se utilizó para modelar la información de los médicos, incorporando encapsulamiento para proteger los datos.

- Herencia y Subclases:
  Se implementó una subclase para médicos con especialid de cirujano, extendiendo las funcionalidades de la clase base.

- Polimorfismo:
  Sobrescribió un método de la subclase para adaptarlo a las necesidades de la especialidad del médico


### Estructura de los Archivos

La estructura del proyecto en general está organizada de la siguiente manera para promover la reutilización y facilitar el mantenimiento:

        /ClínicaClínica
        │
        ├── index.html                
        ├── equipo-medico.html         
        ├── contacto.html        
        ├── script.js         
        ├── doctores.json
        │
        ├── scss/
        │   ├── main.scss
        │   ├── main.css 
        │   ├── main.css.map
        │   ├── abstract
        │   │   └── _variables-mixins.scss
        │   ├── base
        │   │   └── _base.scss
        │   ├── components
        │   │   └── _navbar.scss
        │   ├── layout
        │   │   └── _header-footer.scss
        │   ├── pages
        │   │   └── _home.scss
        │   ├── themes
        │   │   └── _helpers.scss
        │   └── vendor
        │       └── __custom_bootstrap.scss
        │
        ├── img/                  
        │    ├── dr1.jpg
        │    ├── dr2.jpg
        │    ├── dr3.jpg
        │    ├── dr4.jpg 
        │    ├── logo.jpg      
        │    ├── pac1.jpg   
        │    ├── pac2.jpg    
        │    ├── pac3.jpg  
        │    ├── ser1.jpg 
        │    ├── ser2.jpg    
        │    └── ser3.jpg           
        │
        ├── .gitignore
        ├── package-lock.json
        ├── package.json
        └── README.md

## Instrucciones para Visualizar el Proyecto

### Requisitos Previos

- Tener **Node.js** y **npm** instalados en tu computadora.
- Tener **SASS** instalado globalmente. Si no lo tienes, puedes instalarlo ejecutando el siguiente comando:

        npm install -g sass

### Pasos para Ejecutar el Proyecto

1. Clona el repositorio en tu máquina local:

        git clone <URL del repositorio>
        cd <nombre del repositorio>
2. Instala las dependencias necesarias (si es que usas alguna para el proyecto):

        npm install
3. Compila los archivos SASS en CSS ejecutando el siguiente comando:

        sass scss/main.scss:scss/main.css
4. Abre el archivo `index.html` (o cualquier otro archivo HTML del proyecto) en tu navegador:
- Utiliza Live Server (si estás trabajando en VS Code) para ver la página en tu navegador
- Haz clic derecho sobre `index.html`.
- Selecciona "Open with Live Server" para iniciar la página en tu navegador.

## Autor

- Martín Avendaño