import { AppDataSource } from "../config/data-source";
import { Credentials } from "../entities/Credentials";
import { CredentialDto } from "../dto/CredentialDto";

const credentialRepository = AppDataSource.getRepository(Credentials);

export const createCredentialService = async (
  credentialData: CredentialDto
): Promise<number> => {
  if (!credentialData.username || !credentialData.password) {
    throw new Error("Username and password are required.");
  }

  try {
    const newCredential = credentialRepository.create({
      username: credentialData.username,
      password: credentialData.password,
    });

    await credentialRepository.save(newCredential);
    return newCredential.id;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating credential.");
  }
};

export const validateCredentialService = async (
  credentialData: CredentialDto
): Promise<number | null> => {
  if (!credentialData.username || !credentialData.password) {
    throw new Error("Username and password are required.");
  }

  try {
    // Cambiado findOneBy() por findOne() con where: {}
    const credential = await credentialRepository.findOne({
      where: { username: credentialData.username, password: credentialData.password },
    });

    return credential ? credential.id : null;
  } catch (error) {
    console.error(error);
    throw new Error("Error validating credentials.");
  }
};




























// import { AppDataSource } from "../config/data-source";
// import { Credentials } from "../entities/Credentials"; // Asegúrate de que la entidad de Credential esté bien definida en entities
// import ICredential from "../interfaces/ICredential";

// // Obtener el repositorio de Credential
// const credentialRepository = AppDataSource.getRepository(Credentials);

// export const createCredentialService = async (
//   username: string,
//   password: string
// ): Promise<number> => {
//   if (!username || !password) {
//     throw new Error("Username and password are required.");
//   }

//   try {
//     // Creamos una nueva credencial
//     const newCredential = credentialRepository.create({
//       username,
//       password,
//     });

//     // Guardamos la credencial en la base de datos
//     await credentialRepository.save(newCredential);

//     return newCredential.id;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error creating credential.");
//   }
// };

// export const validateCredentialService = async (
//   username: string,
//   password: string
// ): Promise<number | null> => {
//   if (!username || !password) {
//     throw new Error("Username and password are required.");
//   }

//   try {
//     // Buscamos la credencial en la base de datos
//     const credential = await credentialRepository.findOneBy({
//       username,
//       password,
//     });

//     return credential ? credential.id : null;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error validating credentials.");
//   }
// };




















































