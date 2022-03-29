const fetchData = require('./fetchData');
const api = 'https://rickandmortyapi.com/api/character/';

fetchData(api)
    .then(data => {
        // imprimimos el numero de personajes
        console.log(data.info.count);
        // volvemos a hacer la promesa de pedir algo, en este caso el personaje 1: Rick
        return fetchData(`${api}${data.results[0].id}`);
    })
    .then(data => {
        // esperamos la promesa anterior y vemos el nombre de rick
        console.log(data.name);
        // volvemos a hacer la promesa, pero esta es sobre la dimension de Rick
        return fetchData(data.origin.url)
    })
    .then(data => {
        // vemos la dimension de rick
        console.log(data.dimension);
    })
    // si hay error
    .catch(err => {
        console.log(err);
    })