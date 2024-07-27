import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { USERS_ENTITY_NAME } from "@features/auth/entities";

export class CreateUsersTable1722018428033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: USERS_ENTITY_NAME,
            columns: [
              { name: 'id', type: 'varchar', length: '36', isPrimary: true, default: 'UUID()'},
              { name: 'email', type: 'varchar', length: '120', isNullable: false },
              { name: 'password', type: 'varchar', length: '120', isNullable: false },
              { name: 'name', type: 'varchar', length: '120', isNullable: false },
              { name: 'phone', type: 'varchar', length: '30', isNullable: false },
              { name: 'img_profile', type: 'varchar', length: '255', isNullable: true }
            ]
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(USERS_ENTITY_NAME);
    }

}
