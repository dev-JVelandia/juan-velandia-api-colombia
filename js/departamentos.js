/* Referencias al DOM */
const contenedor = document.getElementById("lista-departamentos");
const seccionResumen = document.getElementById("resumen");
const listaRegiones = document.getElementById("lista-regiones");
const total = document.getElementById("total");

/* Tarjeta de departamento */
function crearTarjeta(departamento, nombreRegion) {
  const tarjeta = crearElemento("article", "tarjeta");
  tarjeta.dataset.region = claveRegion(nombreRegion);

  const titulo = crearElemento("h2", "tarjeta-titulo", departamento.name);
  const region = crearElemento("p", "etiqueta-region", nombreRegion);

  const datos = crearElemento("dl", "datos");
  agregarDato(datos, "Población", formatearNumero(departamento.population));
  agregarDato(
    datos,
    "Superficie",
    typeof departamento.surface === "number" ? `${formatearNumero(departamento.surface)} km²` : "No disponible"
  );

  const descripcion = crearElemento("p", "tarjeta-texto", limpiarTexto(departamento.description));

  tarjeta.append(titulo, region, datos, descripcion);
  return tarjeta;
}

/* Conteo por región */
function contarPorRegion(departamentos, obtenerRegion) {
  const conteos = new Map();
  departamentos.forEach((departamento) => {
    const nombre = obtenerRegion(departamento);
    conteos.set(nombre, (conteos.get(nombre) || 0) + 1);
  });
  return new Map([...conteos.entries()].sort((a, b) => b[1] - a[1]));
}

function dibujarResumen(conteos) {
  const maximo = Math.max(...conteos.values());
  const fragmento = document.createDocumentFragment();

  conteos.forEach((cantidad, nombre) => {
    const fila = crearElemento("li", "fila-region");
    fila.dataset.region = claveRegion(nombre);

    const barra = crearElemento("span", "fila-barra");
    barra.style.setProperty("--ancho", `${(cantidad / maximo) * 100}%`);

    fila.append(
      crearElemento("span", "fila-nombre", nombre),
      barra,
      crearElemento("span", "fila-valor", String(cantidad))
    );
    fragmento.append(fila);
  });

  listaRegiones.replaceChildren(fragmento);
  seccionResumen.hidden = false;
}

/* Carga de datos */
async function iniciar() {
  mostrarCarga(contenedor, "Cargando departamentos…");

  try {
    const [departamentos, regiones] = await Promise.all([
      obtenerDatos("Department"),
      obtenerDatos("Region").catch(() => [])
    ]);

    const nombresRegion = new Map(regiones.map((region) => [region.id, region.name]));
    const obtenerRegion = (departamento) =>
      (departamento.region && departamento.region.name) ||
      nombresRegion.get(departamento.regionId) ||
      "Sin región";

    const ordenados = [...departamentos].sort((a, b) => a.name.localeCompare(b.name, "es"));

    const fragmento = document.createDocumentFragment();
    ordenados.forEach((departamento) => {
      fragmento.append(crearTarjeta(departamento, obtenerRegion(departamento)));
    });

    contenedor.replaceChildren(fragmento);
    terminarCarga(contenedor);
    total.textContent = `${ordenados.length} departamentos`;
    dibujarResumen(contarPorRegion(ordenados, obtenerRegion));
  } catch (error) {
    mostrarError(contenedor, "No se pudieron cargar los departamentos. Revisa tu conexión y recarga la página.");
    console.error(error);
  }
}

iniciar();
