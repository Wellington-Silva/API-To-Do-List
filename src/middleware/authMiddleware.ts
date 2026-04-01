import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const authMiddleware: RequestHandler = (req, res, next) => {

    const authHeader = req?.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            cellphone: decoded.cellphone,
            birthDate: decoded.birthDate
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: true, message: "Token inválido" });
    }
};

export default authMiddleware;