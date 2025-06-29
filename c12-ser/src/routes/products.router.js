import { Router } from "express"; //desetructuring

const router = Router(); //creo la

//El app acá no existe, lo reemplazaremos por router
//importo la 1er función del product.controller.js
import {
    getAllProducts, 
    searchProducts, 
    getProductById} from "../controllers/products.controller.js";
router.get("/products", getAllProducts);

//query no se define  en la ruta Ej /search?nombre=no&precio=10 =>[Object: null protype]{nombre: 'no', precio: '10}//?clave=valor
//Quiero buscar modifico nombre: "Uno 1", antes eran camiseta, pantalon, zapato
//Agrego search que no es un parametro, necesito filtrar o buscar un producto por su nombre (precio, etc)
//Busqueda debe estar antes que .../:id porque sino toma el /search como :id y si no existe muestra:'No existe el producto
//Si a cualquier ruta Ej /products?nombre=Uno => no hace nada porque no tengo una logica para ese query, toma solo la ruta definida
router.get("/products/search",searchProducts);

//param basico
// router.get("/products/2", (req, res) => {
//   const product = products.find((item) => item.id == 2);
//   res.json(product);
// });
//params se definen en la ruta
router.get("/products/:id",getProductById);

router.post("/products", (req, res) => {
  //console.log(req.body) // Voy a postman, envio Produto 1 pero no llega: undefined. Necesito middleware
  //Luego si tengo esto en consola: { name: 'Producto 1', price: 123 }
  //res.send("POST")//Veo en Postan con status 200 OK
  const { nombre, precio } = req.body;
  const newProduct = {
    id: products.length + 1,
    nombre,
    precio,
  };
  products.push(newProduct);
  res.status(200).json(newProduct); // Postman: lo muestra en post y en get lo agrega al final
});
router.put("/products/:id", (req, res) => {
  const { nombre, precio } = req.body; //Extra:valido el nombre y el precio
  if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
    return res.status(400).json({ error: "Nombre inválido" });
  }
  if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: "Precio inválido" });
  } // fin de la validación nombre y precio
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product does not exist" });
  }
  products[productIndex] = { id: productId, nombre, precio };
  res.json(products[productIndex]);
});
router.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product does not exist" });
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

export default router; //exporta con default para poder llamarlo con un nombre cualquiera
//exportacion nombrada si o si la debo llamar por su nombre Ej Hola
//export const Hola = ()=>{}
