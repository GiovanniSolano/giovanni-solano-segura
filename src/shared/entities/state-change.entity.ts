import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";

/**
 * StateChangeEntity
 * A base entity class to track the creation, update, and deletion timestamps and user information.
 */
export class StateChangeEntity {
    
    /**
     * The date and time when the entity was created.
     * @type {Date | undefined}
     */
    @CreateDateColumn({ 
        name: 'created_at',
        nullable: true 
    })
    public createdAt?: Date;
    
    /**
     * The identifier of the user who created the entity.
     * @type {string | undefined}
     */
    @Column({
        name: 'created_by',
        nullable: true
    })
    public createdBy?: string;
    
    /**
     * The date and time when the entity was last updated.
     * @type {Date | undefined}
     */
    @UpdateDateColumn({
        name: 'updated_at',
        nullable: true
    })
    public updatedAt?: Date;
    
    /**
     * The identifier of the user who last updated the entity.
     * @type {string | undefined}
     */
    @Column({
        name: 'updated_by',
        nullable: true
    })
    public updatedBy?: string;
    
    /**
     * The date and time when the entity was deleted.
     * @type {Date | undefined}
     */
    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true
    })
    public deletedAt?: Date;
    
    /**
     * The identifier of the user who deleted the entity.
     * @type {string | undefined}
     */
    @Column({
        name: 'deleted_by',
        nullable: true
    })
    public deletedBy?: string;
}
