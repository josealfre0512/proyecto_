import { Schema, model } from 'mongoose';
import { IProject } from '../interfaces/project.interface';

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { 
      type: String, 
      required: true, 
      enum: ['Ficha', 'Perfil', 'Avance', 'Final'] 
    },
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['Pendiente', 'Aprobado', 'Rechazado'], 
      default: 'Pendiente' 
    },
    metadata: {
      lineaInvestigacion: { type: String, trim: true },
      comunidad: { type: String, trim: true },
      tutor: { type: String, trim: true },
      porcentajeAvance: { type: Number, default: 0 },
      conclusiones: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);