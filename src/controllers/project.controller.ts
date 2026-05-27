import { Response } from 'express';
import { IAuthRequest } from '../middlewares/auth.middleware';
import { Project } from '../models/Project';

// 1. Crear un proyecto (Cualquiera de los 4 formularios)
export const createProject = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, type, metadata } = req.body;
    const authorId = req.user?.id;

    if (!title || !description || !type) {
      res.status(400).json({ error: 'Los campos title, description y type son obligatorios.' });
      return;
    }

    const newProject = new Project({
      title,
      description,
      type,
      author: authorId,
      metadata
    });

    await newProject.save();
    res.status(201).json({ message: 'Proyecto registrado con éxito.', project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el proyecto.' });
  }
};

// 2. Obtener todos los proyectos del usuario autenticado
export const getUserProjects = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const authorId = req.user?.id;
    const projects = await Project.find({ author: authorId }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los proyectos.' });
  }
};

// 3. Actualizar un proyecto propio
export const updateProject = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;

    const project = await Project.findOne({ _id: id, author: authorId });
    if (!project) {
      res.status(404).json({ error: 'Proyecto no encontrado o no tienes permisos.' });
      return;
    }

    // Actualizamos los campos permitidos que vengan en el cuerpo
    const { title, description, metadata, status } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (metadata) project.metadata = { ...project.metadata, ...metadata };
    if (status) project.status = status; // Por si un tutor simula aprobarlo

    await project.save();
    res.status(200).json({ message: 'Proyecto actualizado con éxito.', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el proyecto.' });
  }
};

// 4. Eliminar un proyecto propio
export const deleteProject = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;

    const result = await Project.findOneAndDelete({ _id: id, author: authorId });
    if (!result) {
      res.status(404).json({ error: 'Proyecto no encontrado o no tienes permisos.' });
      return;
    }

    res.status(200).json({ message: 'Proyecto eliminado permanentemente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el proyecto.' });
  }
};