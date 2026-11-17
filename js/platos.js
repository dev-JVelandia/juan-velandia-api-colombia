/* Referencias al DOM */
const contenedor = document.getElementById("lista-platos");
const total = document.getElementById("total");

/* Tarjeta de plato */
function crearTarjeta(plato, nombreDepartamento) {
  const tarjeta = crearElemento("article", "tarjeta tarjeta-plato");

  const figura = crearElemento("div", "tarjeta-imagen");
  figura.append(crearImagen(plato.imageUrl || plato.image, `Foto de ${plato.name}`));

  const cuerpo = crearElemento("div", "tarjeta-cuerpo");
  cuerpo.append(
    crearElemento("h2", "tarjeta-titulo", plato.name),
    crearElemento("p", "etiqueta-departamento", nombreDepartamento),
    crearElemento("p", "tarjeta-texto", limpiarTexto(plato.description))
  );

  tarjeta.append(figura, cuerpo);
  return tarjeta;
}

/* Carga de datos */
async function iniciar() {
  mostrarCarga(contenedor, "Cargando platos típicos…");

  try {
    const [platos, departamentos] = await Promise.all([
      obtenerDatos("TypicalDish"),
      obtenerDatos("Department").catch(() => [])
    ]);

    const nombresDepartamento = new Map(departamentos.map((departamento) => [departamento.id, departamento.name]));
    const obtenerDepartamento = (plato) =>
      (plato.department && plato.department.name) ||
      nombresDepartamento.get(plato.departmentId) ||
      "Colombia";

    const ordenados = [...platos].sort((a, b) => a.name.localeCompare(b.name, "es"));

    const fragmento = document.createDocumentFragment();
    ordenados.forEach((plato) => {
      fragmento.append(crearTarjeta(plato, obtenerDepartamento(plato)));
    });

    contenedor.replaceChildren(fragmento);
    terminarCarga(contenedor);
    total.textContent = `${ordenados.length} platos típicos`;
  } catch (error) {
    mostrarError(contenedor, "No se pudieron cargar los platos. Revisa tu conexión y recarga la página.");
    console.error(error);
  }
}

iniciar();
