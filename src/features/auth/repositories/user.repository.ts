import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from '@features/auth/entities';

/**
 * UserRepository
 * Repository for managing user data.
 */

export class UserRepository {

  private repository: Repository<UserEntity>;

  /**
   * Constructor for UserRepository.
   * @param entityManager - The EntityManager used to interact with the database.
   */
  constructor(private entityManager: EntityManager) {
    this.repository = this.entityManager.getRepository(UserEntity);
  }

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to be found.
   * @returns A promise that resolves to the UserEntity if a user with the specified email exists, or null if not found.
   */
  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email });
  }
}
