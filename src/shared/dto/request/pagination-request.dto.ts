import Joi from "joi";

/**
 * Schema for validating pagination parameters.
 */
export const paginationSchema = Joi.object({
    /**
     * [page=1] - The page number for pagination.
     * @type {number}
     */
    page: Joi.number().integer().min(1).default(1),

    /**
     * [limit=10] - The number of items per page.
     * @type {number}
     */
    limit: Joi.number().integer().min(1).default(10)
});

/**
 * DTO for pagination parameters.
 */
export class PaginationDto {
    /**
     * The page number for pagination.
     * @type {number}
     */
    public page!: number;

    /**
     * The number of items per page.
     * @type {number}
     */
    public limit!: number;
}
