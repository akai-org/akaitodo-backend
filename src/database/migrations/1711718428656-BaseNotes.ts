import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseNotes1711718428656 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO notes VALUES(1, "admin title", "This note belongs to Admin", Date '2024-01-01', NULL, 'red', 1)`,
        );
        await queryRunner.query(
            `INSERT INTO notes VALUES(2, "user Title", "This note belongs to User", Date '2024-01-01', NULL, 'blue', 2)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM notes WHERE id > 0`);
    }
}
