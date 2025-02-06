import { Request, Response } from "express";
import { createUserService } from "../services/userService";
import { createCredentialService } from "../services/credentialsService";
import { User } from "../entities/User";
import { CredentialDto } from "../dto/CredentialDto";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, active, birthdate, nDni, username, password } = req.body;

    if (!name || !email || typeof active !== "boolean" || !birthdate || !nDni || !username || !password) {
      res.status(400).json({ message: "Missing or invalid data." });
      return;
    }

    const parsedBirthdate = new Date(birthdate);
    if (isNaN(parsedBirthdate.getTime())) {
      res.status(400).json({ message: "Invalid date format." });
      return;
    }

    const credentialData: CredentialDto = { username, password };
    const credentials = await createCredentialService(credentialData);

    if (!credentials || !credentials.id) {
      res.status(500).json({ message: "Error creating credentials." });
      return;
    }

    const newUser: User = await createUserService({
      name,
      email,
      active,
      birthdate: parsedBirthdate,
      nDni,
      credentialId: credentials.id, 
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

export default createUser;



































































































































