/**
 * HttpStatusCode
 * Enum for standard HTTP status codes used in API responses.
 */
export enum HttpStatusCode {
    /**
     * OK
     * Indicates that the request was successful.
     * @type {number}
     */
    OK = 200,

    /**
     * CREATED
     * Indicates that a resource was successfully created.
     * @type {number}
     */
    CREATED = 201,

    /**
     * NO_CONTENT
     * Indicates that the request was successful but there is no content to return.
     * @type {number}
     */
    NO_CONTENT = 204,

    /**
     * BAD_REQUEST
     * Indicates that the request was invalid or cannot be processed.
     * @type {number}
     */
    BAD_REQUEST = 400,

    /**
     * UNAUTHORIZED
     * Indicates that the request requires user authentication.
     * @type {number}
     */
    UNAUTHORIZED = 401,

    /**
     * FORBIDDEN
     * Indicates that the server understood the request but refuses to authorize it.
     * @type {number}
     */
    FORBIDDEN = 403,

    /**
     * NOT_FOUND
     * Indicates that the requested resource could not be found.
     * @type {number}
     */
    NOT_FOUND = 404,

    /**
     * INTERNAL_SERVER_ERROR
     * Indicates that an unexpected error occurred on the server.
     * @type {number}
     */
    INTERNAL_SERVER_ERROR = 500,

    /**
     * SERVICE_UNAVAILABLE
     * Indicates that the server is currently unable to handle the request due to maintenance or overload.
     * @type {number}
     */
    SERVICE_UNAVAILABLE = 503,
}
