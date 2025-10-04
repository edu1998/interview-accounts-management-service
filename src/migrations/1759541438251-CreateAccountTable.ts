import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1759541438251 implements MigrationInterface {
  name = 'CreateAccountTable1759541438251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "holderName" character varying NOT NULL, "accountNum" character varying NOT NULL, "balance" numeric(12,2) NOT NULL, CONSTRAINT "UQ_93b0939918a618e06d96a47cf98" UNIQUE ("accountNum"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
