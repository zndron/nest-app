import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1739290242637 implements MigrationInterface {
    name = 'NewMigrations1739290242637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`status\` enum ('todo', 'in-progress', 'done') NOT NULL DEFAULT 'todo', \`assigned_user\` int NULL, \`projectId\` int NULL, UNIQUE INDEX \`REL_855d0c477df0083f2ed492ba34\` (\`assigned_user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects_users\` (\`projectsId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_5818b09c38c36be1bfba79971c\` (\`projectsId\`), INDEX \`IDX_a5c762f4dc08418212c2067410\` (\`userId\`), PRIMARY KEY (\`projectsId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_855d0c477df0083f2ed492ba348\` FOREIGN KEY (\`assigned_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_e08fca67ca8966e6b9914bf2956\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_5818b09c38c36be1bfba79971ca\` FOREIGN KEY (\`projectsId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`projects_users\` ADD CONSTRAINT \`FK_a5c762f4dc08418212c20674101\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_a5c762f4dc08418212c20674101\``);
        await queryRunner.query(`ALTER TABLE \`projects_users\` DROP FOREIGN KEY \`FK_5818b09c38c36be1bfba79971ca\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_e08fca67ca8966e6b9914bf2956\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_855d0c477df0083f2ed492ba348\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5c762f4dc08418212c2067410\` ON \`projects_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_5818b09c38c36be1bfba79971c\` ON \`projects_users\``);
        await queryRunner.query(`DROP TABLE \`projects_users\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP INDEX \`REL_855d0c477df0083f2ed492ba34\` ON \`tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
