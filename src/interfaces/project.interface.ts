import { Types } from 'mongoose';

export type ProjectType = 'Ficha' | 'Perfil' | 'Avance' | 'Final';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  type: ProjectType;
  author: Types.ObjectId; // Vinculado al ID del usuario que lo creó
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  
  // Campos dinámicos según el tipo de formulario
  metadata?: {
    lineaInvestigacion?: string; // Para Ficha/Perfil
    comunidad?: string;          // Para Ficha/Perfil/Final
    tutor?: string;              // Para Avance/Final
    porcentajeAvance?: number;   // Para Avance
    conclusiones?: string;       // Para Final
  };
  createdAt?: Date;
  updatedAt?: Date;
}