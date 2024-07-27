import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { CATALOG_PRODUCTS_ENTITY_NAME } from "@features/product/entities/product.entity";

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(CATALOG_PRODUCTS_ENTITY_NAME);
    }

}
