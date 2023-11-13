import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Corrida, CorridaRelations} from '../models';

export class CorridaRepository extends DefaultCrudRepository<
  Corrida,
  typeof Corrida.prototype.id,
  CorridaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Corrida, dataSource);
  }
}
