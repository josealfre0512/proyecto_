import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      // Validamos el error por su nombre estructural, evitando conflictos de instancias
      if (error && error.name === 'ZodError' && Array.isArray(error.errors)) {
        const errorMessages = error.errors.map((err: any) => ({
          campo: Array.isArray(err.path) ? err.path.join('.') : 'campo',
          mensaje: err.message || 'Dato inválido',
        }));
        
        res.status(400).json({ 
          error: 'Validación de formulario fallida', 
          detalles: errorMessages 
        });
        return;
      }
      
      res.status(500).json({ error: 'Error interno durante la validación.' });
    }
  };
};