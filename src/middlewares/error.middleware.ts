import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('💥 Error detectado:', err.message || err);

  if (err.name === 'CastError') {
    res.status(400).json({ error: 'El ID proporcionado no tiene un formato válido para la base de datos.' });
    return;
  }

  if (err.code === 11000) {
    res.status(400).json({ error: 'El registro contiene datos duplicados que ya existen en el sistema.' });
    return;
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Ocurrió un error interno en el servidor.'
  });
};