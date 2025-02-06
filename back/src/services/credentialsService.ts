import { AppDataSource } from "../config/data-source";
import { Credentials } from "../entities/Credentials";
import { CredentialDto } from "../dto/CredentialDto";

const credentialRepository = AppDataSource.getRepository(Credentials);

export const createCredentialService = async (
  credentialData: CredentialDto
): Promise<Credentials> => {
  if (!credentialData.username || !credentialData.password) {
    throw new Error("Username and password are required.");
  }

  const existingCredential = await credentialRepository.findOne({
    where: { username: credentialData.username },
  });

  if (existingCredential) {
    throw new Error("El nombre de usuario ya está en uso.");
  }

  try {
    const newCredential = credentialRepository.create({
      username: credentialData.username,
      password: credentialData.password,
    });

    await credentialRepository.save(newCredential);
    console.log("Credenciales creadas:", newCredential);
    return newCredential;  
  } catch (error) {
    console.error(error);
    throw new Error("Error creating credential.");
  }
};

export const validateCredentialService = async (
  credentialData: CredentialDto
): Promise<Credentials | null> => {
  const { username, password } = credentialData;

  const existingCredential = await credentialRepository.findOne({
    where: { username },
  });

  if (!existingCredential) {
    return null; 
  }

  if (existingCredential.password === password) {
    return existingCredential; 
  } else {
    return null; 
  }
};




















