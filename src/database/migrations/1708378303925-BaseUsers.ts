import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseUsers1708378303925 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users VALUES(1, "admin", "admin@localhost", "$2a$10$Z.dW7FXkau7.oCqrmmgcye1wypkKpy4pc9YqWWcVhf1Xt5iD/ynDS")`,
        );
        await queryRunner.query(
            `INSERT INTO users VALUES(2, "user", "user@localhost", "$2a$10$SwZ0sBwvf55vSzHErAoWZuE2LTQySFGwbkkeqi/e7WobG6Fqtk9Ee");`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE id = 1`);
        await queryRunner.query(`DELETE FROM users WHERE id = 2`);
    }
}
