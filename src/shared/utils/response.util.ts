import { Response } from 'express';
import { HttpStatusCode } from '@shared/constants';
import { ResponseDTO } from '@shared/dto/response';

/**
 * Utility class for handling HTTP responses.
 */
export class ResponseUtil {

  /**
   * Sends a success response with a customizable status code and message.
   * 
   * @param res - The Express `Response` object used to send the HTTP response.
   * @param data - The data to be included in the response body.
   * @param message - A custom message to include in the response body. Defaults to 'Success'.
   * @param statusCode - The HTTP status code for the responses
   * 
   * @returns {void}
   */
  public static toSuccessResponse<T>(res: Response, data: T, message: string = 'Success', statusCode: number = HttpStatusCode.OK): void {
    res.status(statusCode).json({
      status: 'success',
      message,
      data
    } as ResponseDTO<T>);
  }

  /**
   * Sends an error response with a customizable status code and error details.
   * 
   * @param res - The Express `Response` object used to send the HTTP response.
   * @param message - A custom message to include in the response body.
   * @param error - Additional error details to include in the response body. Defaults to an empty string.
   * @param statusCode - The HTTP status code for the response.
   * 
   * @returns {void}
   */
  public static toErrorResponse(res: Response, message: string, error: any = '', statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR): void {
    res.status(statusCode).json({
      status: 'error',
      message,
      error
    });
  }
}
