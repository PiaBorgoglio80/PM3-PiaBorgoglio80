import { Request, Response } from "express";
import { createCredentialService, validateCredentialService } from "../services/credentialsService";
import { CredentialDto } from "../dto/CredentialDto";
import { generateToken } from "../utils/jwt"; 

export const createCredentialController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const credentialId = await createCredentialService({ username, password });
    res.status(201).json({ credentialId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating credential." });
  }
};

export const validateCredentialController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const credential = await validateCredentialService({ username, password });
    if (credential) {
      const token = generateToken(credential.id);  
      res.status(200).json({ message: "Login successful", token, user: credential });
    } else {
      res.status(404).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error al validar credenciales", error);
    res.status(500).json({ message: "Error validating credentials." });
  }
};






