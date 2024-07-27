/**
 * CreateAccessTokenDto
 * Represents the data structure used to create a new access token.
 */
export class CreateAccessTokenDto {

  /**
   * Unique identifier of the user for whom the access token is created.
   * @type {string}
   */
  public userId!: string;

  /**
   * The access token string that is generated for the user.
   * @type {string}
   */
  public token!: string;
}
