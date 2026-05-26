import { z } from 'zod';

// Definimos los tipos válidos como una tupla constante
const PROJECT_TYPES = ['Ficha', 'Perfil', 'Avance', 'Final'] as const;

// Esquema de validación general para cualquier proyecto
export const createProjectSchema = z.object({
  title: z.string().min(5, { message: 'El título es obligatorio y debe tener al menos 5 caracteres' }),
  description: z.string().min(10, { message: 'La descripción es obligatoria y debe tener al menos 10 caracteres' }),
  type: z.enum(PROJECT_TYPES),
  metadata: z.object({
    lineaInvestigacion: z.string().optional(),
    comunidad: z.string().optional(),
    tutor: z.string().optional(),
    porcentajeAvance: z.number().min(0).max(100).optional(),
    conclusiones: z.string().optional(),
  }).optional(),
}).refine((data) => {
  // Validaciones condicionales según el tipo de formulario del PNF
  if (data.type === 'Ficha' || data.type === 'Perfil') {
    return !!data.metadata?.lineaInvestigacion && !!data.metadata?.comunidad;
  }
  if (data.type === 'Avance') {
    return !!data.metadata?.tutor && data.metadata?.porcentajeAvance !== undefined;
  }
  if (data.type === 'Final') {
    return !!data.metadata?.tutor && !!data.metadata?.comunidad && !!data.metadata?.conclusiones;
  }
  return true;
}, {
  message: 'Los campos de metadata no coinciden con los requerimientos exigidos para este tipo de formulario.',
  path: ['metadata'],
});