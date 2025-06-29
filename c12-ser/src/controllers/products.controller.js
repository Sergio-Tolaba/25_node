//import {getAllProducts} from '../services/products.service.js' //Igual nombre de la función - conflicto
import * as service from '../services/products.service.js'
//Voy a traer la funciones de las rutas 
//ruta1 era router.get('/',acá empieza la funcion)
//exporto la función que traigo de las rutas
export const getAllProducts = (req,res)=>{
    //res.json(products)//Tengo que traer también el array de productos, ok cdo acá estaban los products
    //res.json(getAllProducts())//da error x conflicto por igual nombre de la función controllers y services
    res.json(service.getAllProducts())
}

//2da Ruta = búsqueda

export const searchProducts =  (req, res) => {
  const { nombre, precio } = req.query;
  const products = service.getAllProducts() // Esta es una linea nueva x poner la carpeta services
  let filteredProducts = products;

  if (nombre) {
    filteredProducts = filteredProducts.filter((p) =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

//   if (precio) {
//     const precioNum = parseFloat(precio);
//     filteredProducts = filteredProducts.filter((p) => p.precio === precioNum);
//   }
  if (precio) {
    filteredProducts = filteredProducts.filter((p) =>
      p.precio.toString().includes(precio)
    );
  }

  res.json(filteredProducts);
}

export const getProductById =  (req, res) => {
  //:category/:slug=>escribir el nombre en un formato mas amigable tipo url Ej receta-sergio
  console.log(req.params); // es un objeto y el numero es un string - if (isNan(id){console.log('No es num')})
  //Si quiero el id tengo que desestructurarlo. Tambien puedo validar si esta o no esta el id
  const { id } = req.params; //{id, category}
  const product = products.find((item) => item.id == req.params.id);
  console.log(product); //id que no existe=>undefined
  if (!product) {
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
}