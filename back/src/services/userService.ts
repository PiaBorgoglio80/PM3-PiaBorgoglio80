import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { createCredentialService } from "./credentialsService";  

export const createUserService = async (userData: { 
  name: string; 
  email: string; 
  active: boolean; 
  birthdate: Date; 
  nDni: string; 
  credentialId: number;  
}): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create({
    name: userData.name,
    email: userData.email,
    active: userData.active,
    birthdate: userData.birthdate,
    nDni: userData.nDni,
    credentials: { id: userData.credentialId }, 
  });

  await userRepository.save(user);
  return user;
};
