import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@features/auth/entities';

export const USER_ACCESS_TOKEN_ENTITY_NAME = 'access_tokens';

/**
 * AccessTokenEntity
 * Represents an access token associated with a user.
 * 
 * @entity access_tokens
 */
@Entity({ name: USER_ACCESS_TOKEN_ENTITY_NAME})
export class AccessTokenEntity {

  /**
   * Unique identifier for the access token.
   * @type {string}
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id!: string;

  /**
   * ID of the user to whom the access token belongs.
   * @type {string}
   */
  @Column({
    name: 'user_id'
  })
  public userId!: string;

  /**
   * The actual access token string.
   * @type {string}
   */
  @Column({
    name: 'token'
  })
  public token!: string;

  /**
   * The user entity associated with this access token.
   * @type {UserEntity}
   */
  @ManyToOne(() => UserEntity, user => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user!: UserEntity;
}
