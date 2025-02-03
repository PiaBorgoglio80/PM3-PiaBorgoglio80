
import { Request, Response } from "express";
import { 
  createUserService, 
  getUserService, 
  deleteUserService, 
  getUserByIdService 
} from "../services/userService";
import { User } from "../entities/User";  

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, active, birthdate, nDni, credentialsId } = req.body;

    if (!name || !email || typeof active !== "boolean" || !birthdate || !nDni || !credentialsId) {
      res.status(400).json({ message: "Missing or invalid data." });
      return;
    }

    const parsedBirthdate = new Date(birthdate);
    if (isNaN(parsedBirthdate.getTime())) {
      res.status(400).json({ message: "Invalid date format." });
      return;
    }

    const newUser: User = await createUserService({
      name,
      email,
      active,
      birthdate: parsedBirthdate,
      nDni,
      credentialsId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await getUserService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users." });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const user: User | null = await getUserByIdService(Number(id));

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user." });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const user: User | null = await getUserByIdService(Number(id));

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    await deleteUserService(Number(id));
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." });
  }
};

















































































































































