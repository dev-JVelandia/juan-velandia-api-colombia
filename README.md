# Mini Portal de Colombia

## Descripción
Sitio web informativo sobre Colombia que consume la API pública [api-colombia.com](https://api-colombia.com/) con `fetch` y construye el contenido dinámicamente en el DOM. Tiene una página de inicio y dos secciones:

- **Explorador de departamentos** (`/api/v1/Department`): nombre, región, población, superficie y descripción de cada departamento. Extra: conteo de departamentos por región.
- **Sabores de Colombia** (`/api/v1/TypicalDish`): nombre, descripción, departamento e imagen de cada plato típico. Extra: conteo total de platos.

Las páginas se conectan con hipervínculos. Mientras llegan los datos se muestra un mensaje de carga, y si la petición falla se muestra un mensaje de error. Si una imagen de la API no carga, se reemplaza por una imagen de respaldo.

## Tecnologías usadas
- HTML5
- CSS3 (Grid, Flexbox y variables CSS)
- JavaScript (fetch, async/await y manipulación del DOM)
- API pública de Colombia

## Estructura
```
juan-velandia-api-colombia/
├── index.html
├── departamentos.html
├── platos.html
├── css/
│   └── styles.css
├── js/
│   ├── comun.js
│   ├── departamentos.js
│   └── platos.js
└── README.md
```

## Instrucciones de uso
1. Clona el repositorio o descárgalo como ZIP.
2. Abre `index.html` en el navegador (o usa la extensión Live Server de VS Code).
3. Necesitas conexión a internet para que la API responda.
4. Usa el menú superior para moverte entre Inicio, Departamentos y Platos típicos.

## Capturas
_Agrega aquí capturas de pantalla de cada página (opcional)._

## Estudiante
Juan Diego Velandia Guerrero
