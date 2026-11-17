/* Configuración de la API */
const API_URL = "https://api-colombia.com/api/v1";

const IMAGEN_RESPALDO = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260">' +
  '<rect width="400" height="260" fill="#DDE3DE"/>' +
  '<rect y="190" width="400" height="35" fill="#F2B705"/>' +
  '<rect y="225" width="400" height="17" fill="#1E4E8C"/>' +
  '<rect y="242" width="400" height="18" fill="#C23B2E"/>' +
  '<text x="200" y="115" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#55645B">Imagen no disponible</text>' +
  '</svg>'
);

const REGIONES_CONOCIDAS = ["andina", "caribe", "pacifica", "orinoquia", "amazonia", "insular"];

/* Petición a la API */
async function obtenerDatos(ruta) {
  const respuesta = await fetch(`${API_URL}/${ruta}`);
  if (!respuesta.ok) {
    throw new Error(`La API respondió con el código ${respuesta.status}`);
  }
  return respuesta.json();
}

/* Construcción de elementos */
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.className = clase;
  }
  if (texto !== undefined) {
    elemento.textContent = texto;
  }
  return elemento;
}

function agregarDato(lista, etiqueta, valor) {
  const grupo = document.createElement("div");
  grupo.append(crearElemento("dt", null, etiqueta), crearElemento("dd", null, valor));
  lista.append(grupo);
}

function crearImagen(url, descripcion) {
  const imagen = document.createElement("img");
  imagen.alt = descripcion;
  imagen.loading = "lazy";
  imagen.src = url || IMAGEN_RESPALDO;
  imagen.addEventListener("error", () => {
    imagen.src = IMAGEN_RESPALDO;
  }, { once: true });
  return imagen;
}

/* Formato de datos */
function formatearNumero(valor) {
  return typeof valor === "number" ? valor.toLocaleString("es-CO") : "No disponible";
}

function limpiarTexto(texto) {
  return texto && texto.trim() ? texto.trim() : "Sin descripción disponible.";
}

function claveRegion(nombre) {
  const normalizado = (nombre || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return REGIONES_CONOCIDAS.find((clave) => normalizado.includes(clave)) || "otra";
}

/* Estados de carga y error */
function mostrarCarga(contenedor, mensaje) {
  contenedor.setAttribute("aria-busy", "true");
  contenedor.replaceChildren(crearElemento("p", "estado estado-carga", mensaje));
}

function terminarCarga(contenedor) {
  contenedor.setAttribute("aria-busy", "false");
}

function mostrarError(contenedor, mensaje) {
  contenedor.setAttribute("aria-busy", "false");
  const aviso = crearElemento("p", "estado estado-error", mensaje);
  aviso.setAttribute("role", "alert");
  contenedor.replaceChildren(aviso);
}
