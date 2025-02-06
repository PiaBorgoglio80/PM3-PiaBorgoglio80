
import { Router } from "express";
import { validateCredentialController, createCredentialController } from "../controllers/credentialsController"; // Asegúrate de importar el controlador correctamente

const credentialsRouter = Router();

credentialsRouter.post("/login", validateCredentialController);
credentialsRouter.post("/register", createCredentialController);  // Ruta para el registro

export default credentialsRouter;

