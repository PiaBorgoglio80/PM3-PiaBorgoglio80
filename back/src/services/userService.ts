import { AppDataSource } from "../config/data-source";  
import { UserDto, UserLoginDto, UserTwoDto, UserLoginSuccesDTO } from "../dto/UserDto";  
import { checkCredentials, createCredentialService } from "./credentialsService";  
import { Credential } from "../entities/Credentiials.Entity"; 
import { EntityManager } from "typeorm"; 
import { User } from "../entities/Useer.Entity";  

export const getUserService = async (): Promise<UserTwoDto[]> => {   
  const userRepository = AppDataSource.getRepository(User);   
  const users: User[] = await userRepository.find();   
  return users; 
};  

export const getUserByIdService = async (id: string): Promise<UserTwoDto> => {   
  const userRepository = AppDataSource.getRepository(User);   
  const userFound = await userRepository.findOne({     
    where: {       
      id: parseInt(id, 10)     
    },     
    relations: ["appointments"]   
  });    
  
  if (!userFound) throw new Error(`El usuario con id ${id} no existe`);   
  else return userFound; 
};  

export const registerUserService = async (user: UserDto): Promise<User> => {   
  const result = await AppDataSource.transaction(async (entityManager) => {     
    const userCredential: Credential = await createCredentialService(
      entityManager, 
      user.username, 
      user.password
    );      
    
    const newUser: User = entityManager.create(User, {       
      name: user.name,       
      birthDate: user.birthDate,       
      email: user.email,       
      nDni: user.nDni,       
      credential: userCredential     
    });     
    
    return await entityManager.save(newUser);   
  });   
  
  return result; 
};  

export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {   
  try {     
    const credentialId: number | undefined = await checkCredentials(
      user.username, 
      user.password
    );          
    
    if (!credentialId) {       
      throw new Error("Credenciales inválidas");     
    }          
    
    const userRepository = AppDataSource.getRepository(User);          
    
    // Aquí está el cambio principal, usamos findOne con la relación correcta
    const userFound = await userRepository.findOne({
      where: {
        credential: {
          id: credentialId
        }
      },
      relations: ["credential"]
    });
    
    if (!userFound) {       
      throw new Error("Usuario no encontrado");     
    }          
    
    return {       
      login: true,       
      user: {         
        id: userFound.id,         
        name: userFound.name,         
        email: userFound.email,         
        birthDate: userFound.birthDate,         
        nDni: userFound.nDni       
      }     
    };   
  } catch (error) {     
    throw error;   
  } 
};






// import { AppDataSource } from "../config/data-source"; 
// import { UserDto, UserLoginDto, UserTwoDto, UserLoginSuccesDTO } from "../dto/UserDto"; 
// import { checkCredentials, createCredentialService } from "./credentialsService"; 
// import { Credential } from "../entities/Credentiials.Entity";
// import { EntityManager } from "typeorm";
// import { User } from "../entities/Useer.Entity";

// export const getUserService = async (): Promise<UserTwoDto[]> => {
//   const userRepository = AppDataSource.getRepository(User);
//   const users: User[] = await userRepository.find();
//   return users;
// };

// export const getUserByIdService = async (id: string): Promise<UserTwoDto> => {
//   const userRepository = AppDataSource.getRepository(User);
//   const userFound = await userRepository.findOne({
//     where: {
//       id: parseInt(id, 10)
//     },
//     relations: ["appointment"]
//   });

//   if (!userFound) throw new Error(`El usuario con id ${id} no existe`);
//   else return userFound;
// };

// export const registerUserService = async (user: UserDto): Promise<User> => {
//   const result = await AppDataSource.transaction(async (EntityManager) => {
//     const userCredentials: Credential = await createCredentialService(EntityManager, user.username, user.password);

//     const newUser: User = EntityManager.create(User, {
//       name: user.name,
//       birthDate: user.birthDate,
//       email: user.email,
//       nDni: user.nDni,
//       credential: userCredentials
//     });
//     return await EntityManager.save(newUser);
//   });
//   return result;
// };
// export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {
//   try {
//     const credentialId: number | undefined = await checkCredentials(user.username, user.password);
    
//     if (!credentialId) {
//       throw new Error("Credenciales inválidas");
//     }
    
//     const userRepository = AppDataSource.getRepository(User);
    
//     // Buscar directamente el usuario que tenga la credencial con ese ID
//     const userFound = await userRepository.findOne({
//       where: {
//         credential: {
//           id: credentialId
//         }
//       },
//       relations: ["credential"]
//     });
    
//     if (!userFound) {
//       throw new Error("Usuario no encontrado");
//     }
    
//     return {
//       login: true,
//       user: {
//         id: userFound.id,
//         name: userFound.name,
//         email: userFound.email,
//         birthDate: userFound.birthDate,
//         nDni: userFound.nDni
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {
//   try {
//     const credentialId: number | undefined = await checkCredentials(user.username, user.password);
    
//     if (!credentialId) {
//       throw new Error("Credenciales inválidas");
//     }
    
//     // Usar el repositorio directamente en lugar de confiar en userModel
//     const userRepository = AppDataSource.getRepository(User);
    
//     // Buscar todos los usuarios con sus credenciales
//     const users = await userRepository.find({
//       relations: ["credential"]
//     });
    
//     // Encontrar el usuario que tiene la credencial correspondiente
//     const userFound = users.find(user => 
//       user.credential && user.credential.id === credentialId
//     );
    
//     if (!userFound) {
//       throw new Error("Usuario no encontrado");
//     }
    
//     return {
//       login: true,
//       user: {
//         id: userFound.id,
//         name: userFound.name,
//         email: userFound.email,
//         birthDate: userFound.birthDate,
//         nDni: userFound.nDni
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
//};






// import { userModel, AppDataSource } from "../config/data-source"; 
// import { UserDto, UserLoginDto, UserTwoDto, UserLoginSuccesDTO } from "../dto/UserDto"; 
// import { checkCredentials, createCredentialService } from "./credentialsService"; 
// import { Credential } from "../entities/Credentiials.Entity";
// import { EntityManager } from "typeorm";
// import { User } from "../entities/Useer.Entity";

// export const getUserService = async (): Promise<UserTwoDto[]> => {
//   const users: User[] = await userModel.find();
//   return users;
// };

// export const getUserByIdService = async (id: string): Promise<UserTwoDto> => {
//   const userFound = await userModel.findOne({
//     where: {
//       id: parseInt(id, 10)
//     },
//     relations: ["appointment"]
//   });

//   if (!userFound) throw new Error(`El usuario con id ${id} no existe`);
//   else return userFound;
// };

// export const registerUserService = async (user: UserDto): Promise<User> => {
//   const result = await AppDataSource.transaction(async (EntityManager) => {
//     const userCredentials: Credential = await createCredentialService(EntityManager, user.username, user.password);

//     const newUser: User = EntityManager.create(User, {
//       name: user.name,
//       birthDate: user.birthDate,
//       email: user.email,
//       nDni: user.nDni,
//       credentials: userCredentials
//     });
//     return await EntityManager.save(newUser);
//   });
//   return result;
// };

// export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {
//   try {
//     const credentialsId: number | undefined = await checkCredentials(user.username, user.password);
    
//     if (!credentialsId) {
//       throw new Error("Credenciales inválidas");
//     }
    
//     // Verifica que el modelo de usuario esté inicializado
//     if (!userModel) {
//       throw new Error("Modelo de usuario no inicializado");
//     }
    
//     // Utiliza la relación correcta según tu entidad
//     // Primero, verifica cuál es el nombre de la relación en tu entidad User
//     const userRepository = AppDataSource.getRepository(User);
    
//     const userFound = await userRepository
//       .createQueryBuilder("user")
//       .innerJoinAndSelect("user.credentials", "credentials")  // Asume que "credentials" es el nombre de la relación
//       .where("credentials.id = :credId", { credId: credentialsId })
//       .getOne();
    
//     if (!userFound) {
//       throw new Error("Usuario no encontrado");
//     }
    
//     return {
//       login: true,
//       user: {
//         id: userFound.id,
//         name: userFound.name,
//         email: userFound.email,
//         birthDate: userFound.birthDate,
//         nDni: userFound.nDni
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
// };















// import { userModel, AppDataSource } from "../config/data-source"; 
// import { UserDto, UserLoginDto, UserTwoDto, UserLoginSuccesDTO } from "../dto/UserDto"; 
// import { checkCredentials, createCredentialService } from "./credentialsService"; 
// import { Credential } from "../entities/Credentiials.Entity";
// import { EntityManager } from "typeorm";
// import { User } from "../entities/Useer.Entity";

// export const getUserService = async (): Promise<UserTwoDto[]> => {
//   const users: User[] = await userModel.find();
//   return users;
// };

// export const getUserByIdService = async (id: string): Promise<UserTwoDto> => {
//   const userFound = await userModel.findOne({
//     where: {
//       id: parseInt(id, 10)
//     },
//     relations: ["appointment"]
//   });

//   if (!userFound) throw new Error(`El usuario con id ${id} no existe`);
//   else return userFound;
// };

// export const registerUserService = async (user: UserDto): Promise<User> => {
//   const result = await AppDataSource.transaction(async (EntityManager) => {
//     const userCredentials: Credential = await createCredentialService(EntityManager, user.username, user.password);

//     const newUser: User = EntityManager.create(User, {
//       name: user.name,
//       birthDate: user.birthDate,
//       email: user.email,
//       nDni: user.nDni,
//       credentials: userCredentials
//     });
//     return await EntityManager.save(newUser);
//   });
//   return result;
// };

// export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {
//   try {
//     const credentialsId: number | undefined = await checkCredentials(user.username, user.password);
    
//     if (!credentialsId) {
//       throw new Error("Credenciales inválidas");
//     }
    
//     // Aquí está la corrección: asegúrate de que userModel esté definido
//     if (!userModel) {
//       throw new Error("Modelo de usuario no inicializado");
//     }
    
//     // También corrige la relación: credentials en lugar de credential
//     const userFound = await userModel.findOne({
//       where: {
//         credentials: { 
//           id: credentialsId
//         }
//       }
//     });
    
//     if (!userFound) {
//       throw new Error("Usuario no encontrado");
//     }
    
//     return {
//       login: true,
//       user: {
//         id: userFound.id,
//         name: userFound.name,
//         email: userFound.email,
//         birthDate: userFound.birthDate,
//         nDni: userFound.nDni
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
// };








// import { userModel, AppDataSource } from "../config/data-source"; //

// import { UserDto, UserLoginDto, UserTwoDto, UserLoginSuccesDTO } from "../dto/UserDto"; //c
// // import { IUser } from "../interfaces/IUser";
// import { checkCredentials, createCredentialService } from "./credentialsService"; //cambi
// // import { User } from "../entities/Useer.Entity";
// // import {Credential} from "../entities/Credentiials.Entity";
// import { Credential } from "../entities/Credentiials.Entity";
// import { EntityManager } from "typeorm";
// import { User } from "../entities/Useer.Entity";


// export const getUserService = async (): Promise<UserTwoDto[]> =>{
//   const users: User[] = await userModel.find()
//   return users
// }


// export const getUserByIdService = async (id: string):Promise<UserTwoDto>=> {

// const userFound = await userModel.findOne({
//   where: {
//     id: parseInt(id,10)
//   },
//   relations: ["appointment"]
// })


// if(!userFound) throw new Error (`El usuario con id ${id} no existe`)
//   else return userFound
// }
// export const registerUserService = async (user: UserDto):Promise<User>=> {

//  const result = await AppDataSource.transaction(async (EntityManager) =>{

//     const userCredentials: Credential = await createCredentialService(EntityManager,user.username, user.password)

//     const newUser:User = EntityManager.create(User,{
//       name: user.name,
//     birthDate: user.birthDate,
//     email: user.email,
//     nDni: user.nDni,
//     credentials: userCredentials
//     })
//     return await EntityManager.save(newUser)
//   })
//   return result
// }

// export const loginUserService = async (user: UserLoginDto): Promise<UserLoginSuccesDTO> => {
//   try {
//     const credentialsId: number | undefined = await checkCredentials(user.username, user.password);
    
//     const userFound: User | null = await userModel.findOne({
//       where: {
//         credential: { 
//           id: credentialsId
//         }
//       }
//     });
    
//     if (!userFound) {
//       throw new Error("Usuario no encontrado");
//     }
    
//     return {
//       login: true,
//       user: {
//         id: userFound?.id ?? 0,
//         name: userFound?.name ?? "",
//         email: userFound?.email ?? "",
//         birthDate: userFound?.birthDate ?? new Date(),
//         nDni: userFound?.nDni ?? 0
//       }
//     };
//   } catch (error) {
//     throw error;
//   }
// }
