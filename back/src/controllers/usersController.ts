import { Request, Response } from "express";
import { createUserService, getUserService, deleteUserService } from "../services/userService";
import IUser from "../interfaces/IUser";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, active } = req.body;

    if (!name || !email || typeof active !== "boolean") {
      res.status(400).json({ message: "Missing or invalid data." });
      return;
    }

    const newUser: IUser = await createUserService({ name, email, active });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await getUserService();
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

    const users = await getUserService();
    const user = users.find(user => user.id === Number(id));

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

    const users = await getUserService();
    const userExists = users.some(user => user.id === Number(id));

    if (!userExists) {
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





































