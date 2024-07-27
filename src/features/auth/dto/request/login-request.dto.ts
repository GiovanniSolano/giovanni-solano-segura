import Joi from 'joi';

/**
 * Schema for validating user login data.
 * @property {string} email - User's email address, must be a valid email format and is required.
 * @property {string} password - User's password, required.
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

/**
 * Data Transfer Object (DTO) for user login information.
 * Represents the data structure for login requests.
 */
export class UserLoginDto {
  
  /** User's email address */
  public email!: string;

  /** User's password */
  public password!: string;
}
