import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { USERS_ENTITY_NAME, USER_ACCESS_TOKEN_ENTITY_NAME } from "@features/auth/entities";

export class CreateAccessTokensTable1722019910614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: USER_ACCESS_TOKEN_ENTITY_NAME,
            columns: [
              { name: 'id', type: 'varchar', length: '36', isPrimary: true, default: 'UUID()'},
              { name: 'user_id', type: 'varchar', length: '36', isNullable: false },
              { name: 'token', type: 'varchar', isNullable: false }
            ]
        }));

        await queryRunner.createForeignKey(USER_ACCESS_TOKEN_ENTITY_NAME, new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: USERS_ENTITY_NAME,
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(USER_ACCESS_TOKEN_ENTITY_NAME);
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        await queryRunner.dropForeignKey(USER_ACCESS_TOKEN_ENTITY_NAME, foreignKey!);
        await queryRunner.dropTable(USER_ACCESS_TOKEN_ENTITY_NAME);
    }

}
