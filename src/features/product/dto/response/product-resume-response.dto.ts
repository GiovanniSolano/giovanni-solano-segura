/**
 * DTO for representing a product's resume.
 */
export class ProductResumeDto {
    /**
     * The unique identifier of the product.
     * @type {string}
     */
    public id!: string;

    /**
     * The name of the product.
     * @type {string}
     */
    public name!: string;

    /**
     * A brief description of the product.
     * @type {string}
     */
    public description!: string;

    /**
     * The height of the product.
     * @type {number}
     */
    public height!: number;

    /**
     * The length of the product.
     * @type {number}
     */
    public length!: number;

    /**
     * The width of the product.
     * @type {number}
     */
    public width!: number;
}
