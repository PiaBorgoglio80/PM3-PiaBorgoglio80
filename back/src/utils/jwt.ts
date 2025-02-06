import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key"; 

export const generateToken = (userId: number): string => {
const playload = {userId};

const token = jwt.sign(playload, SECRET_KEY, { expiresIn: '1h'});
return token;
};
