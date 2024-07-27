import * as fs from 'fs';
import * as path from 'path';
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProducts1722093912067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const pathname = path.join(__dirname, `../data/products.sql`);

        if (!fs.existsSync(pathname)) {
          throw new Error(`Invalid data sql`);
        }
    
        const data = fs.readFileSync(pathname, 'utf-8');    
        await queryRunner.manager.query(data);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM catalog_products');
    }

}
