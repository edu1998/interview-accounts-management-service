import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateAccountNumberAutomatic1759556003916
  implements MigrationInterface
{
  name = 'GenerateAccountNumberAutomatic1759556003916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS account_number_seq`);
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_93b0939918a618e06d96a47cf98"`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountNum"`);
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "accountNum" bigint NOT NULL DEFAULT nextval('account_number_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_93b0939918a618e06d96a47cf98" UNIQUE ("accountNum")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_93b0939918a618e06d96a47cf98"`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountNum"`);
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "accountNum" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_93b0939918a618e06d96a47cf98" UNIQUE ("accountNum")`,
    );
    await queryRunner.query(`DROP SEQUENCE IF EXISTS account_number_seq`);
  }
}
