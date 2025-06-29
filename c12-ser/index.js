import express from "express";
import cors from "cors";
const app = express();
//Ahora tengo mucho menos código que al principio pero si voy a postman donde sigue funcionando GET http://localhost:3000 (ok)
//No funciona el GET http://localhost:3000/products ({"error": "Not Found"}). Debo importar puedo poner cualquier nombre ej pirulo o productsRouter
import productsRouter from "./src/routes/products.router.js"; // Luego pongo un Middleware =>app.use(productsRouter)

//Middleware
app.use("/api",productsRouter);//Agrego un prefijo "/api" . También se pueden hacer versiones para que se pueda usar una u otra Ej api/v1
// api/v2..etc.
app.use(express.json());
app.use(cors()); //Si mi api no usa navegadores, no hace falta ponerlo ya que cors aparece en los navegadores // postman no tiene origin, luego no hace falta cors. Postman es un cliente http= simula más una aplicación mobile o de celular

//Rutas // Este módulo de rutas debe ser más pequeño. Luego paso las funciones al controlador
app.get("/", (req, res) => {
  //res.send("API Rest con Node.js ") - No es para humanos sino para otras aplicaciones, usa JSON
  res.json({ menssage: "API Rest con Node.js " });
});

//Otro Middleware pero este va al final y es para mostrar el error con un json propio y No con un html que genera express y vemos en  // Una API no debería mostrar un html de error
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
const PORT = 3000;

app.listen(PORT, (req, res) => console.log(`http://localhost:${PORT}`));
