import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseUsers1708378303925 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users VALUES(1, "admin", "admin@local.host", "$argon2id$v=19$m=65536,t=3,p=4$VIdKpSJabFpUj4Q5LfsCyQ$+lK9AziRRoT66i2QKRlYSdSUbpQ9onbgmvqiJAfEYWA", "ADMIN")`,
        );
        await queryRunner.query(
            `INSERT INTO users VALUES(2, "user", "user@local.host", "$argon2id$v=19$m=65536,t=3,p=4$yih+ZcO7TSpF5ETgdv2G1g$pBO2WkEOy1SC6XbCfvw9hH0DxwcD0fuSfpmvD/E+w6U", "USER")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE id = 1`);
        await queryRunner.query(`DELETE FROM users WHERE id = 2`);
    }
}
