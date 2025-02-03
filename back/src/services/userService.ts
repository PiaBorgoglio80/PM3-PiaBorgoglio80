import { AppDataSource } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import IUser from "../interfaces/IUser";
import { createCredentialService } from "./credentialsService";

export const getUserService = async (): Promise<User[]> => {
  const users = await AppDataSource.getRepository(User).find();
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id,
  });
  return user;
};

export const createUserService = async (userData: UserDto): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(userData);  
  await userRepository.save(user);  
  return user;
};

export const deleteUserService = async (userId: number): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  await userRepository.remove(user);  
};

























// import { AppDataSource } from "../config/data-source";
// import UserDto from "../dto/UserDto";
// import { User } from "../entities/User";
// import IUser from "../interfaces/IUser";
// import { createCredentialService } from "./credentialsService";

// let users: IUser[] = [
//   {
//     id: 1,
//     name: "Jorge",
//     email: "jvega@mail.com",
//     birthdate: new Date("1990-01-01"),
//     nDni: "12345678",
//     credentialsId: 1,
//     active: true,
//   },
// ];

// let id: number = 2;

// export const getUserService = async (): Promise<User[]> => {
//   const users = await AppDataSource.getRepository(User).find();
//   return users;
// };

// export const getUserByIdService = async (id: number): Promise<User | null> => {
// const user = await AppDataSource.getRepository(User).findOneBy({
//     id
// })
// return user
//     //   return users.find((user) => user.id === userId);
// };

// export const createUserService = async (userData: UserDto) => {
//   const user = await AppDataSource.getRepository(User).create(userData);
//   const result = await AppDataSource.getRepository(User).save(user)
//   return user;
// };

// export const deleteUserService = async (userId: number): Promise<void> => {
//   users = users.filter((user) => user.id !== userId);
// };


































