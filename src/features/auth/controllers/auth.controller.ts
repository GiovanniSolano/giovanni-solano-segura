import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '@config/index';
import { Request, Response } from 'express';
import { AuthService } from '@features/auth/services';
import { loginSchema, UserLoginDto } from '@features/auth/dto/request';
import { handleError, handleValidationError, ResponseUtil } from "@shared/utils";
import { HttpStatusCode } from '@shared/constants';

/**
 * AuthController
 * This controller manage all about user authentication
 */

export class AuthController {

    /**
     * AuthController constructor.
     * @param authService - An instance of AuthService used for authentication operations.
     */
    constructor(private authService: AuthService) {}

    /**
     * Login method to authenticate user and return a token.
     * @param req - The request object containing user credentials.
     * @param res - The response object used to send back the result.
     * @returns A promise that resolves void.
     */

    public async login(req: Request, res: Response): Promise<void> {

        try {

            const { error, value } = loginSchema.validate(req.body);

            if (error) {
              return handleValidationError(res, error, 'Validation error');
            }
    
            const userLoginDto: UserLoginDto = value;
    
            const user = await this.authService.findOneByEmail(userLoginDto.email);
    
            if (!user) {
                return ResponseUtil.toErrorResponse( res, 'Invalid credentials', '', HttpStatusCode.UNAUTHORIZED);
            }
    
            const isPasswordValid = await bcrypt.compare(userLoginDto.password, user.password);
    
            if(!isPasswordValid) {
                return ResponseUtil.toErrorResponse( res, 'Invalid credentials', '', HttpStatusCode.UNAUTHORIZED);
            }
    
            const token = jwt.sign({ sub: user.id, email: user.email }, config.jwt.secret_key, { expiresIn: config.jwt.expires_in });

            await this.authService.createAccessToken(user.id, token);

            ResponseUtil.toSuccessResponse( res, { token, user }, 'Log in successfully', HttpStatusCode.OK);
            
        } catch (error) {
            handleError(res, error, 'Failed to log in');
        }
    }
}  