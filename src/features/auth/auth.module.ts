import { AppDataSource } from '@database/typeorm.config';
import { UserRepository } from '@features/auth/repositories';
import { AuthService } from '@features/auth/services';
import { AccessTokenRepository } from '@features/auth/repositories';

/**
 * AuthModule
 * A module that provides instances of repositories and services for multiple purposes.
 */
export class AuthModule {

  // Static properties to hold singleton instances of repositories
  private static userRepository: UserRepository;
  private static accessTokenRepository: AccessTokenRepository;

  /**
   * Get an instance of AuthService.
   * @returns {AuthService} An instance of AuthService.
   */
  public static getAuthService(): AuthService {
    return new AuthService(
      this.getUserRepository(),
      this.getAccessTokenRepository()
    );
  }

  /**
   * Get an instance of UserRepository.
   * @returns {UserRepository} An instance of UserRepository.
   */
  public static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(AppDataSource.manager);
    }
    return this.userRepository;
  }

  /**
   * Get an instance of AccessTokenRepository.
   * @returns {AccessTokenRepository} An instance of AccessTokenRepository.
   */
  public static getAccessTokenRepository(): AccessTokenRepository {
    if (!this.accessTokenRepository) {
      this.accessTokenRepository = new AccessTokenRepository(AppDataSource.manager);
    }
    return this.accessTokenRepository;
  }
}
