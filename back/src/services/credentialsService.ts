import bcrypt from "bcrypt"; 
import { EntityManager } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentiials.Entity";

const crypPass = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds); 
};

export const createCredentialService = async (
  EntityManager: EntityManager, 
  username: string, 
  password: string
): Promise<Credential> => {
  const passwordEncripted: string = await crypPass(password);
  const credentials: Credential = EntityManager.create(Credential, {
    username,
    password: passwordEncripted
  });
      
  return await EntityManager.save(credentials);
};

export const checkCredentials = async (
  username: string, 
  password: string
): Promise<number | undefined> => {
  try {
    const credentialRepository = AppDataSource.getRepository(Credential);
    
    const credential = await credentialRepository.findOne({
      where: { username },
      select: ["id", "password"] // Importante incluir password ya que está marcado como select: false
    });
    
    if (!credential) {
      return undefined;
    }
    
    const isPasswordValid = await bcrypt.compare(password, credential.password);
    
    if (!isPasswordValid) {
      return undefined;
    }
    
    return credential.id;
  } catch (error) {
    console.error("Error checking credentials:", error);
    return undefined;
  }
};







// import bcrypt from "bcrypt";
// import { ICredential } from "../interfaces/ICredential"; //
// import {Credential} from "../entities/Credentiials.Entity"; //
// import { credentialModel } from "../config/data-source"; //
// import { EntityManager } from "typeorm";



// const crypPass = async (password: string): Promise<string> => { 
//   const saltRounds = 10; 
//   return await bcrypt.hash(password, saltRounds);
// };


// export const createCredentialService: (EntityManager: EntityManager, a: string, b: string) => Promise<Credential> = async (EntityManager: EntityManager, username: string, password: string):Promise <Credential>=> {

//   const passwordEncripted: string = await crypPass(password)

//   const credentials: Credential = EntityManager.create(Credential,{
//     username,
//     password: passwordEncripted
//   })
      
//   return await EntityManager.save(credentials)



   
// }

// export const checkCredentials = async (username: string, password: string): Promise<number | undefined> => {

// const usernameFound: Credential | null = await credentialModel.findOne({
//   where: {
//     username: username,

//   }
// })
// const crypPassword: string = await crypPass(password)

// if(!usernameFound) throw new Error ( `El usuario ${username} no fue encontrado`)

// if(usernameFound.password !== crypPassword) throw new Error (`Usuario o contraseña erronea`)
// else return usernameFound.id

// }



// export const checkCredentials = async (username: string, password: string): Promise<number | undefined> => {
//   const usernameFound: Credential | null = await credentialModel.findOne({
//     where: { username: username }
//   });

//   if (!usernameFound) throw new Error(`El usuario ${username} no fue encontrado`);

//   const passwordMatch = await bcrypt.compare(password, usernameFound.password); // Cambié bcrypt.hash a bcrypt.compare

//   if (!passwordMatch) throw new Error(`Usuario o contraseña errónea`);
//   else return usernameFound.id;
// };


// export const checkCredentials = async (username: string, password: string): Promise<number | undefined> => {
//   // Buscar el usuario en la base de datos
//   const usernameFound: Credential | null = await credentialModel.findOne({
//     where: { username: username }
//   });

//   // Si no se encuentra el usuario
//   if (!usernameFound) throw new Error(`El usuario ${username} no fue encontrado`);

//   // Comparar la contraseña proporcionada con el hash almacenado
//   const passwordMatch = await bcrypt.compare(password, usernameFound.password);

//   // Si las contraseñas no coinciden, devolver un error
//   if (!passwordMatch) throw new Error(`Usuario o contraseña errónea`);
  
//   // Si las contraseñas coinciden, devolver el ID del usuario
//   return usernameFound.id;
// };








