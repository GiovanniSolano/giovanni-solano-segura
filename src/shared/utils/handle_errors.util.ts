import { Response } from 'express';
import { HttpStatusCode } from '@shared/constants';

/**
 * Handles validation errors by formatting them.
 * 
 * @param res - The Express `Response` object used to send the HTTP response.
 * @param error - The validation error object, typically containing details about validation failures.
 * @param message - A custom message to include in the response.
 * 
 * @returns {void}
 */
export const handleValidationError = (res: Response, error: any, message: string): void => {
  const formattedErrors = error.details.map((detail: any) => ({
    field: detail.context?.key,
    message: detail.message
  }));

  res.status(HttpStatusCode.BAD_REQUEST).json({
    success: false,
    message,
    errors: formattedErrors
  });
};

/**
 * Handles generic errors by logging the error.
 * 
 * @param res - The Express `Response` object used to send the HTTP response.
 * @param error - The error object, which may be an instance of Error or a different type.
 * @param defaultMessage - A default message to include in the response if the error message is not available.
 * 
 * @returns {void}
 */
export const handleError = (res: Response, error: any, defaultMessage: string): void => {

  console.error('Error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: defaultMessage,
    error: errorMessage
  });
};
