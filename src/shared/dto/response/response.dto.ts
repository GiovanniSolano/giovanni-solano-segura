/**
 * ResponseDTO
 * A generic interface representing the structure of a standardized API response.
 *
 * @template T - The type of the data being returned in the response.
 */
export interface ResponseDTO<T> {
    /**
     * Status of the response.
     * @type {'success' | 'error'}
     */
    status: 'success' | 'error';

    /**
     * Message providing additional information about the response.
     * @type {string}
     */
    message: string;

    /**
     * Data returned in the response.
     * @type {T}
     */
    data: T;
}
