import { Request, Response } from "express";
import { createCredentialService, validateCredentialService } from "../services/credentialsService";
import { CredentialDto } from "../dto/CredentialDto";

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
    const credentialId = await validateCredentialService({ username, password });
    if (credentialId) {
      res.status(200).json({ credentialId });
    } else {
      res.status(404).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error validating credentials." });
  }
};










// import { Request, Response } from "express";
// import {
//   createCredentialService,
//   validateCredentialService,
// } from "../services/credentialsService";

// export const createCredential = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       res.status(400).json({ message: "Username and password are required." });
//       return;
//     }

//     const credentialId = await createCredentialService(username, password);
//     res.status(201).json({ credentialId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating credentials." });
//   }
// };

// export const validateCredential = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       res.status(400).json({ message: "Username and password are required." });
//       return;
//     }

//     const credentialId = await validateCredentialService(username, password);

//     if (!credentialId) {
//       res.status(401).json({ message: "Invalid credentials." });
//       return;
//     }

//     res.status(200).json({ credentialId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error validating credentials." });
//   }
// };
