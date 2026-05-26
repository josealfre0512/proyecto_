import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos la interfaz de Request de Express para poder adjuntar el usuario
export interface IAuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const checkAuth = (req: IAuthRequest, res: Response, next: NextFunction): void => {
  try {
    // 1. Obtener el token del header Authorization (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token válido.' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar el token
    const jwtSecret = process.env.JWT_SECRET || 'clave_de_emergencia_por_si_falla_el_env';
    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };

    // 3. Adjuntar los datos del usuario decodificados al objeto req
    req.user = { 
      id: decoded.id, 
      email: decoded.email 
    };
    
    next(); // Validado con éxito, procedemos al controlador
  } catch (error) {
    console.error('Error al validar token:', error);
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};