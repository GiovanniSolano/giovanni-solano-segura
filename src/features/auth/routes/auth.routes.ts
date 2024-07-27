import { Router } from 'express';
import { AuthController } from '@features/auth/controllers';
import { AuthModule } from '@features/auth/auth.module';

const authService = AuthModule.getAuthService();
const authController = new AuthController(authService);

const authRoutes = Router();

authRoutes.post('/login', (req, res) => authController.login(req, res));

export {
    authRoutes
};
