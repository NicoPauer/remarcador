// Logica de la aplicacion, crea lista de productos y el archivo a descargar

// diccionario nombre de producto a lista con datos del producto(unidades, precio unitario, fecha de consulta) 
var inventario = {};
// funciones

function obtenerDato(mensaje)
{

  // Obtiene dato del usuario y crea fila de tabla del inventario
  // Obtener y devolver el dato
  // Lo dejo así porque como no separe bien el contenido de la interfaz me cuesta actualizar la tabla de inventario
    let dato = prompt(mensaje);
    return dato;   
}

function mostrarDatos(analizado, datosCorrespondientes)
{
    // Segun el nombre de lo analizado muestra los respectivos datos, recibe una cadena y una lista de cadenas de texto
    let separador = ")  (";
    let contenido = (analizado + separador + datosCorrespondientes.toString().replace(/,/gi, separador));
    let contenedor = document.querySelector("#inventario > p");
    // Agrego contenido a pantalla
    contenedor.innerHTML += ("<label class = 'flatbox' style = 'font-weight: 999; font-size: 1em; color: #ffffff; background-color: #000000;'>(" + contenido + ")</label><br />");
    // Libero memoria
    delete contenido;
    delete separador;
    delete contenedor;
}

function agregarProducto(presupuesto)
{
  // Solicita al usuario un nombre, una cantidad y autocompleta los datos restantes
  presupuesto = presupuesto.toFixed(2);
  let producto = obtenerDato('NOMBRE DEL PRODUCTO');
  let divisa = document.querySelector("#nombre-divisa");
  let cantidad = parseInt(obtenerDato('UNIDADES'));
  // Actualizo el inventario
  inventario[producto] = [cantidad.toString(),  ((presupuesto / cantidad).toFixed(2).toString() + " " + divisa.value.toUpperCase()), (new Date()).toString()];
  // Lo muestro en la pagina
  mostrarDatos(producto, inventario[producto]);
  // libero memoria que ya no necesito
  delete producto;
  delete divisa;
  delete cantidad;
}

function crearArchivo(nombre, contenido)
{
  // Crea un archivo de texto plano con un nombre y un contenido para escribir
  console.log("\n\tGenerando archivo: \n\t\t'" + nombre + "'\n\tContenido: \n\t\t'" + contenido + "'");
  // Hago que el navegador escriba el archivo
  document.body.innerHTML += "<section><nav><a download = '" + nombre + "' href = 'data:application/octet-stream, " + encodeURIComponent(contenido) + "'>Descargar informe '" + nombre.toUpperCase() + "'</a></nav></section><br />";
}

function descargarInforme()
{
  // Descarga un informe a un archivo '.csv'
  
  let fecha = new Date();
  
  fecha = (fecha.getUTCDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + "_" + fecha.getHours() + "-" + fecha.getMinutes());
    
  let nombre = ("inventario_al_" + fecha + ".csv");
  // DESCARGA DEL ARCHIVO
  let contenido = "";
    
  for (let producto in inventario)
  {
    // Guardo el contenido
    contenido += (producto + ", " + inventario[producto].toString().replace(/,/gi, ", ") + "\n");
  }

  crearArchivo(nombre, 'Producto, Unidades, Precio Por Unidad, Fecha\n' + contenido); 
            
  // Libero memoria de mas
  delete nombre;
  delete contenido;
  delete fecha;
}
