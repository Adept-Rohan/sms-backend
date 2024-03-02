import { Knex } from 'knex';
import { Tables } from 'knex/types/tables';

export function KnexBase<
  CreateDto,
  UpdateDto,
  TableType extends NonNullable<unknown>,
  TableName extends string = keyof Tables,
>(table: TableName) {
  class Base {
    constructor(public localKnex: Knex<TableType, Array<TableType>>) {}

    get table() {
      return this.localKnex(table);
    }

    createRaw(dto: CreateDto) {
      return this.table.insert(dto as never);
    }

    create(dto: CreateDto) {
      return this.createRaw(dto).then(([id]) => this.findById(id));
    }

    updateRaw(id: number, dto: UpdateDto) {
      return this.table.where({ id } as never).update(dto as never);
    }

    update(id: number, dto: UpdateDto) {
      return this.updateRaw(id, dto).then(() => this.findById(id));
    }

    findAll() {
      return this.table;
    }

    findById(id: number) {
      return this.table.where({ id } as never).first();
    }

    findBatchByIds(ids: number[]) {
      return this.table.whereIn('id', ids).then((data) => {
        return ids.find((id) =>
          data.find((datum: unknown) => (datum as never)['id'] === id),
        );
      });
    }
  }
  return Base;
}
