import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1702279098590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users (
                user_id serial PRIMARY KEY,
                email VARCHAR ( 50 ) UNIQUE NOT NULL,
                password VARCHAR ( 50 ) NOT NULL,
                full_name VARCHAR ( 255 ) NOT NULL,
                user_type INT NOT NULL
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE users;`,
        )
    }

}
