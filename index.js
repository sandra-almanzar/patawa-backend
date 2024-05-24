import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./api/routes/user.routes.js";
import dogRoutes from "./api/routes/dog.routes.js";
import walkRoutes from "./api/routes/walk.routes.js";
import loginRoutes from "./api/routes/login.routes.js";
import handleErrors from "./middleware/handleErrors.js";
import notFound from "./middleware/notFound.js";
dotenv.config();

const app = express(); // inicializa la aplicación express

// Middleware
app.use(cors()); // Habilita CORS para todas las rutas
app.use(helmet()); // Añade seguridad básica con varios headers HTTP
app.use(express.json()); // Permite al servidor entender y parsear JSON en el cuerpo de la petición

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/walks", walkRoutes);
app.use("/api/login", loginRoutes);

// Manejo de rutas no encontradas y errores
app.use(notFound);
app.use(handleErrors);

// Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
