import { Router, Request, Response } from "express";
import { createCredentialService, validateCredentialService } from "../services/credentialsService";
import { CredentialDto } from "../dto/CredentialDto";

const router: Router = Router();

router.post("/", async (req: Request<{}, {}, CredentialDto>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const credentialId = await createCredentialService({ username, password });
    res.status(201).json({ credentialId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating credential." });
  }
});

router.post("/validate", async (req: Request<{}, {}, CredentialDto>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const credentialId = await validateCredentialService({ username, password });
    if (credentialId) {
      res.status(200).json({ credentialId });
    } else {
      res.status(404).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error validating credentials." });
  }
});

export default router;









































































// import { Router } from "express";
// import { createCredential, validateCredential } from "../services/credentialsService"; // Asegúrate de que las funciones estén correctamente importadas

// const router: Router = Router();

// router.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   try {
//     const credentialId = await createCredential(username, password);
//     res.status(201).json({ credentialId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating credential." });
//   }
// });

// router.post("/validate", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   try {
//     const credentialId = await validateCredential(username, password);
//     if (credentialId) {
//       res.status(200).json({ credentialId });
//     } else {
//       res.status(404).json({ message: "Invalid credentials." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error validating credentials." });
//   }
// });

// export default router;
