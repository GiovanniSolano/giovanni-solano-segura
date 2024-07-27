import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessTokenEntity } from '@features/auth/entities';

export const USERS_ENTITY_NAME = 'users';

/**
 * UserEntity
 * Represents a user in the system.
 * 
 * @entity users
 */
@Entity({ name: USERS_ENTITY_NAME })
export class UserEntity {

  /**
   * Unique identifier for the user.
   * @type {string}
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id!: string;

  /**
   * Email address of the user.
   * @type {string}
   */
  @Column({
    name: 'email',
    length: 120
  })
  public email!: string;

  /**
   * Password hash for the user.
   * @type {string}
   */
  @Column({
    name: 'password',
    length: 120
  })
  public password!: string;

  /**
   * Full name of the user.
   * @type {string}
   */
  @Column({
    name: 'name',
    length: 120
  })
  public name!: string;

  /**
   * Phone number of the user.
   * @type {string}
   */
  @Column({
    name: 'phone',
    length: 30
  })
  public phone!: string;

  /**
   * Profile image URL for the user.
   * @type {string}
   */
  @Column({
    name: 'img_profile',
    length: 255,
    nullable: true
  })
  public imgProfile?: string;

  /**
   * Collection of access tokens associated with the user.
   * @type {AccessTokenEntity[]}
   */
  @OneToMany(() => AccessTokenEntity, (token) => token.user)
  public tokens!: AccessTokenEntity[];
}
