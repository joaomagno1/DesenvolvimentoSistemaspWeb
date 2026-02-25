import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  // Não tem nas minhas

  // @CreateDateColumn({ name: 'CREATED_AT' })
  // createdAt!: Date;

  // @UpdateDateColumn({ name: 'UPDATED_AT' })
  // updatedAt!: Date;

  constructor(data: Partial<BaseEntity> = {}) {
    Object.assign(this, data);
  }
}
