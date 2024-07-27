import { Request } from 'express';

/**
 * AuthenticatedRequest
 * Extends the Express `Request` interface to include additional properties for authentication.
 */
export interface AuthenticatedRequest extends Request {
  
  /**
   * The authenticated user associated with the request.
   * This property is optional and may be populated by middleware after successful authentication.
   * @type {any}
   */
  user?: any;
}
