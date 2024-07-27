/**
 * UserLoggedInDto
 * Represents the data structure for a user who is logged in.
 */
export class UserLoggedInDto {

    /**
     * Unique identifier of the user.
     * @type {string}
     */
    public id!: string;
  
    /**
     * The email address of the user.
     * @type {string}
     */
    public email!: string;
}
