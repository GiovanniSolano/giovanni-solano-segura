import * as fs from 'fs';
import * as path from 'path';
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUsers1722059969573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const pathname = path.join(__dirname, `../data/users.sql`);

        if (!fs.existsSync(pathname)) {
          throw new Error(`Invalid data sql`);
        }
    
        const data = fs.readFileSync(pathname, 'utf-8');    
        await queryRunner.manager.query(data);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM users');
    }

}
