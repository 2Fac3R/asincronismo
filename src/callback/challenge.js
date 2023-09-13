// importamos el modulo para hacer las peticiones
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// direccion de la API
const API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api, callback) {
  // instanciamos la conexion
  let xhttp = new XMLHttpRequest();
  // abrir una conexion con el metodo, la ruta y si es asincrono
  xhttp.open('GET', url_api, true);
  // validacion del llamado
  xhttp.onreadystatechange = (event) => {
    // el state 4 es el ultimo de la peticion (done), indica que se ha completado
    if (xhttp.readyState === xhttp.DONE) {
      // verificamos que el status sea 200 -> Ok
      if (xhttp.status === 200) {
        // el primer valor es el err, y el siguiente el resultado
        // ejecutamos el callback con el resultado
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        // si no es 200
        let error = new Error('Error: ' + url_api);
        // matamos el proceso con un error
        return callback(error, null);
      }
    }
  }
  // por ultimo enviamos la peticion
  xhttp.send();
}

// primero buscamos la lista de personajes
fetchData(API, (error1, data1) => {
  // si error, matamos retornando un error
  if (error1) return console.error(error1);
  // luego buscamos en la API el primer id
  fetchData(API + data1.results[0].id, (error2, data2) => {
    // si error, matamos retornando un error
    if (error2) return console.error(error2);
    // por ultimo la consulta a la API que contiene su dimension
    fetchData(data2.origin.url, (error3, data3) => {
      // si error, matamos retornando un error
      if (error3) return console.error(error3);

      // mostramos los resultados :) 
      console.log(data1.info.count); // Numero de personajes
      console.log(data2.name); // Nombre del personaje id=1
      console.log(data3.dimension); // Dimension -> origin.url

      // rutas de las peticiones en orden
      console.log(API);
      console.log(API + data1.results[0].id);
      console.log(data2.origin.url);

    });
  });
});