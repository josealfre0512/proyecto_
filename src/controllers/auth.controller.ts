import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Validar que vengan los datos requeridos
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Todos los campos (name, email, password) son obligatorios.' });
      return;
    }

    // 2. Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
      return;
    }

    // 3. Encriptar la contraseña de forma manual y segura
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Crear y guardar el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar usuario.' });
  }
};

// Iniciar sesión (Login)
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validar campos
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
      return;
    }

    // 2. Buscar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas (usuario no encontrado).' });
      return;
    }

    // 3. Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      res.status(401).json({ error: 'Credenciales inválidas (contraseña incorrecta).' });
      return;
    }

    // 4. Generar el Token JWT
    const jwtSecret = process.env.JWT_SECRET || 'clave_de_emergencia_por_si_falla_el_env';
    const token = jwt.sign(
      { id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: '24h' } // El token expira en un día
    );

    // 5. Responder con el token y datos públicos del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
  }
};