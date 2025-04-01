import { Request, Response } from "express";
import { UserDto, UserLoginDto, UserLoginSuccesDTO } from "../dto/UserDto";
import { getUserByIdService, getUserService, registerUserService, loginUserService } from "../services/userService";
import { PostgresError } from "../interfaces/ErrorInterface";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const response = await getUserService();
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const response = await getUserByIdService(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    if (req.body.birthDate) {
      req.body.birthDate = new Date(req.body.birthDate);
    }
    
    await registerUserService(req.body);
    res.status(201).json({
      message: "Usuario registrado con exito!"
    });
  } catch (error) {
    const postgresError = error as PostgresError;
    res.status(400).json({
      message: "Error en el servidor",
      data: postgresError instanceof Error ? (postgresError.detail ? postgresError.detail : postgresError.message) : "Error desconocido",
    });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const response = await loginUserService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "error desconocido"
    });
  }
};








// import { Request, Response } from "express";
// import { UserDto, UserLoginDto, UserLoginSuccesDTO } from "../dto/UserDto";
// import { getUserByIdService, getUserService, registerUserService, loginUserService } from "../services/userService";
// import { PostgresError } from "../interfaces/ErrorInterface"; //

// export const getUsersController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const response = await getUserService();
//     res.status(200).json({
//       message: "Obtener el listado de todos los usuarios",
//       data: response,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Error en el servidor",
//       data: error instanceof Error ? error.message : "Error desconocido",
//     });
//   }
// };

// export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
//   const { id } = req.params;
//   try {
//     const response = await getUserByIdService(id);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(404).json({
//       message: "Error en el servidor",
//       data: error instanceof Error ? error.message : "Error desconocido",
//     });
//   }
// };

// export const registerUserController = async (req: Request<unknown, unknown, UserDto>, res: Response): Promise<void> => {
//   try {
//     if (req.body.birthDate) {
//       req.body.birthDate = new Date(req.body.birthDate);
//     }

//     await registerUserService(req.body);
//     res.status(201).json({
//       message: "Usuario registrado con exito!"
//     });
//   } catch (error) {
//     const postgresError = error as PostgresError;
//     res.status(400).json({
//       message: "Error en el servidor",
//       data: postgresError instanceof Error ? (postgresError.detail ? postgresError.detail : postgresError.message) : "Error desconocido",
//     });
//   }
// };

// export const loginUserController = async (req: Request<unknown, unknown, UserLoginDto>, res: Response): Promise<void> => {

// try{
//   const response: UserLoginSuccesDTO | null =await loginUserService(req.body)
//    res.status(200).json(response);
// } catch (error){
//   res.status(400).json({
//     message: "Error en el servidor",
//     data: error instanceof Error ? error.message : "error desconocido"
//   })
// }

 
// };


































































































































