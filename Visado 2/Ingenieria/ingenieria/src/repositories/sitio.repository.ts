import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sitio, SitioRelations, Corrida} from '../models';
import {CorridaRepository} from './corrida.repository';

export class SitioRepository extends DefaultCrudRepository<
  Sitio,
  typeof Sitio.prototype.id,
  SitioRelations
> {

  public readonly corridas: HasManyRepositoryFactory<Corrida, typeof Sitio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CorridaRepository') protected corridaRepositoryGetter: Getter<CorridaRepository>,
  ) {
    super(Sitio, dataSource);
    this.corridas = this.createHasManyRepositoryFactoryFor('corridas', corridaRepositoryGetter,);
    this.registerInclusionResolver('corridas', this.corridas.inclusionResolver);
  }
}
