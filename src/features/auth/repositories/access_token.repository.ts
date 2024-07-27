import { EntityManager, Repository } from 'typeorm';
import { AccessTokenEntity } from '@features/auth/entities';
import { CreateAccessTokenDto } from '@features/auth/dto/request';

/**
 * AccessTokenRepository
 * Repository for managing access token data.
 */

export class AccessTokenRepository {
  private repository: Repository<AccessTokenEntity>;

  /**
   * Constructor for AccessTokenRepository.
   * @param entityManager - The EntityManager used to interact with the database.
   */
  constructor(entityManager: EntityManager) {
    this.repository = entityManager.getRepository(AccessTokenEntity);
  }

  /**
   * Creates a new access token entry in the database.
   * @param accessTokenBody - DTO containing the details of the access token to be created.
   * @returns A promise that resolves to the newly created AccessTokenEntity.
   */
  public async createAccessToken(accessTokenBody: CreateAccessTokenDto): Promise<AccessTokenEntity> {
    const accessToken = this.repository.create(accessTokenBody);
    return await this.repository.save(accessToken);
  }

  /**
   * Retrieves all access tokens associated with a specific user ID.
   * @param userId - The ID of the user for whom access tokens are being retrieved.
   * @returns A promise that resolves to an array of AccessTokenEntity instances associated with the user ID.
   */
  public async getAccessTokenByUserId(userId: string): Promise<AccessTokenEntity[]> {
    return await this.repository.find({ where: { userId } });
  }
}
