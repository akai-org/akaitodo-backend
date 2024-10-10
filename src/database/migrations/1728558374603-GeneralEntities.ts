import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneralEntities1728558374603 implements MigrationInterface {
    name = 'GeneralEntities1728558374603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(20) NOT NULL, \`email\` varchar(30) NOT NULL, \`hash\` varchar(255) NULL, \`isLocal\` tinyint NOT NULL DEFAULT 1, \`role\` enum ('ADMIN', 'USER') NOT NULL DEFAULT 'USER', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_exception\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_rescheduled\` tinyint NOT NULL, \`is_cancelled\` tinyint NOT NULL, \`original_date\` datetime NOT NULL, \`start_date\` datetime NULL, \`end_date\` datetime NULL, \`is_full_day\` tinyint NOT NULL, \`event_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recurrences\` (\`recurrence_type\` enum ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'DAILY', \`separation_count\` int NOT NULL DEFAULT '0', \`occurrence_count\` int NULL, \`event_id\` int NOT NULL, PRIMARY KEY (\`event_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL DEFAULT 'New event', \`description\` varchar(255) NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NULL, \`is_full_day\` tinyint NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`description\` text NULL, \`isDone\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL DEFAULT 'Title', \`body\` varchar(255) NOT NULL DEFAULT 'Write something here!', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`icon\` varchar(255) NULL, \`color\` varchar(255) NOT NULL DEFAULT 'red', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_exception\` ADD CONSTRAINT \`FK_7f2f979cb933827ed1757248c03\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recurrences\` ADD CONSTRAINT \`FK_500cbbb1322ec859f4f675f1593\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` ADD CONSTRAINT \`FK_08e606dc5182b142dc916e7abab\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_829532ff766505ad7c71592c6a5\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_829532ff766505ad7c71592c6a5\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``);
        await queryRunner.query(`ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_08e606dc5182b142dc916e7abab\``);
        await queryRunner.query(`ALTER TABLE \`recurrences\` DROP FOREIGN KEY \`FK_500cbbb1322ec859f4f675f1593\``);
        await queryRunner.query(`ALTER TABLE \`event_exception\` DROP FOREIGN KEY \`FK_7f2f979cb933827ed1757248c03\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP TABLE \`events\``);
        await queryRunner.query(`DROP TABLE \`recurrences\``);
        await queryRunner.query(`DROP TABLE \`event_exception\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
