import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCamelCaseInUserTable1702351677874 implements MigrationInterface {
    name = 'RenameCamelCaseInUserTable1702351677874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updated_at" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at"`);
    }

}
