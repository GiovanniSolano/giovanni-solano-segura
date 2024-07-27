import { AccessTokenEntity, UserEntity } from '@features/auth/entities';
import { AccessTokenRepository, UserRepository } from '@features/auth/repositories';
import { CreateAccessTokenDto } from '@features/auth/dto/request';

/**
 * AuthService
 * Service class for handling authentication-related operations.
 */
export class AuthService {

    /**
     * Constructor for AuthService.
     * @param userRepository - The repository for user-related database operations.
     * @param accessTokenRepository - The repository for access token-related database operations.
     */
  constructor(
    private userRepository: UserRepository,
    private accessTokenRepository: AccessTokenRepository
  ) {}

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the UserEntity if found, or null if not.
   */
  public async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Creates a new access token for a user.
   * @param userId - The ID of the user for whom the access token is being created.
   * @param token - The access token string.
   * @returns A promise that resolves to the newly created AccessTokenEntity.
   */
  public async createAccessToken(userId: string, token: string): Promise<AccessTokenEntity> {
    const createAccessTokenDto: CreateAccessTokenDto = { userId, token };
    return this.accessTokenRepository.createAccessToken(createAccessTokenDto);
  }
}
