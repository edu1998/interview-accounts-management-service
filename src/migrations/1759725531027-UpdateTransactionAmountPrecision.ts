import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransactionAmountPrecision1759725531027 implements MigrationInterface {
    name = 'UpdateTransactionAmountPrecision1759725531027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "amount" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "amount" TYPE numeric(10,2)`);
    }

}
