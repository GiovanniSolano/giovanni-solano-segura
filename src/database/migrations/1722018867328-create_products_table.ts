import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { CATALOG_PRODUCTS_ENTITY_NAME } from "@features/product/entities";
import { USERS_ENTITY_NAME } from "@features/auth/entities";

export class CreateProductsTable1722018867328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: CATALOG_PRODUCTS_ENTITY_NAME,
            columns: [
              { name: 'id', type: 'varchar', length: '36', isPrimary: true, default: 'UUID()' },
              { name: 'name', type: 'varchar', length: '255', isNullable: false },
              { name: 'description', type: 'text', isNullable: false },
              { name: 'height', type: 'float', isNullable: false },
              { name: 'length', type: 'float', isNullable: false },
              { name: 'width', type: 'float', isNullable: false },
              { name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP' },
              { name: 'created_by', type: 'varchar', length: '36', isNullable: true },
              { name: 'updated_at', type: 'datetime', isNullable: true },
              { name: 'updated_by', type: 'varchar', length: '36', isNullable: true },
              { name: 'deleted_at', type: 'datetime', isNullable: true },
              { name: 'deleted_by', type: 'varchar', length: '36', isNullable: true }
            ]
          }));

          await queryRunner.createForeignKey(CATALOG_PRODUCTS_ENTITY_NAME, new TableForeignKey({
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: USERS_ENTITY_NAME,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey(CATALOG_PRODUCTS_ENTITY_NAME, new TableForeignKey({
            columnNames: ['updated_by'],
            referencedColumnNames: ['id'],
            referencedTableName: USERS_ENTITY_NAME,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey(CATALOG_PRODUCTS_ENTITY_NAME, new TableForeignKey({
            columnNames: ['deleted_by'],
            referencedColumnNames: ['id'],
            referencedTableName: USERS_ENTITY_NAME,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      
      const table = await queryRunner.getTable(CATALOG_PRODUCTS_ENTITY_NAME);

      if(table) {
        
        for (const foreignKey of table.foreignKeys) {
            await queryRunner.dropForeignKey(CATALOG_PRODUCTS_ENTITY_NAME, foreignKey);
          }
          
      }

      await queryRunner.dropTable(CATALOG_PRODUCTS_ENTITY_NAME);
    }

}
