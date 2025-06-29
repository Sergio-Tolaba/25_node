//Pongo los productos acá para hacer un servicio ficticio
//Traigo el array de productos
//Voy a copiar todas las rutas de productos de index, acá.
//Array de productos como objetos literales que estaban en Routers y ahora pasan a Controllers
const products = [
  {
    id: 1,
    nombre: "Uno 1",
    precio: 19.99,
    cantidad: 10,
  },
  {
    id: 2,
    nombre: "Dos 2",
    precio: 35.99,
    cantidad: 5,
  },
  {
    id: 3,
    nombre: "Tres 3",
    precio: 59.99,
    cantidad: 3,
  },
];

//Creo una función que me muestre los productos
export const getAllProducts = (req, res) => {
  return products;
};
