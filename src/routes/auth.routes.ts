import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
const router = Router();

// Definición de endpoints públicos para autenticación
router.post('/register', register);
router.post('/login', login);

export default router;